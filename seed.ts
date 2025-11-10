import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from './services/firebase';
import { initialTours, initialNews, initialTeamMembers, initialProjects, initialEducationPrograms, initialReliefProjects, initialHowWeHelpItems, initialVisionContent } from './data';
import { COLLECTIONS } from './services/dataService';

async function seedDatabase() {
    console.log('Starting database seeding...');

    const checkAndPopulate = async (collectionName: string, initialData: any[]) => {
        const q = collection(db, collectionName);
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            console.log(`Populating ${collectionName} with initial data.`);
            for (const item of initialData) {
                await setDoc(doc(db, collectionName, String(item.id)), item);
            }
        } else {
            console.log(`${collectionName} is not empty, skipping population.`);
        }
    };

    try {
        await checkAndPopulate(COLLECTIONS.TOURS, initialTours);
        await checkAndPopulate(COLLECTIONS.NEWS, initialNews);
        await checkAndPopulate(COLLECTIONS.TEAM, initialTeamMembers);
        await checkAndPopulate(COLLECTIONS.PROJECTS, initialProjects);
        await checkAndPopulate(COLLECTIONS.EDUCATION_PROGRAMS, initialEducationPrograms);
        await checkAndPopulate(COLLECTIONS.RELIEF_PROJECTS, initialReliefProjects);
        await checkAndPopulate(COLLECTIONS.HOW_WE_HELP_ITEMS, initialHowWeHelpItems);
        await checkAndPopulate(COLLECTIONS.VISION_CONTENT, initialVisionContent);
        console.log('Database seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seedDatabase();