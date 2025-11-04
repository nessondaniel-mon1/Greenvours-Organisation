import React from 'react';
import { NewsArticle } from '../types';

const blogPosts: NewsArticle[] = [
    { id: 1, title: 'Major Reforestation Drive in Budongo Forest', excerpt: 'We planted over 10,000 native saplings this past quarter, thanks to your support. This effort is crucial for protecting chimpanzee habitats.', imageUrl: 'https://picsum.photos/seed/ugnews1/800/500', category: 'Conservation', date: 'October 28, 2023' },
    { id: 2, title: 'Urgent Flood Relief in Kasese District', excerpt: 'Our team is on the ground providing essential supplies to families affected by the recent floods from River Nyamwamba.', imageUrl: 'https://picsum.photos/seed/ugnews2/800/500', category: 'Relief Update', date: 'October 25, 2023' },
    { id: 3, title: 'Discovering the Beauty of Sipi Falls', excerpt: 'A look back at our latest eco-tour, balancing adventure with responsible travel. The breathtaking landscapes reminded us all what we are fighting to protect.', imageUrl: 'https://picsum.photos/seed/ugnews3/800/500', category: 'Travel', date: 'October 22, 2023' },
    { id: 4, title: 'The Importance of Ranger Patrols', excerpt: 'Learn how our funding supports the brave rangers of Uganda Wildlife Authority who protect our national parks from poachers and illegal activity.', imageUrl: 'https://picsum.photos/seed/ugblog4/800/500', category: 'Conservation', date: 'October 15, 2023' },
    { id: 5, title: 'A Day in the Life of a Kampala Volunteer', excerpt: 'An interview with one of our dedicated volunteers, sharing their experience sorting supplies and coordinating logistics for our relief efforts.', imageUrl: 'https://picsum.photos/seed/ugblog5/800/500', category: 'Relief Update', date: 'October 10, 2023' },
];

const BlogPage: React.FC = () => {
    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Blog & News</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Stories from the field, conservation breakthroughs, and updates on our relief efforts.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex flex-col">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity"/>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm font-semibold text-brand-accent">{post.category.toUpperCase()}</p>
                                <h2 className="text-xl font-bold text-white mt-2 mb-3 flex-grow">{post.title}</h2>
                                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                                <div className="mt-auto border-t border-gray-700 pt-4 flex justify-between items-center text-xs text-gray-400">
                                    <span>{post.date}</span>
                                    <button className="font-semibold text-brand-accent hover:text-yellow-300 transition">Read More &rarr;</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;