
import React, { useState, useMemo, useEffect } from 'react';
import { Tour } from '../types';
import { getTours } from '../services/dataService';


interface TourCardProps {
  tour: Tour;
  viewTourDetail: (tour: Tour) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, viewTourDetail }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img src={tour.imageUrl} alt={tour.title} className="w-full h-56 object-cover" />
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-gray-400">{tour.region} &bull; {tour.duration} days</p>
                        <h3 className="text-xl font-bold text-white mt-1">{tour.title}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-brand-accent">UGX {tour.price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">per person</p>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
                    <span className="bg-gray-700 px-2 py-1 rounded-full">{tour.activity}</span>
                    <span className="bg-gray-700 px-2 py-1 rounded-full">{tour.difficulty}</span>
                </div>
                <button
                    onClick={() => viewTourDetail(tour)}
                    className="mt-6 w-full bg-brand-accent text-brand-green font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

interface ExperiencesPageProps {
  viewTourDetail: (tour: Tour) => void;
}


const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ viewTourDetail }) => {
    const [toursData, setToursData] = useState<Tour[]>([]);
    const [filters, setFilters] = useState({
        region: 'all',
        activity: 'all',
        difficulty: 'all',
    });
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = getTours(setToursData);
        return () => unsubscribe();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredTours = useMemo(() => {
        return toursData.filter(tour => {
            return (filters.region === 'all' || tour.region === filters.region) &&
                   (filters.activity === 'all' || tour.activity === filters.activity) &&
                   (filters.difficulty === 'all' || tour.difficulty === filters.difficulty);
        });
    }, [filters, toursData]);

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Our Experiences</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Find your next responsible adventure. Every trip supports our conservation and relief efforts.</p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-8 sticky top-20 z-30">
                     <button
                        onClick={() => setIsFilterVisible(!isFilterVisible)}
                        className="w-full flex justify-between items-center text-lg font-semibold text-gray-200 hover:text-white transition"
                        aria-expanded={isFilterVisible}
                        aria-controls="filter-panel"
                    >
                        <span>Filter Trips</span>
                        <svg className={`w-5 h-5 transition-transform duration-300 ${isFilterVisible ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {isFilterVisible && (
                        <div id="filter-panel" className="mt-4 pt-4 border-t border-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="region-filter" className="block text-sm font-medium text-gray-300 mb-1">Region</label>
                                    <select id="region-filter" name="region" value={filters.region} onChange={handleFilterChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                        <option value="all">All Regions</option>
                                        <option value="Western Uganda">Western Uganda</option>
                                        <option value="Central Uganda">Central Uganda</option>
                                        <option value="Northern Uganda">Northern Uganda</option>
                                        <option value="Eastern Uganda">Eastern Uganda</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="activity-filter" className="block text-sm font-medium text-gray-300 mb-1">Activity</label>
                                    <select id="activity-filter" name="activity" value={filters.activity} onChange={handleFilterChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                        <option value="all">All Activities</option>
                                        <option value="Hiking">Hiking</option>
                                        <option value="Birdwatching">Birdwatching</option>
                                        <option value="Wildlife">Wildlife</option>
                                        <option value="Cultural">Cultural</option>
                                        <option value="Wellness">Wellness</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                                    <select id="difficulty-filter" name="difficulty" value={filters.difficulty} onChange={handleFilterChange} className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                        <option value="all">All Difficulties</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Challenging">Challenging</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTours.map(tour => (
                        <TourCard key={tour.id} tour={tour} viewTourDetail={viewTourDetail} />
                    ))}
                </div>
                 {filteredTours.length === 0 && (
                    <div className="text-center py-16 col-span-full">
                        <p className="text-xl text-gray-400">No tours match your current filters. Try adjusting your search!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperiencesPage;