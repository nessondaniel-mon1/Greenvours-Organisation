import React from 'react';
import { Page, NewsArticle } from '../types';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const newsData: NewsArticle[] = [
    { id: 1, title: 'Major Reforestation Drive in Budongo Forest', excerpt: 'We planted over 10,000 native saplings this past quarter, protecting vital chimpanzee habitats.', imageUrl: 'https://picsum.photos/seed/ugnews1/600/400', category: 'Conservation', date: 'Oct 28, 2023' },
    { id: 2, title: 'Urgent Flood Relief in Kasese District', excerpt: 'Our team is on the ground providing essential supplies to families affected by the recent floods from River Nyamwamba.', imageUrl: 'https://picsum.photos/seed/ugnews2/600/400', category: 'Relief Update', date: 'Oct 25, 2023' },
    { id: 3, title: 'Discovering the Beauty of Sipi Falls', excerpt: 'A look back at our latest eco-tour, balancing adventure with responsible travel in Eastern Uganda.', imageUrl: 'https://picsum.photos/seed/ugnews3/600/400', category: 'Travel', date: 'Oct 22, 2023' },
];


const HeroSection: React.FC<HomePageProps> = ({ navigate }) => (
  <div className="relative h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center text-white">
    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    <img src="https://picsum.photos/seed/ughero/1600/900" alt="Inspiring Ugandan landscape" className="absolute inset-0 w-full h-full object-cover"/>
    <div className="relative z-20 text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Explore with Purpose. Act with Impact.</h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        Experience the world's natural wonders while funding vital conservation and community aid projects.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button onClick={() => navigate('experiences')} className="bg-brand-accent text-brand-green font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-transform duration-200 hover:scale-105 w-full sm:w-auto">
          Book an Adventure
        </button>
        <button onClick={() => navigate('mission')} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-brand-green transition w-full sm:w-auto">
          Support Our Mission
        </button>
      </div>
    </div>
  </div>
);

const PillarsSection: React.FC<HomePageProps> = ({ navigate }) => (
  <section className="py-16 bg-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">What We Do</h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Our work is centered around three core pillars, creating a cycle of positive impact.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Pillar 1 */}
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-brand-accent mb-4">
            {/* Icon placeholder */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Eco-Tourism & Experiences</h3>
          <p className="text-gray-300 mb-4">Sustainable, guided tours that offer authentic connections with nature and culture, directly funding our mission.</p>
          <button onClick={() => navigate('experiences')} className="text-brand-accent font-semibold hover:text-yellow-300 transition">Explore Tours &rarr;</button>
        </div>
        {/* Pillar 2 */}
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-brand-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Conservation & Education</h3>
          <p className="text-gray-300 mb-4">Active projects, training, and workshops dedicated to preserving biodiversity and empowering local communities.</p>
          <button onClick={() => navigate('conservation')} className="text-brand-accent font-semibold hover:text-yellow-300 transition">Our Projects &rarr;</button>
        </div>
        {/* Pillar 3 */}
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
           <div className="text-brand-accent mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 20c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM4 14c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm16-2c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM8 10c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm8 4c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" /></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Disaster Relief & Community Aid</h3>
          <p className="text-gray-300 mb-4">Rapid, on-the-ground assistance for communities affected by natural calamities, ensuring swift and effective support.</p>
          <button onClick={() => navigate('relief')} className="text-brand-accent font-semibold hover:text-yellow-300 transition">Current Efforts &rarr;</button>
        </div>
      </div>
    </div>
  </section>
);

const NewsSection: React.FC<HomePageProps> = ({ navigate }) => (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest News & Impact</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">See how your support is making a difference on the ground.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.map(article => (
                <div key={article.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                    <div className="p-6">
                        <p className="text-sm text-brand-accent font-semibold">{article.category}</p>
                        <h3 className="text-xl font-bold text-white mt-2 mb-2">{article.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{article.excerpt}</p>
                        <button onClick={() => navigate('blog')} className="font-semibold text-brand-accent hover:text-yellow-300 transition">Read More &rarr;</button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
);

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <>
      <HeroSection navigate={navigate} />
      <PillarsSection navigate={navigate} />
      <NewsSection navigate={navigate} />
    </>
  );
};

export default HomePage;