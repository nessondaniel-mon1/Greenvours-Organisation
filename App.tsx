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
import EducationProgramDetailPage from './pages/EducationProgramDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import { auth, checkAdminStatus } from './services/firebase'; // Import checkAdminStatus
import { User, onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<EducationProgram | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // New state for admin status
  const [authInitialized, setAuthInitialized] = useState(false);

  // State to manage navigation history
  const [historyStack, setHistoryStack] = useState<{ page: Page; tour: Tour | null; project: Project | null; program: EducationProgram | null; article: NewsArticle | null }[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => { // Make callback async
      setUser(currentUser);
      if (currentUser) {
        const admin = await checkAdminStatus(currentUser);
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
      setAuthInitialized(true);
    });

    // Initialize history with the home page if not already set
    if (window.history.state === null || window.history.state.page === undefined) {
      const initialState = { page: 'home', tour: null, project: null, program: null, article: null };
      window.history.replaceState(initialState, '', '/');
      setHistoryStack([initialState]);
    }

    return () => unsubscribe();
  }, []);

  // Handle browser's back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page) {
        setCurrentPage(state.page);
        setSelectedTour(state.tour || null);
        setSelectedProject(state.project || null);
        setSelectedProgram(state.program || null);
        setSelectedArticle(state.article || null);
        // Update historyStack to reflect the browser's history
        setHistoryStack(prev => {
          const index = prev.findIndex(item => 
            item.page === state.page && 
            item.tour?.id === state.tour?.id && 
            item.project?.id === state.project?.id && 
            item.program?.id === state.program?.id && 
            item.article?.id === state.article?.id
          );
          return index !== -1 ? prev.slice(0, index + 1) : [state];
        });
      } else {
        // Default to home if no state is found (e.g., initial load or external navigation)
        setCurrentPage('home');
        setSelectedTour(null);
        setSelectedProject(null);
        setSelectedProgram(null);
        setSelectedArticle(null);
        setHistoryStack([{ page: 'home', tour: null, project: null, program: null, article: null }]);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Empty dependency array to ensure it only runs once

 const performNavigation = useCallback((targetPage: Page, tour: Tour | null = null, project: Project | null = null, program: EducationProgram | null = null, article: NewsArticle | null = null) => {
    setCurrentPage(targetPage);
    setSelectedTour(tour);
    setSelectedProject(project);
    setSelectedProgram(program);
    setSelectedArticle(article);
    window.scrollTo(0, 0);

    // Construct a more descriptive URL
    let path = `/${targetPage}`;
    if (tour) path = `/experiences/${tour.id}`;
    else if (project) path = `/conservation/${project.id}`;
    else if (program) path = `/conservation/program/${program.id}`;
    else if (article) path = `/blog/${article.id}`;

    const newState = { page: targetPage, tour, project, program, article };
    window.history.pushState(newState, '', path);
    setHistoryStack(prev => [...prev, newState]);
  }, []);

  const navigate = useCallback((page: Page) => {
    if (page === 'admin') {
      if (user) { // Check if user is logged in for admin access
        performNavigation('admin');
      } else {
        alert('Please log in to access the admin panel.'); // Or redirect to login
      }
    } else {
      performNavigation(page);
    }
  }, [user, performNavigation]);

  const viewTourDetail = useCallback((tour: Tour) => {
    performNavigation('tour-detail', tour);
  }, [performNavigation]);

  const viewProjectDetail = useCallback((project: Project) => {
    performNavigation('project-detail', null, project);
  }, [performNavigation]);

  const viewProgramDetail = useCallback((program: EducationProgram) => {
    performNavigation('education-program-detail', null, null, program);
  }, [performNavigation]);

  const viewBlogDetail = useCallback((article: NewsArticle) => {
    performNavigation('blog-detail', null, null, null, article);
  }, [performNavigation]);


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
      <Header navigate={navigate} currentPage={currentPage} user={user} isAdmin={isAdmin} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <Footer navigate={navigate} user={user} isAdmin={isAdmin} />
    </div>
  );
};

export default App;