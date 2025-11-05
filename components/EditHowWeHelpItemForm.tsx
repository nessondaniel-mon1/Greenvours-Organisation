import React, { useState } from 'react';
import { HowWeHelpItem } from '../types';

interface EditHowWeHelpItemFormProps {
  item: HowWeHelpItem;
  onSave: (item: HowWeHelpItem) => void;
  onCancel: () => void;
}

const EditHowWeHelpItemForm: React.FC<EditHowWeHelpItemFormProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<HowWeHelpItem>(item || {
    id: '',
    title: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Edit 'How We Help' Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button type="submit" className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditHowWeHelpItemForm;
