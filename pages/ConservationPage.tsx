import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
    { id: 1, name: 'Shoebill Stork Conservation', location: 'Mabamba Bay, Lake Victoria', description: 'Working with local fishing communities to protect the nesting sites of the iconic shoebill stork and reduce human-wildlife conflict.', imageUrl: 'https://picsum.photos/seed/ugproject1/600/400' },
    { id: 2, name: 'Kibale Forest Reforestation', location: 'Kibale, Western Uganda', description: 'Establishing tree nurseries and reforesting degraded areas bordering Kibale National Park to expand the corridor for chimpanzees and other primates.', imageUrl: 'https://picsum.photos/seed/ugproject2/600/400' },
    { id: 3, name: 'Mountain Gorilla Habitat Protection', location: 'Bwindi Impenetrable National Park', description: 'Funding anti-poaching patrols and community education programs to ensure the long-term survival of the mountain gorilla population.', imageUrl: 'https://picsum.photos/seed/ugproject3/600/400' },
];

const ConservationPage: React.FC = () => {
    return (
        <div className="bg-gray-900">
            <div className="bg-brand-green text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Conservation & Education</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">Protecting biodiversity and empowering the next generation of environmental stewards.</p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Active Conservation Projects</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Our on-the-ground efforts to preserve critical ecosystems and wildlife.</p>
                    </div>
                    <div className="space-y-12">
                        {projects.map((project, index) => (
                            <div key={project.id} className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                                <div className={`${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                    <img src={project.imageUrl} alt={project.name} className="rounded-lg shadow-xl"/>
                                </div>
                                <div className={`${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                                    <p className="text-brand-accent font-semibold">{project.location}</p>
                                    <h3 className="text-2xl font-bold text-white mt-1 mb-3">{project.name}</h3>
                                    <p className="text-gray-300 leading-relaxed">{project.description}</p>
                                    <button className="mt-4 text-brand-accent font-semibold hover:text-yellow-300 transition">Learn More &rarr;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Education Programs</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Knowledge is the first step towards conservation.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-white mb-3">Community Workshops</h3>
                            <p className="text-gray-300 mb-4">We run workshops for local communities on sustainable agriculture, waste management, and the economic benefits of conservation, providing them with the tools to protect their natural heritage.</p>
                            <button className="text-brand-accent font-semibold hover:text-yellow-300 transition">View Workshop Schedule &rarr;</button>
                        </div>
                         <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-white mb-3">School Programs & Resources</h3>
                            <p className="text-gray-300 mb-4">Our team has developed educational materials for schools, offering free, downloadable lesson plans and occasionally visiting classrooms to inspire young minds about the wonders of the natural world.</p>
                            <button className="text-brand-accent font-semibold hover:text-yellow-300 transition">Access Free Resources &rarr;</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ConservationPage;