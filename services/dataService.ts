import { Tour, NewsArticle, TeamMember, Project, EducationProgram } from '../types';
import { initialTours, initialNews, initialTeamMembers, initialProjects, initialEducationPrograms } from '../data';

const KEYS = {
    TOURS: 'greenvours_tours',
    NEWS: 'greenvours_news',
    TEAM: 'greenvours_team',
    PROJECTS: 'greenvours_projects',
    EDUCATION_PROGRAMS: 'greenvours_education_programs',
};

// Generic getter
function getData<T extends { id: number | string }>(key: string, initialData: T[]): T[] {
    let items: T[];
    try {
        const stored = localStorage.getItem(key);
        items = stored ? JSON.parse(stored) : initialData;
    } catch (error)
    {
        console.error(`Error reading ${key} from localStorage`, error);
        items = initialData;
    }

    // Sort chronological items to show newest first. Team members are left in their default order.
    if (key === KEYS.TOURS || key === KEYS.NEWS || key === KEYS.PROJECTS || key === KEYS.EDUCATION_PROGRAMS) {
        items.sort((a, b) => {
            const idA = Number(a.id);
            const idB = Number(b.id);
            
            if (isNaN(idA) || isNaN(idB)) return 0;

            // Sort in descending order to show newest items first
            return idB - idA;
        });
    }

    return items;
}


// Generic setter
function saveData<T>(key: string, data: T[]): void {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage`, error);
    }
}

export function initializeData() {
    if (!localStorage.getItem(KEYS.TOURS)) {
        saveData(KEYS.TOURS, initialTours);
    }
    if (!localStorage.getItem(KEYS.NEWS)) {
        saveData(KEYS.NEWS, initialNews);
    }
    if (!localStorage.getItem(KEYS.TEAM)) {
        saveData(KEYS.TEAM, initialTeamMembers);
    }
    if (!localStorage.getItem(KEYS.PROJECTS)) {
        saveData(KEYS.PROJECTS, initialProjects);
    }
    if (!localStorage.getItem(KEYS.EDUCATION_PROGRAMS)) {
        saveData(KEYS.EDUCATION_PROGRAMS, initialEducationPrograms);
    }
}

// Tours
export const getTours = (): Tour[] => getData(KEYS.TOURS, initialTours);
export const saveTours = (tours: Tour[]): void => saveData(KEYS.TOURS, tours);

// News / Blog
export const getNews = (): NewsArticle[] => getData(KEYS.NEWS, initialNews);
export const saveNews = (news: NewsArticle[]): void => saveData(KEYS.NEWS, news);

// Team
export const getTeam = (): TeamMember[] => getData(KEYS.TEAM, initialTeamMembers);
export const saveTeam = (team: TeamMember[]): void => saveData(KEYS.TEAM, team);

// Projects
export const getProjects = (): Project[] => getData(KEYS.PROJECTS, initialProjects);
export const saveProjects = (projects: Project[]): void => saveData(KEYS.PROJECTS, projects);

// Education Programs
export const getEducationPrograms = (): EducationProgram[] => getData(KEYS.EDUCATION_PROGRAMS, initialEducationPrograms);
export const saveEducationPrograms = (programs: EducationProgram[]): void => saveData(KEYS.EDUCATION_PROGRAMS, programs);

// Generic CRUD helpers
export function addItem<T extends { id: number | string }>(key: string, item: Omit<T, 'id'>): T[] {
    const items = getData<T>(key, []);
    const newItem = { ...item, id: new Date().getTime().toString() } as T;
    const updatedItems = [...items, newItem];
    saveData(key, updatedItems);
    return updatedItems;
}

export function updateItem<T extends { id: number | string }>(key: string, updatedItem: T): T[] {
    const items = getData<T>(key, []);
    const updatedItems = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    saveData(key, updatedItems);
    return updatedItems;
}

export function deleteItem<T extends { id: number | string }>(key: string, id: number | string): T[] {
    const items = getData<T>(key, []);
    const updatedItems = items.filter(item => item.id !== id);
    saveData(key, updatedItems);
    return updatedItems;
}

export const DATA_KEYS = KEYS;

// --- START: Notification Service ---

// A placeholder email address where all notifications will be sent.
const RECIPIENT_EMAIL = 'nessondaniel256@gmail.com';

interface EmailParams {
  subject: string;
  htmlBody: string;
}

/**
 * Simulates sending a notification email.
 * In a real-world application, this function would use a backend service
 * or a third-party email API (like SendGrid, Mailgun, etc.) to dispatch the email.
 * For now, it logs the email content to the developer console for demonstration purposes.
 * @param {EmailParams} emailDetails - The subject and HTML body of the email.
 */
export const sendNotificationEmail = async ({ subject, htmlBody }: EmailParams): Promise<void> => {
  console.log('--- 📧 EMAIL SIMULATION 📧 ---');
  console.log(`TO: ${RECIPIENT_EMAIL}`);
  console.log(`SUBJECT: ${subject}`);
  console.log('BODY (HTML):');
  console.log(htmlBody);
  console.log('-----------------------------');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real scenario, you would handle potential errors from the email service here.
  // For this simulation, we'll always assume success.
  return Promise.resolve();
};

// --- END: Notification Service ---
