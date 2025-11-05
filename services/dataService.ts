import { Tour, NewsArticle, TeamMember, Project, EducationProgram, ReliefProject, HowWeHelpItem, VisionContent } from '../types';
import { initialTours, initialNews, initialTeamMembers, initialProjects, initialEducationPrograms, initialReliefProjects, initialHowWeHelpItems, initialVisionContent } from '../data';

const KEYS = {
    TOURS: 'greenvours_tours',
    NEWS: 'greenvours_news',
    TEAM: 'greenvours_team',
    PROJECTS: 'greenvours_projects',
    EDUCATION_PROGRAMS: 'greenvours_education_programs',
    RELIEF_PROJECTS: 'greenvours_relief_projects',
    HOW_WE_HELP_ITEMS: 'greenvours_how_we_help_items',
    VISION_CONTENT: 'greenvours_vision_content',
    ADMIN_PASSWORD: 'greenvours_admin_password',
};

// Admin Password
export const getAdminPassword = (): string => {
    try {
        return localStorage.getItem(KEYS.ADMIN_PASSWORD) || 'admin'; // Default to 'admin' if not set
    } catch (error) {
        console.error('Error reading admin password from localStorage', error);
        return 'admin';
    }
};

export const setAdminPassword = (password: string): void => {
    try {
        localStorage.setItem(KEYS.ADMIN_PASSWORD, password);
    } catch (error) {
        console.error('Error saving admin password to localStorage', error);
    }
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
    // Always ensure admin password is set to 'admin' for easy access during development
    setAdminPassword('admin');

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
    if (!localStorage.getItem(KEYS.RELIEF_PROJECTS)) {
        saveData(KEYS.RELIEF_PROJECTS, initialReliefProjects);
    }
    if (!localStorage.getItem(KEYS.HOW_WE_HELP_ITEMS)) {
        saveData(KEYS.HOW_WE_HELP_ITEMS, initialHowWeHelpItems);
    }
    if (!localStorage.getItem(KEYS.VISION_CONTENT)) {
        saveData(KEYS.VISION_CONTENT, initialVisionContent);
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

// Relief Projects
export const getReliefProjects = (): ReliefProject[] => getData(KEYS.RELIEF_PROJECTS, initialReliefProjects);
export const saveReliefProjects = (projects: ReliefProject[]): void => saveData(KEYS.RELIEF_PROJECTS, projects);

// How We Help Items
export const getHowWeHelpItems = (): HowWeHelpItem[] => getData(KEYS.HOW_WE_HELP_ITEMS, initialHowWeHelpItems);
export const saveHowWeHelpItems = (items: HowWeHelpItem[]): void => saveData(KEYS.HOW_WE_HELP_ITEMS, items);

// Vision Content
export const getVisionContent = (): VisionContent[] => getData(KEYS.VISION_CONTENT, initialVisionContent);
export const saveVisionContent = (content: VisionContent[]): void => saveData(KEYS.VISION_CONTENT, content);

// Generic CRUD helpers
export const DATA_KEYS = KEYS;

// Utility function to generate email content for notifications
const generateNotificationEmail = (itemType: string, item: any, action: 'added' | 'updated') => {
  let subject = '';
  let htmlBody = `<p>Dear Greenvours Member,</p><p>This is an automated notification from Greenvours.</p>`;

  switch (itemType) {
    case 'NEWS':
      subject = `New Blog Post ${action === 'added' ? 'Published' : 'Updated'}: ${item.title}`;
      htmlBody += `<p>Our blog has a new ${action === 'added' ? 'post' : 'update'}! Check out: <strong>${item.title}</strong></p>
                   <p>Summary: ${item.excerpt}</p>
                   <p>Read more: <a href="[LINK_TO_BLOG_POST]">View Post</a></p>`;
      break;
    case 'EDUCATION_PROGRAMS':
      subject = `New Education Program ${action === 'added' ? 'Launched' : 'Updated'}: ${item.title}`;
      htmlBody += `<p>We've ${action === 'added' ? 'launched a new' : 'updated an existing'} education program: <strong>${item.title}</strong></p>
                   <p>Description: ${item.description}</p>
                   <p>Learn more: <a href="[LINK_TO_PROGRAM]">View Program</a></p>`;
      break;
    case 'TOURS':
      subject = `New Eco-Tour ${action === 'added' ? 'Available' : 'Updated'}: ${item.title}`;
      htmlBody += `<p>Discover our ${action === 'added' ? 'new' : 'updated'} eco-tour: <strong>${item.title}</strong></p>
                   <p>Region: ${item.region}</p>
                   <p>Find out more: <a href="[LINK_TO_TOUR]">View Tour</a></p>`;
      break;
    case 'PROJECTS':
      subject = `New Conservation Project ${action === 'added' ? 'Started' : 'Updated'}: ${item.name}`;
      htmlBody += `<p>A new conservation project has ${action === 'added' ? 'started' : 'been updated'}: <strong>${item.name}</strong></p>
                   <p>Location: ${item.location}</p>
                   <p>Details: <a href="[LINK_TO_PROJECT]">View Project</a></p>`;
      break;
    default:
      // No notification for other types or if type is not recognized
      return null;
  }
  htmlBody += `<p>Thank you for your continued support.</p><p>Sincerely,<br>The Greenvours Team</p>`;
  return { subject, htmlBody };
};

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
  console.log(`TO: ${RECIPIENT_EMAIL}`); // In a real app, this would be a list of user emails
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

export function addItem<T extends { id: number | string }>(key: string, item: Omit<T, 'id'>): T[] {
    const items = getData<T>(key, []);
    const newItem = { ...item, id: new Date().getTime().toString() } as T;
    const updatedItems = [...items, newItem];
    saveData(key, updatedItems);

    const notification = generateNotificationEmail(key, newItem, 'added');
    if (notification) {
      sendNotificationEmail(notification);
    }
    return updatedItems;
}

export function updateItem<T extends { id: number | string }>(key: string, updatedItem: T): T[] {
    const items = getData<T>(key, []);
    const updatedItems = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    saveData(key, updatedItems);
    
    const notification = generateNotificationEmail(key, updatedItem, 'updated');
    if (notification) {
      sendNotificationEmail(notification);
    }
    return updatedItems;
}

export function deleteItem<T extends { id: number | string }>(key: string, id: number | string): T[] {
    const items = getData<T>(key, []);
    const updatedItems = items.filter(item => item.id !== id);
    saveData(key, updatedItems);
    return updatedItems;
}
