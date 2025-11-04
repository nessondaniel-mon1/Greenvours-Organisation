import React, { useState, useCallback } from 'react';
import { Page, Tour } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExperiencesPage from './pages/ExperiencesPage';
import MissionPage from './pages/MissionPage';
import ConservationPage from './pages/ConservationPage';
import ReliefPage from './pages/ReliefPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import TourDetailPage from './pages/TourDetailPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setSelectedTour(null); 
    window.scrollTo(0, 0);
  }, []);

  const viewTourDetail = useCallback((tour: Tour) => {
    setSelectedTour(tour);
    setCurrentPage('tour-detail');
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    if (currentPage === 'tour-detail' && selectedTour) {
      return <TourDetailPage tour={selectedTour} onBack={() => navigate('experiences')} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'experiences':
        return <ExperiencesPage viewTourDetail={viewTourDetail} />;
      case 'mission':
        return <MissionPage />;
      case 'conservation':
        return <ConservationPage />;
      case 'relief':
        return <ReliefPage navigate={navigate} />;
      case 'involved':
        return <GetInvolvedPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-300 font-sans">
      <Header navigate={navigate} currentPage={currentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer navigate={navigate}/>
    </div>
  );
};

export default App;