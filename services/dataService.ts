import { Tour, NewsArticle, TeamMember, Project, EducationProgram, ReliefProject, HowWeHelpItem, VisionContent, ContactInfo } from '../types';
import { db, functions } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, DocumentData, QuerySnapshot, setDoc, getDoc } from 'firebase/firestore';
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

// Generic Firestore CRUD operations

// Generic getter with real-time listener
export function getCollection<T extends { id?: string }>(collectionName: string, callback: (items: T[]) => void, orderField?: string) {
    const colRef = collection(db, collectionName);
    const q = orderField ? query(colRef, orderBy(orderField, 'desc')) : colRef;

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        const items = snapshot.docs.map(doc => {
            const data = doc.data();
            // Ensure the 'id' property of the returned object is the Firestore document ID
            // and remove the 'id' field from the spread data to avoid overwriting.
            const { id, ...rest } = data; // Destructure 'id' to exclude it from 'rest'
            return { id: doc.id, ...rest };
        }) as T[];
        callback(items);
    }, (error) => {
        console.error(`Error getting ${collectionName} collection:`, error);
    });
}

// Generic add item
export async function addItem<T extends { id: string | number }>(collectionName: string, item: T): Promise<string> {
    try {
        const docId = String(item.id); // Ensure ID is string
        await setDoc(doc(db, collectionName, docId), item);
        return docId;
    } catch (error) {
        console.error(`dataService: Error adding item to ${collectionName}:`, error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

// Generic update item
export async function updateItem<T extends { id: string }>(collectionName: string, id: string, updatedItem: Omit<T, 'id'>): Promise<void> {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, updatedItem);
    } catch (error) {
        console.error(`dataService: Error updating item ${id} in ${collectionName}:`, error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

// Generic delete item
export async function deleteItem(collectionName: string, id: string): Promise<void> {
    try {
        const docRef = doc(db, collectionName, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error(`dataService: Error deleting item ${id} from ${collectionName}:`, error);
        throw error; // Re-throw the error to be handled by the caller
    }
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

// Contact Info
export async function getContactInfo(): Promise<ContactInfo | null> {
    try {
        const docRef = doc(db, COLLECTIONS.CONTACT_INFO, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as ContactInfo;
        }
        return null;
    } catch (error) {
        console.error("Error fetching contact info:", error);
        throw error;
    }
}

export async function updateContactInfo(info: ContactInfo): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.CONTACT_INFO, 'main');
        await setDoc(docRef, info);
    } catch (error) {
        console.error(`dataService: Error updating contact info:`, error);
        throw error;
    }
}


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