import React, { useState, useEffect } from 'react';
import { ReliefProject } from '../types';
import ImageUploader from './ImageUploader';

interface EditReliefProjectFormProps {
  item: ReliefProject;
  onSave: (item: ReliefProject) => void;
  onCancel: () => void;
  onFormChange: () => void;
}

const EditReliefProjectForm: React.FC<EditReliefProjectFormProps> = ({ item, onSave, onCancel, onFormChange }) => {
  const [formData, setFormData] = useState<ReliefProject>(item || {
    id: '',
    title: '',
    description: '',
    status: 'active',
    imageUrl: '',
    goal: 0,
    raised: 0,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Edit Relief Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <ImageUploader currentImageUrl={formData.imageUrl} onImageUrlChange={handleImageChange} />
        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Goal (UGX)</label>
          <input type="number" name="goal" value={formData.goal} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Raised (UGX)</label>
          <input type="number" name="raised" value={formData.raised} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditReliefProjectForm;
