// FIX: Update Firebase imports for v8 compatibility to resolve module export errors.
// FIX: Update Firebase imports for v8 compatibility to resolve module export errors and property access issues.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
// FIX: Use v8 initialization check.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase services
// FIX: Use v8 namespaced API.
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, googleProvider };