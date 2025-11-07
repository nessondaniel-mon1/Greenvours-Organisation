import React, { useState, useEffect } from 'react';
import { Page, ReliefProject, HowWeHelpItem } from '../types';
import { getReliefProjects, getHowWeHelpItems } from '../services/dataService';
import { User } from 'firebase/auth';

interface ReliefPageProps {
    navigate: (page: Page) => void;
    user: User | null;
}

const ReliefPage: React.FC<ReliefPageProps> = ({ navigate, user }) => {
    const [reliefProjects, setReliefProjects] = useState<ReliefProject[]>([]);
    const [howWeHelpItems, setHowWeHelpItems] = useState<HowWeHelpItem[]>([]);

    useEffect(() => {
        const unsubReliefProjects = getReliefProjects(setReliefProjects);
        const unsubHowWeHelpItems = getHowWeHelpItems(setHowWeHelpItems);

        return () => {
            unsubReliefProjects();
            unsubHowWeHelpItems();
        };
    }, []);

    return (
        <div className="bg-gray-900">
            <div className="bg-red-700 text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Disaster Relief & Community Aid</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">Providing rapid, effective, and transparent aid to communities in crisis.</p>
                </div>
            </div>
            
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Current Emergency Response</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Our teams are actively responding to the following crises:</p>
                    </div>
                    
                    <div className="space-y-12">
                        {reliefProjects.map(project => (
                            <div key={project.id} className="bg-red-900 bg-opacity-20 border-l-4 border-red-400 p-8 rounded-r-lg shadow-lg max-w-4xl mx-auto">
                                <div className="flex items-center mb-2">
                                    {project.status === 'active' && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3 animate-pulse">ACTIVE</span>
                                    )}
                                    {project.status === 'completed' && (
                                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-3">COMPLETED</span>
                                    )}
                                    <h3 className="text-2xl font-bold text-red-300">{project.title}</h3>
                                </div>
                                <p className="text-gray-300 mb-4">{project.description}</p>
                                {project.status === 'active' && (
                                    <>
                                        <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                                            <div className="bg-brand-accent h-4 rounded-full" style={{ width: `${(project.raised / project.goal) * 100}%` }}></div>
                                        </div>
                                        <p className="text-sm text-gray-400 text-right font-semibold">UGX {project.raised.toLocaleString()} of UGX {project.goal.toLocaleString()} Goal Raised</p>
                                        <button 
                                            onClick={() => navigate('involved')}
                                            className="mt-6 w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition"
                                        >
                                            Donate to this Emergency
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">How We Help</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Our aid is focused, efficient, and community-led.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {howWeHelpItems.map(item => (
                            <div key={item.id} className="bg-gray-700 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReliefPage;