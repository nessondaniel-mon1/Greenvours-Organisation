import React, { useState, useCallback, useEffect } from 'react';
import { Page, Tour, Project } from './types';
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
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminPage from './pages/AdminPage';
import PasswordModal from './components/PasswordModal';
import { initializeData } from './services/dataService';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const performNavigation = useCallback((targetPage: Page) => {
    // If navigating away from the admin page, reset admin status for security.
    if (targetPage !== 'admin') {
      setIsAdmin(false);
    }
    setCurrentPage(targetPage);
    setSelectedTour(null);
    setSelectedProject(null);
    window.scrollTo(0, 0);
  }, []);

  const navigate = useCallback((page: Page) => {
    if (page === 'admin') {
      if (isAdmin) {
        performNavigation('admin');
      } else {
        setIsPasswordModalVisible(true);
      }
    } else {
      performNavigation(page);
    }
  }, [isAdmin, performNavigation]);

  const handlePasswordSubmit = (password: string) => {
    if (password === 'admin') {
      setIsAdmin(true);
      performNavigation('admin');
    } else {
      alert('Incorrect password.');
    }
    setIsPasswordModalVisible(false);
  };

  const viewTourDetail = useCallback((tour: Tour) => {
    setSelectedTour(tour);
    setCurrentPage('tour-detail');
    window.scrollTo(0, 0);
  }, []);

  const viewProjectDetail = useCallback((project: Project) => {
    setSelectedProject(project);
    setCurrentPage('project-detail');
    window.scrollTo(0, 0);
  }, []);


  const renderPage = () => {
    if (currentPage === 'tour-detail' && selectedTour) {
      return <TourDetailPage tour={selectedTour} onBack={() => navigate('experiences')} />;
    }
    if (currentPage === 'project-detail' && selectedProject) {
        return <ProjectDetailPage project={selectedProject} onBack={() => navigate('conservation')} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'experiences':
        return <ExperiencesPage viewTourDetail={viewTourDetail} />;
      case 'mission':
        return <MissionPage />;
      case 'conservation':
        return <ConservationPage viewProjectDetail={viewProjectDetail} />;
      case 'relief':
        return <ReliefPage navigate={navigate} />;
      case 'involved':
        return <GetInvolvedPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return isAdmin ? <AdminPage /> : <HomePage navigate={navigate} />;
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
      {isPasswordModalVisible && (
        <PasswordModal 
          onSubmit={handlePasswordSubmit}
          onCancel={() => setIsPasswordModalVisible(false)}
        />
      )}
    </div>
  );
};

export default App;