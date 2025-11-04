import React from 'react';
import { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
    { id: 1, name: 'Dr. Grace Nakato', role: 'Founder & Lead Conservationist', bio: 'With a Ph.D. in Environmental Science from Makerere University, Grace founded Greenvours to connect responsible tourism with tangible conservation in Uganda.', imageUrl: 'https://picsum.photos/seed/ugteam1/400/400' },
    { id: 2, name: 'David Mwesige', role: 'Head of Eco-Tours', bio: 'An experienced guide with 15+ years leading safaris, David ensures all our trips are safe, authentic, and respectful of Uganda\'s natural heritage.', imageUrl: 'https://picsum.photos/seed/ugteam2/400/400' },
    { id: 3, name: 'Sarah Achen', role: 'Director of Community Aid', bio: 'Sarah coordinates our relief efforts, working tirelessly with local leaders in regions like Karamoja to deliver aid where it\'s needed most.', imageUrl: 'https://picsum.photos/seed/ugteam3/400/400' },
];

const MissionPage: React.FC = () => {
    return (
        <div className="bg-gray-900">
            <div className="bg-brand-light-green text-white py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Our Mission & Impact</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto">We exist to protect our planet's most precious ecosystems and support the communities who call them home.</p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Greenvours was founded on a simple, powerful idea: that travel can be a force for good in Uganda. We envision a world where exploring the Pearl of Africa directly contributes to its preservation, and where local communities are empowered as its primary custodians. 
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                By creating a self-sustaining cycle—where tourism funds conservation and relief, which in turn protects the natural wonders that attract travelers—we aim to build a resilient future for both people and planet.
                            </p>
                        </div>
                        <div>
                            <img src="https://picsum.photos/seed/ugmission/600/400" alt="Team working in Uganda" className="rounded-lg shadow-xl"/>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Impact by the Numbers</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Your support translates into real, measurable action.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                            <div className="text-5xl font-bold text-brand-accent">15,000+</div>
                            <p className="mt-2 text-xl font-semibold text-white">Trees Planted</p>
                        </div>
                        <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                            <div className="text-5xl font-bold text-brand-accent">8</div>
                            <p className="mt-2 text-xl font-semibold text-white">Ecosystems Protected</p>
                        </div>
                        <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
                            <div className="text-5xl font-bold text-brand-accent">2,500+</div>
                            <p className="mt-2 text-xl font-semibold text-white">Families Aided in Crises</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <a href="#" className="text-brand-accent font-semibold hover:text-yellow-300 transition">Download Full Impact Report (PDF) &rarr;</a>
                    </div>
                </div>
            </section>

            <section className="py-16">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Meet the Team</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Our passionate experts from around the globe.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map(member => (
                            <div key={member.id} className="text-center">
                                <img src={member.imageUrl} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover shadow-lg"/>
                                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                                <p className="text-brand-accent font-semibold mb-2">{member.role}</p>
                                <p className="text-gray-400">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </section>

        </div>
    );
};

export default MissionPage;