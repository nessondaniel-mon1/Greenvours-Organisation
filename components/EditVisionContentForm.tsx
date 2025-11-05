import React, { useState } from 'react';
import { VisionContent } from '../types';
import ImageUploader from './ImageUploader';

interface EditVisionContentFormProps {
  item: VisionContent;
  onSave: (item: VisionContent) => void;
  onCancel: () => void;
}

const EditVisionContentForm: React.FC<EditVisionContentFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<VisionContent>(item || {
    id: '',
    title: '',
    content: '',
    imageUrl: '',
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUploadComplete = (imageUrl: string) => {
    setFormData({ ...formData, imageUrl });
    setIsUploadingImage(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Vision Content</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={10} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Image URL</label>
          {formData.imageUrl && !isUploadingImage && (
            <div className="mt-2 mb-4">
              <img src={formData.imageUrl} alt="Current Vision" className="w-48 h-auto rounded-md" />
              <button type="button" onClick={() => setIsUploadingImage(true)} className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded">Change Image</button>
            </div>
          )}
          {!formData.imageUrl && !isUploadingImage && (
            <button type="button" onClick={() => setIsUploadingImage(true)} className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-1 px-3 rounded">Upload Image</button>
          )}
          {isUploadingImage && (
            <ImageUploader
              currentImageUrl={formData.imageUrl}
              onImageUrlChange={handleImageUploadComplete}
            />
          )}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditVisionContentForm;
