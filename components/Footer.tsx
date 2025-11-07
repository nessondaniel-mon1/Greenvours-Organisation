import React, { useState, FormEvent, useEffect } from 'react';
import { Page } from '../types';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
// FIX: Update Firebase imports for v8 compatibility to resolve module export errors.
// FIX: Updated Firebase imports to use the v8 compatibility layer, which resolves module export errors for members like `User`.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth } from '../services/firebase';

interface FooterProps {
  navigate: (page: Page) => void;
  // FIX: Use firebase.User type for v8 compatibility.
  user: firebase.User | null;
  isAdmin: boolean; // Add isAdmin prop
}

const Footer: React.FC<FooterProps> = ({ navigate, user, isAdmin }) => { // Destructure isAdmin
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    if (isSignUpModalOpen || isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSignUpModalOpen, isLoginModalOpen]);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return; // Basic validation
    }
    setEmailStatus('submitting');
    // Simulate an API call
    setTimeout(() => {
      setEmailStatus('success');
      setEmail('');
      // Revert to the form after 3 seconds
      setTimeout(() => setEmailStatus('idle'), 3000);
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      // FIX: Use auth.signOut() method for v8 compatibility.
      await auth.signOut();
      navigate('home');
    } catch (error) {
      console.error("Error signing out: ", error);
      alert('Failed to sign out.');
    }
  };

  return (
    <>
      <footer className="bg-brand-green text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GREENVOURS</h3>
              <p className="text-gray-300 text-sm">
                Promoting environmental conservation through responsible eco-tourism and community aid.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('mission')} className="hover:text-brand-accent transition">About Us</button></li>
                <li><button onClick={() => navigate('experiences')} className="hover:text-brand-accent transition">Experiences</button></li>
                <li><button onClick={() => navigate('blog')} className="hover:text-brand-accent transition">Blog</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-brand-accent transition">Contact</button></li>
                {isAdmin && <li><button onClick={() => navigate('admin')} className="hover:text-brand-accent transition">Admin</button></li>} {/* Conditionally add Admin link */}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Get Involved</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('involved')} className="hover:text-brand-accent transition">Donate</button></li>
                <li><button onClick={() => navigate('involved')} className="hover:text-brand-accent transition">Volunteer</button></li>
                <li><button onClick={() => navigate('involved')} className="hover:text-brand-accent transition">Partnerships</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              {user ? (
                 <div className="bg-gray-700 p-4 rounded-lg text-center">
                    <p className="text-gray-200">Welcome, {user.displayName || user.email}!</p>
                    <button onClick={handleLogout} className="text-sm text-brand-accent hover:text-yellow-300 mt-2">
                        Logout
                    </button>
                </div>
              ) : emailStatus === 'success' ? (
                <div className="flex items-center justify-center bg-brand-light-green text-white font-semibold h-auto py-2 px-4 rounded-md">
                  <span>Thanks for subscribing!</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-300 mb-2 text-sm">Stay updated on our latest efforts.</p>
                  <form className="flex" onSubmit={handleEmailSubmit}>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={emailStatus === 'submitting'}
                      required
                    />
                    <button
                      type="submit"
                      className="bg-brand-accent text-brand-green font-bold px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors disabled:bg-gray-500 disabled:cursor-wait"
                      disabled={emailStatus === 'submitting'}
                    >
                      {emailStatus === 'submitting' ? '...' : 'Subscribe'}
                    </button>
                  </form>
                  <div className="relative flex items-center">
                      <div className="flex-grow border-t border-gray-700"></div>
                      <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                      <div className="flex-grow border-t border-gray-700"></div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => setIsLoginModalOpen(true)}
                        className="w-full flex items-center justify-center bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsSignUpModalOpen(true)}
                        className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Sign Up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Greenvours Organisation. All Rights Reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
               {isAdmin && <button onClick={() => navigate('admin')} className="text-gray-400 hover:text-brand-accent transition text-xs">Admin</button>} {/* Conditionally render Admin link */}
            </div>
          </div>
        </div>
      </footer>
      {isSignUpModalOpen && (
        <SignUpModal 
          onClose={() => setIsSignUpModalOpen(false)}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal 
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </>
  );
};

export default Footer;