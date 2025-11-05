import React from 'react';
import { NewsArticle } from '../types';

interface BlogDetailPageProps {
  article: NewsArticle;
  onBack: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ article, onBack }) => {
  return (
    <div className="bg-gray-900 text-white">
      <div className="relative h-96">
        <img src={article.imageUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12">
          <button onClick={onBack} className="absolute top-8 left-4 sm:left-6 lg:left-8 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-75 transition">
            &larr; Back to Blog
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{article.title}</h1>
          <p className="text-xl text-gray-200 mt-2">{article.date} | {article.category}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert lg:prose-xl text-gray-300 leading-relaxed">
            <p>{article.content}</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(article.galleryImages || []).map((imgUrl, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <img src={imgUrl} alt={`${article.title} gallery image ${index + 1}`} className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
