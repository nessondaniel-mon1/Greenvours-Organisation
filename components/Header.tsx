
import React, { useState } from 'react';
import { Page } from '../types';

interface HeaderProps {
  navigate: (page: Page) => void;
  currentPage: Page;
}

const NavLink: React.FC<{ page: Page; currentPage: Page; navigate: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, navigate, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => navigate(page)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? 'text-brand-accent' : 'text-white hover:text-brand-accent'
      }`}
    >
      {children}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'experiences', label: 'Experiences' },
    { page: 'mission', label: 'Our Mission' },
    { page: 'conservation', label: 'Conservation' },
    { page: 'relief', label: 'Relief & Aid' },
    { page: 'blog', label: 'Blog' },
    { page: 'contact', label: 'Contact' },
  ];

  return (
    <header className="bg-brand-green shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <button onClick={() => navigate('home')} className="text-2xl font-bold text-white tracking-wider">
              GREENVOURS
            </button>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <NavLink key={item.page} page={item.page} currentPage={currentPage} navigate={navigate}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <button
              onClick={() => navigate('involved')}
              className="bg-brand-accent text-brand-green font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-transform duration-200 hover:scale-105"
            >
              Get Involved
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-brand-light-green">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => {
                  navigate(item.page);
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-brand-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                navigate('involved');
                setIsMenuOpen(false);
              }}
              className="bg-brand-accent text-brand-green font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition w-full mt-4"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
