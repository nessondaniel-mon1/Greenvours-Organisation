import React, { useState, FormEvent } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { createUser } from '../services/dataService';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase'; // Import db from firebase.ts

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await createUser(user.uid, { email: user.email });
      }
      onClose();
    } catch (error: any) {
      console.error("Failed to sign in:", error);
      setError(error.message);
      setStatus('idle');
    }
  };

  const handleGoogleSignIn = async () => {
    setStatus('submitting');
    setError(null);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await createUser(user.uid, { email: user.email, displayName: user.displayName });
      }
      onClose();
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError("Failed to sign in with Google. Please try again.");
      }
      setStatus('idle');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Login</h2>
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
                              <input type="password" id="password" value={formData.password} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" autoComplete="current-password" />          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-wait"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.583l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
              <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 34.421 44 29.825 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
            </svg>
            {status === 'submitting' ? 'Logging In...' : 'Login with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
