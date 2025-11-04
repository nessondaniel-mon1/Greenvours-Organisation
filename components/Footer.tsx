
import React from 'react';
import { Page } from '../types';

interface FooterProps {
  navigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
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
            <form className="flex">
              <input type="email" placeholder="Your Email" className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none" />
              <button type="submit" className="bg-brand-accent text-brand-green font-bold px-4 py-2 rounded-r-md hover:bg-opacity-90">Sign Up</button>
            </form>
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