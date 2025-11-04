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