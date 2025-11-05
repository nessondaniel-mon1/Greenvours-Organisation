
import React, { useState, useEffect } from 'react';
import { TeamMember, VisionContent } from '../types';
import { getTeam, getVisionContent, saveVisionContent } from '../services/dataService';
import ImageUploader from '../components/ImageUploader';

interface MissionPageProps {
    isAdmin: boolean;
}

const MissionPage: React.FC<MissionPageProps> = ({ isAdmin }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [visionContent, setVisionContent] = useState<VisionContent | null>(null);
    const [isEditingImage, setIsEditingImage] = useState(false);

    useEffect(() => {
        setTeamMembers(getTeam());
        loadVisionContent();
    }, []);

    const loadVisionContent = () => {
        const vision = getVisionContent();
        if (vision.length > 0) {
            setVisionContent(vision[0]); // Assuming there's only one vision content item
        }
    };

    const handleImageUpload = (imageUrl: string) => {
        if (visionContent) {
            const updatedVisionContent = { ...visionContent, imageUrl };
            saveVisionContent([updatedVisionContent]);
            setVisionContent(updatedVisionContent);
            setIsEditingImage(false);
        }
    };

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
                            <h2 className="text-3xl font-bold text-white mb-4">{visionContent?.title || 'Our Vision'}</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                {visionContent?.content || 'Loading vision content...'}
                            </p>
                        </div>
                        <div className="relative">
                            <img src={visionContent?.imageUrl || "https://picsum.photos/seed/ugmission/600/400"} alt="Team working in Uganda" className="rounded-lg shadow-xl"/>
                            {isAdmin && !isEditingImage && (
                                <button 
                                    onClick={() => setIsEditingImage(true)}
                                    className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
                                >
                                    Edit Image
                                </button>
                            )}
                            {isAdmin && isEditingImage && (
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center rounded-lg">
                                    <ImageUploader 
                                        currentImageUrl={visionContent?.imageUrl || ''}
                                        onImageUrlChange={handleImageUpload}
                                    />
                                </div>
                            )}
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