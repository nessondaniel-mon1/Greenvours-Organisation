import React from 'react';
import { Project } from '../types';

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project, onBack }) => {
    
    const StatIcon: React.FC<{ icon: 'users' | 'leaf' | 'eye' | 'area' | 'trap' | 'book' }> = ({ icon }) => {
        const icons = {
            users: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></>,
            leaf: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
            eye: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>,
            area: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5v4m0 0h4" />,
            trap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />,
            book: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
        };

        return (
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icons[icon] || icons.leaf}
            </svg>
        )
    };

    const getIconForStat = (label: string): React.ReactElement => {
        const lowerLabel = label.toLowerCase();
        if (lowerLabel.includes('guides') || lowerLabel.includes('households') || lowerLabel.includes('rangers')) return <StatIcon icon="users" />;
        if (lowerLabel.includes('sightings')) return <StatIcon icon="eye" />;
        if (lowerLabel.includes('hectares')) return <StatIcon icon="area" />;
        if (lowerLabel.includes('trees')) return <StatIcon icon="leaf" />;
        if (lowerLabel.includes('snares')) return <StatIcon icon="trap" />;
        if (lowerLabel.includes('students')) return <StatIcon icon="book" />;
        return <StatIcon icon="leaf" />;
    };

    return (
        <div className="bg-gray-900">
            <div className="relative h-96">
                <img src={project.imageUrl} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                     <button onClick={onBack} className="absolute top-8 left-4 sm:left-6 lg:left-8 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-75 transition">
                        &larr; Back to all projects
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{project.name}</h1>
                    <p className="text-xl text-gray-200 mt-2">{project.location}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">About the Project</h2>
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">{project.longDescription}</p>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Key Goals</h2>
                        <ul className="space-y-4">
                            {project.goals.map((goal, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-brand-accent mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-gray-300 text-lg">{goal}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md sticky top-28">
                            <h3 className="text-2xl font-bold text-white mb-6">Impact Snapshot</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                                {project.impactStats.map(stat => (
                                    <div key={stat.label} className="text-center">
                                        <div className="bg-brand-green h-14 w-14 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            {getIconForStat(stat.label)}
                                        </div>
                                        <div>
                                            <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                                            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Project Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {project.galleryImages.map((imgUrl, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img src={imgUrl} alt={`${project.name} gallery image ${index + 1}`} className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailPage;