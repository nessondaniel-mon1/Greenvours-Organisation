import { Tour, NewsArticle, TeamMember, Project, EducationProgram, ReliefProject, HowWeHelpItem, VisionContent } from '../types';
import { initialTours, initialNews, initialTeamMembers, initialProjects, initialEducationPrograms, initialReliefProjects, initialHowWeHelpItems, initialVisionContent } from '../data';
import { db, functions } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, DocumentData, QuerySnapshot, setDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

// Collection names in Firestore
export const COLLECTIONS = {
    TOURS: 'tours',
    NEWS: 'news',
    TEAM: 'team',
    PROJECTS: 'projects',
    EDUCATION_PROGRAMS: 'educationPrograms',
    RELIEF_PROJECTS: 'reliefProjects',
    HOW_WE_HELP_ITEMS: 'howWeHelpItems',
    VISION_CONTENT: 'visionContent',
    USERS: 'users',
    CONTACT_INFO: 'contactInfo',
    PAYMENTS: 'payments',
};

export async function initializeData() {
    if (localStorage.getItem('dataInitialized')) {
        console.log("Data already initialized, skipping.");
        return;
    }

    // Check if collections are empty and populate with initial data if needed
    const checkAndPopulate = async (collectionName: string, initialData: any[]) => {
        const q = query(collection(db, collectionName));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log(`Populating ${collectionName} with initial data.`);
            for (const item of initialData) {
                await addDoc(collection(db, collectionName), item);
            }
        }
    };

    await checkAndPopulate(COLLECTIONS.TOURS, initialTours);
    await checkAndPopulate(COLLECTIONS.NEWS, initialNews);
    await checkAndPopulate(COLLECTIONS.TEAM, initialTeamMembers);
    await checkAndPopulate(COLLECTIONS.PROJECTS, initialProjects);
    await checkAndPopulate(COLLECTIONS.EDUCATION_PROGRAMS, initialEducationPrograms);
    await checkAndPopulate(COLLECTIONS.RELIEF_PROJECTS, initialReliefProjects);
    await checkAndPopulate(COLLECTIONS.HOW_WE_HELP_ITEMS, initialHowWeHelpItems);
    await checkAndPopulate(COLLECTIONS.VISION_CONTENT, initialVisionContent);

    localStorage.setItem('dataInitialized', 'true');
}

// Generic Firestore CRUD operations

// Generic getter with real-time listener
export function getCollection<T extends { id?: string }>(collectionName: string, callback: (items: T[]) => void, orderField?: string) {
    const colRef = collection(db, collectionName);
    const q = orderField ? query(colRef, orderBy(orderField, 'desc')) : colRef;

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as T[];
        callback(items);
    }, (error) => {
        console.error(`Error getting ${collectionName} collection:`, error);
    });
}

// Generic add item
export async function addItem<T extends { id?: string }>(collectionName: string, item: Omit<T, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), item);
    return docRef.id;
}

// Generic update item
export async function updateItem<T extends { id: string }>(collectionName: string, id: string, updatedItem: Omit<T, 'id'>): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updatedItem);
}

// Generic delete item
export async function deleteItem(collectionName: string, id: string): Promise<void> {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

// Create a new user in Firestore
export async function createUser(uid: string, userData: object): Promise<void> {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await setDoc(userRef, userData);
}

// Specific data access functions (now using generic Firestore functions)

// Tours
export const getTours = (callback: (tours: Tour[]) => void) => getCollection<Tour>(COLLECTIONS.TOURS, callback, 'id');

// News / Blog
export const getNews = (callback: (news: NewsArticle[]) => void) => getCollection<NewsArticle>(COLLECTIONS.NEWS, callback, 'id');

// Team
export const getTeam = (callback: (team: TeamMember[]) => void) => getCollection<TeamMember>(COLLECTIONS.TEAM, callback);

// Projects
export const getProjects = (callback: (projects: Project[]) => void) => getCollection<Project>(COLLECTIONS.PROJECTS, callback, 'id');

// Education Programs
export const getEducationPrograms = (callback: (programs: EducationProgram[]) => void) => getCollection<EducationProgram>(COLLECTIONS.EDUCATION_PROGRAMS, callback, 'id');

// Relief Projects
export const getReliefProjects = (callback: (projects: ReliefProject[]) => void) => getCollection<ReliefProject>(COLLECTIONS.RELIEF_PROJECTS, callback, 'id');

// How We Help Items
export const getHowWeHelpItems = (callback: (items: HowWeHelpItem[]) => void) => getCollection<HowWeHelpItem>(COLLECTIONS.HOW_WE_HELP_ITEMS, callback);

// Vision Content
export const getVisionContent = (callback: (content: VisionContent[]) => void) => getCollection<VisionContent>(COLLECTIONS.VISION_CONTENT, callback);

const sendNotificationEmailFn = httpsCallable(functions, 'sendNotificationEmail');

export const sendNotificationEmail = async (data: { subject: string; htmlBody: string }) => {
    console.log("Calling sendNotificationEmail cloud function with data:", data);
    try {
        const result = await sendNotificationEmailFn(data);
        console.log("Cloud function returned:", result);
        return result.data;
    } catch (error) {
        console.error('Error calling sendNotificationEmail function:', error);
        throw error;
    }
};