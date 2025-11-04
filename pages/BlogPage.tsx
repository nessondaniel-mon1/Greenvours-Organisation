
import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { getNews } from '../services/dataService';

const BlogPage: React.FC = () => {
    const [blogPosts, setBlogPosts] = useState<NewsArticle[]>([]);

    useEffect(() => {
        setBlogPosts(getNews());
    }, []);

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