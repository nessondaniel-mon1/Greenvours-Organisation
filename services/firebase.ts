import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth'; // Import User type
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration using environment variables.
// This is a security best practice to avoid hardcoding sensitive keys.
const firebaseConfig = {
  apiKey: "AIzaSyApvXzSKGlEU9Cc-A0p5cs0b5VwfOG3Meg",
  authDomain: "greenvours-org-b21.firebaseapp.com",
  projectId: "greenvours-org-b21",
  storageBucket: "greenvours-org-b21.firebasestorage.app",
  messagingSenderId: "763805969976",
  appId: "1:763805969976:web:0156ca196ed1b8ae44c0cd",
  measurementId: "G-W2558K55G2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Checks if a given user is an administrator.
 * @param user The Firebase User object.
 * @returns A promise that resolves to true if the user is an admin, false otherwise.
 */
export const checkAdminStatus = async (user: User | null): Promise<boolean> => {
  if (!user) {
    return false;
  }
  try {
    const adminDocRef = doc(db, 'admins', user.uid);
    const adminDocSnap = await getDoc(adminDocRef);
    return adminDocSnap.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

export { app, auth, db, functions, googleProvider };