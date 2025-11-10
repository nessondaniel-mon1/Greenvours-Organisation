import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import ImageUploader from './ImageUploader';

interface EditBlogPostFormProps {
  item: NewsArticle;
  onSave: (item: NewsArticle) => void;
  onCancel: () => void;
  onFormChange: () => void;
}

const EditBlogPostForm: React.FC<EditBlogPostFormProps> = ({ item, onSave, onCancel, onFormChange }) => {
  const [formData, setFormData] = useState<NewsArticle>(item || {
    id: '',
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    galleryImages: [],
    category: 'Conservation',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onFormChange();
  };

  const handleImageChange = (newUrl: string) => {
    setFormData({ ...formData, imageUrl: newUrl });
    onFormChange();
  };

  const handleGalleryImageChange = (newUrl: string, index: number) => {
    const currentImages = [...(formData.galleryImages || [])];
    currentImages[index] = newUrl;
    setFormData({ ...formData, galleryImages: currentImages });
    onFormChange();
  };

  const handleAddGalleryImage = () => {
    const currentImages = [...(formData.galleryImages || [])];
    setFormData({ ...formData, galleryImages: [...currentImages, ''] });
    onFormChange();
  };

  const handleRemoveGalleryImage = (index: number) => {
    const currentImages = [...(formData.galleryImages || [])];
    setFormData({ ...formData, galleryImages: currentImages.filter((_, i) => i !== index) });
    onFormChange();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <ImageUploader currentImageUrl={formData.imageUrl} onImageUrlChange={handleImageChange} />
        <div>
          <label className="block text-sm font-medium text-gray-300">Excerpt</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={10} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2">
            <option>Conservation</option>
            <option>Travel</option>
            <option>Relief Update</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Date</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div className="space-y-3 p-4 border border-gray-600 rounded-md">
          <label className="block text-sm font-medium text-gray-300">Gallery Images</label>
          <div className="space-y-4">
            {(formData.galleryImages || []).map((url, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-md">
                <div className="flex items-start space-x-4">
                  <div className="flex-grow">
                    <ImageUploader currentImageUrl={url} onImageUrlChange={(newUrl) => handleGalleryImageChange(newUrl, index)} />
                  </div>
                  <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex-shrink-0">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddGalleryImage} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-4">Add Gallery Image</button>
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPostForm;
