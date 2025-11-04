import React, { useState, FormEvent } from 'react';
import { Page } from '../types';

interface FooterProps {
  navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submittingProvider, setSubmittingProvider] = useState<'email' | 'google' | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return; // Basic validation
    }
    setStatus('submitting');
    setSubmittingProvider('email');
    // Simulate an API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setSubmittingProvider(null);
      // Revert to the form after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleGoogleSignUp = () => {
    setStatus('submitting');
    setSubmittingProvider('google');
    // Simulate Google Sign-Up API call
    setTimeout(() => {
      setStatus('success');
      setSubmittingProvider(null);
      // Revert to the form after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
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
            <p className="text-gray-300 mb-2 text-sm">Stay updated on our latest efforts.</p>
            {status === 'success' ? (
              <div className="flex items-center justify-center bg-brand-light-green text-white font-semibold h-auto py-2 px-4 rounded-md">
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <div className="space-y-3">
                <form className="flex" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand-accent text-brand-green font-bold px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors disabled:bg-gray-500 disabled:cursor-wait"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' && submittingProvider === 'email' ? '...' : 'Sign Up'}
                  </button>
                </form>
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-gray-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-gray-700"></div>
                </div>
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-300 disabled:cursor-wait"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
                        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.583l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
                        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 34.421 44 29.825 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
                    </svg>
                    {status === 'submitting' && submittingProvider === 'google' ? '...' : 'Sign Up with Google'}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Greenvours Organisation. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <button onClick={() => navigate('admin')} className="text-gray-400 hover:text-brand-accent transition text-xs">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;