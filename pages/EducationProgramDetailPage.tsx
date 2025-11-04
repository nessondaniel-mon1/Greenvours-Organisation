import React, { useState } from 'react';
import { EducationProgram } from '../types';
import RegisterInterestModal from '../components/RegisterInterestModal';

interface EducationProgramDetailPageProps {
  program: EducationProgram;
  onBack: () => void;
}

const EducationProgramDetailPage: React.FC<EducationProgramDetailPageProps> = ({ program, onBack }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-gray-900">
            <div className="relative h-96">
                <img src={program.imageUrl} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
                     <button onClick={onBack} className="absolute top-8 left-4 sm:left-6 lg:left-8 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-75 transition">
                        &larr; Back to all programs
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">{program.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-white mb-4">About the Program</h2>
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">{program.longDescription}</p>

                        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Program Schedule</h2>
                        <div className="space-y-4">
                            {program.schedule.map((item, index) => (
                                <div key={index} className="bg-gray-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start">
                                    <div>
                                        <p className="font-bold text-white text-lg">{item.topic}</p>
                                        <p className="text-brand-accent text-sm">{item.location}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:text-right">
                                        <p className="font-semibold text-gray-200">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-md sticky top-28">
                            <h3 className="text-2xl font-bold text-white mb-4">Program Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-200">Target Audience</h4>
                                    <p className="text-gray-300">{program.targetAudience}</p>
                                </div>
                                 <div>
                                    <h4 className="font-semibold text-gray-200">Contact to Inquire</h4>
                                    <a href="mailto:education@greenvours.org" className="text-brand-accent hover:text-yellow-300">education@greenvours.org</a>
                                </div>
                            </div>
                             <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-brand-accent text-brand-green font-bold py-3 px-4 rounded-full hover:bg-opacity-90 transition mt-8 text-lg"
                            >
                                Register Interest
                            </button>
                        </div>
                    </div>
                </div>

                {program.galleryImages && program.galleryImages.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Program Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {program.galleryImages.map((imgUrl, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                    <img src={imgUrl} alt={`${program.title} gallery image ${index + 1}`} className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <RegisterInterestModal
                    programTitle={program.title}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EducationProgramDetailPage;