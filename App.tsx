import React, { useState, useCallback, useEffect } from 'react';
import { Page, Tour, Project, EducationProgram, NewsArticle } from './types';
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
import { initializeData, getAdminPassword, setAdminPassword } from './services/dataService';
import EducationProgramDetailPage from './pages/EducationProgramDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import { auth } from './services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<EducationProgram | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    // Initialize all data, including admin password if not set
    initializeData();
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const performNavigation = useCallback((targetPage: Page) => {
    // If navigating away from the admin page, reset admin status for security.
    if (targetPage !== 'admin') {
      setIsAdmin(false);
    }
    setCurrentPage(targetPage);
    setSelectedTour(null);
    setSelectedProject(null);
    setSelectedProgram(null);
    setSelectedArticle(null);
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
    if (password === getAdminPassword()) {
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

  const viewProgramDetail = useCallback((program: EducationProgram) => {
    setSelectedProgram(program);
    setCurrentPage('education-program-detail');
    window.scrollTo(0, 0);
  }, []);

  const viewBlogDetail = useCallback((article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentPage('blog-detail');
    window.scrollTo(0, 0);
  }, []);


  const renderPage = () => {
    if (currentPage === 'tour-detail' && selectedTour) {
      return <TourDetailPage tour={selectedTour} onBack={() => navigate('experiences')} />;
    }
    if (currentPage === 'project-detail' && selectedProject) {
        return <ProjectDetailPage project={selectedProject} onBack={() => navigate('conservation')} />;
    }
    if (currentPage === 'education-program-detail' && selectedProgram) {
        return <EducationProgramDetailPage program={selectedProgram} onBack={() => navigate('conservation')} />;
    }
    if (currentPage === 'blog-detail' && selectedArticle) {
        return <BlogDetailPage article={selectedArticle} onBack={() => navigate('blog')} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'experiences':
        return <ExperiencesPage viewTourDetail={viewTourDetail} />;
      case 'mission':
        return <MissionPage isAdmin={isAdmin} />;
      case 'conservation':
        return <ConservationPage viewProjectDetail={viewProjectDetail} viewProgramDetail={viewProgramDetail} />;
      case 'relief':
        return <ReliefPage navigate={navigate} user={user} />;
      case 'involved':
        return <GetInvolvedPage />;
      case 'blog':
        return <BlogPage viewBlogDetail={viewBlogDetail} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return isAdmin ? <AdminPage /> : <HomePage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  if (!authInitialized) {
    return (
      <div className="bg-gray-900 h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-300 font-sans">
      <Header navigate={navigate} currentPage={currentPage} user={user} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer navigate={navigate} user={user} />
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