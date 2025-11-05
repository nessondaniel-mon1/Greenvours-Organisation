import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

interface GoogleSignUpModalProps {
  onClose: () => void;
}

const GoogleSignUpModal: React.FC<GoogleSignUpModalProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Use the modular signInWithPopup function from Firebase v9+.
      await signInWithPopup(auth, googleProvider);
      onClose(); // Close modal on successful sign-in
    } catch (err: any) {
      console.error("Google sign-in error:", err);
      // Don't show an error message if the user simply closes the popup.
      if (err.code !== 'auth/popup-closed-by-user') {
          setError("Failed to sign in. Please try again.");
      }
    } finally {
        setIsSubmitting(false);
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
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-4" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.583l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 34.421 44 29.825 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">Sign In with Google</h2>
            <p className="text-gray-400 mb-6">Continue to Greenvours</p>

            <button
                onClick={handleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-3 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-wait"
            >
                {isSubmitting ? 'Signing In...' : 'Continue with Google'}
            </button>
            
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
            
            <div className="text-center mt-6">
              <button onClick={onClose} className="text-gray-400 hover:text-white text-sm">Cancel</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignUpModal;