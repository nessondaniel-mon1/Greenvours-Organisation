
import React, { useState, useEffect } from 'react';
import { Tour } from '../types';
import { getTours } from '../services/dataService';

interface TourDetailPageProps {
  tour: Tour;
  onBack: () => void;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onBack }) => {
    const [detailedTour, setDetailedTour] = useState<Tour | null>(null);

    useEffect(() => {
        const allTours = getTours();
        const foundTour = allTours.find(t => t.id === tour.id);
        setDetailedTour(foundTour || tour);
    }, [tour]);

    if (!detailedTour) {
        return <div className="text-center py-20 text-white">Loading tour details...</div>;
    }

    return (
        <div className="bg-gray-900">
            <div className="relative h-96">
                <img src={detailedTour.imageUrl} alt={detailedTour.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                     <button onClick={onBack} className="absolute top-8 left-4 sm:left-6 lg:left-8 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-75 transition">
                        &larr; Back to all experiences
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{detailedTour.title}</h1>
                    <p className="text-xl text-gray-200 mt-2">{detailedTour.region} &bull; {detailedTour.duration} Days</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">Tour Overview</h2>
                        <p className="text-lg text-gray-300 mb-8">{detailedTour.description}</p>
                        
                        <h2 className="text-3xl font-bold text-white mb-6">Itinerary</h2>
                        <div className="space-y-6 border-l-2 border-brand-accent pl-6">
                            {detailedTour.itinerary && detailedTour.itinerary.map(item => (
                                <div key={item.day}>
                                    <div className="flex items-center">
                                        <div className="bg-brand-accent text-brand-green rounded-full h-8 w-8 flex items-center justify-center font-bold -ml-10">
                                            {item.day}
                                        </div>
                                        <h3 className="text-xl font-semibold text-white ml-4">{item.title}</h3>
                                    </div>
                                    <p className="mt-2 text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>

                         <h2 className="text-3xl font-bold text-white mt-12 mb-4">Your Guide</h2>
                        <div className="bg-gray-800 p-6 rounded-lg flex items-center">
                            <img src={detailedTour.guide.imageUrl} alt={detailedTour.guide.name} className="h-24 w-24 rounded-full object-cover mr-6" />
                            <div>
                                <h3 className="text-2xl font-bold text-white">{detailedTour.guide.name}</h3>
                                <p className="text-gray-300 mt-2">{detailedTour.guide.bio}</p>
                            </div>
                        </div>

                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md sticky top-28">
                            <h3 className="text-2xl font-bold text-white">Booking Details</h3>
                            <div className="mt-4 text-4xl font-bold text-brand-accent">UGX {detailedTour.price.toLocaleString()} <span className="text-lg font-normal text-gray-400">/ person</span></div>
                            
                            <ul className="mt-6 space-y-2 text-gray-200">
                                <li className="flex items-center"><span className="text-brand-accent mr-2">&#10003;</span> Expert Local Guide</li>
                                <li className="flex items-center"><span className="text-brand-accent mr-2">&#10003;</span> All Accommodations</li>
                                <li className="flex items-center"><span className="text-brand-accent mr-2">&#10003;</span> Park Entrance Fees</li>
                                <li className="flex items-center"><span className="text-brand-accent mr-2">&#10003;</span> Most Meals</li>
                            </ul>

                             <button className="w-full bg-brand-accent text-brand-green font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition mt-8 text-lg">
                                Book Now
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-2">Secure booking via Stripe.</p>

                            <h4 className="text-xl font-semibold text-white mt-8 mb-2">Sustainability Impact</h4>
                             <ul className="mt-2 space-y-1 text-sm text-gray-400 list-disc list-inside">
                                {detailedTour.sustainabilityFeatures && detailedTour.sustainabilityFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetailPage;