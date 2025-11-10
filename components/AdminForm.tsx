import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { EducationProgram } from '../types';

interface AdminFormProps {
    item: any;
    type: string;
    onSave: (item: any) => void;
    onCancel: () => void;
    onFormChange: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ item, type, onSave, onCancel, onFormChange }) => {
    const [formData, setFormData] = useState<any>(item || {});

    const toInputDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (e) {
            return '';
        }
    };

    const fromInputDate = (dateString: string | undefined): string => {
        const fallbackDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (!dateString) return fallbackDate;
        try {
            const parts = dateString.split('-');
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const date = new Date(year, month, day);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (e) {
            return fallbackDate;
        }
    };

    useEffect(() => {
        const initialData = JSON.parse(JSON.stringify(item || {}));
        
        if (type === 'projects') {
            initialData.goals = initialData.goals || [];
            initialData.impactStats = initialData.impactStats || [];
            initialData.galleryImages = initialData.galleryImages || [];
        }
        
        if (type === 'educationPrograms') {
            initialData.schedule = initialData.schedule || [];
            initialData.galleryImages = initialData.galleryImages || [];
        }

        if (type === 'news') {
             initialData.date = toInputDate(initialData.date);
        }

        if (type !== 'educationPrograms' && !initialData.imageUrl) {
            // initialData.imageUrl = '';
        }

        if (type === 'educationPrograms' && !initialData.imageUrl) {
            initialData.imageUrl = '';
        }


        setFormData(initialData);
    }, [item, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type: inputType } = e.target;
        
        let processedValue: any = value;
        if (inputType === 'number') {
           processedValue = value ? parseFloat(value) : 0;
        }

        setFormData({ ...formData, [name]: processedValue });
        onFormChange();
    };

    const handleImageChange = (newUrl: string) => {
        setFormData({ ...formData, imageUrl: newUrl });
        onFormChange();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = { ...formData };
        if (type === 'projects' && typeof finalData.goals === 'string') {
            finalData.goals = finalData.goals.split('\n').filter(g => g.trim() !== '');
        }
        if (type === 'news' && finalData.date) {
            finalData.date = fromInputDate(finalData.date);
        }
        onSave(finalData);
    };

    const handleAddArrayItem = (fieldName: 'impactStats' | 'galleryImages' | 'schedule') => {
        const currentArray = formData[fieldName] || [];
        let newItem;
        if (fieldName === 'impactStats') newItem = { value: '', label: '' };
        else if (fieldName === 'schedule') newItem = { date: '', topic: '', location: '' };
        else newItem = '';
        
        setFormData({ ...formData, [fieldName]: [...currentArray, newItem] });
        onFormChange();
    };

    const handleRemoveArrayItem = (index: number, fieldName: 'impactStats' | 'galleryImages' | 'schedule') => {
        const currentArray = formData[fieldName] || [];
        setFormData({ ...formData, [fieldName]: currentArray.filter((_, i) => i !== index) });
        onFormChange();
    };

    const handleArrayItemChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        fieldName: 'impactStats' | 'schedule',
        subField: string
    ) => {
        const currentItems = [...(formData[fieldName] || [])];
        currentItems[index] = { ...currentItems[index], [subField]: e.target.value };
        setFormData({ ...formData, [fieldName]: currentItems });
        onFormChange();
    };

    const handleGalleryImageChange = (newUrl: string, index: number) => {
        const currentImages = [...(formData.galleryImages || [])];
        currentImages[index] = newUrl;
        setFormData({ ...formData, galleryImages: currentImages });
        onFormChange();
    };

    const renderCommonFields = (showImageUploader = true) => (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-300">Title / Name</label>
                <input type="text" name={type === 'team' || type === 'projects' || type === 'educationPrograms' ? 'name' : 'title'} value={formData.name || formData.title || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
            </div>
            {showImageUploader && <ImageUploader 
                currentImageUrl={formData.imageUrl || ''}
                onImageUrlChange={handleImageChange}
            />}
        </>
    );

    const renderFormFields = () => {
        switch (type) {
            case 'team':
                return <>
                    {renderCommonFields()}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Role</label>
                        <input type="text" name="role" value={formData.role || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Bio</label>
                        <textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows={4} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                </>;
            case 'projects':
                 return <>
                    {renderCommonFields()}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Location</label>
                        <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Short Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Long Description</label>
                        <textarea name="longDescription" value={formData.longDescription || ''} onChange={handleChange} rows={6} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Goals (one per line)</label>
                        <textarea name="goals" value={Array.isArray(formData.goals) ? formData.goals.join('\n') : formData.goals || ''} onChange={handleChange} rows={5} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" />
                    </div>
                    <div className="space-y-3 p-4 border border-gray-600 rounded-md">
                        <label className="block text-sm font-medium text-gray-300">Impact Stats</label>
                        {(formData.impactStats || []).map((stat: {value: string, label: string}, index: number) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input type="text" placeholder="Value (e.g., 30+)" value={stat.value} onChange={(e) => handleArrayItemChange(e, index, 'impactStats', 'value')} className="flex-1 bg-gray-600 border-gray-500 rounded-md shadow-sm text-white p-2" />
                                <input type="text" placeholder="Label (e.g., Local Guides Trained)" value={stat.label} onChange={(e) => handleArrayItemChange(e, index, 'impactStats', 'label')} className="flex-grow w-full bg-gray-600 border-gray-500 rounded-md shadow-sm text-white p-2" />
                                <button type="button" onClick={() => handleRemoveArrayItem(index, 'impactStats')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">X</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddArrayItem('impactStats')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded mt-2">Add Stat</button>
                    </div>
                    <div className="space-y-3 p-4 border border-gray-600 rounded-md">
                         <label className="block text-sm font-medium text-gray-300">Gallery Images</label>
                         <div className="space-y-4">
                            {(formData.galleryImages || []).map((url: string, index: number) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-md">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-grow">
                                            <ImageUploader 
                                                currentImageUrl={url}
                                                onImageUrlChange={(newUrl) => handleGalleryImageChange(newUrl, index)}
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveArrayItem(index, 'galleryImages')} 
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex-shrink-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button type="button" onClick={() => handleAddArrayItem('galleryImages')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-4">
                            Add Gallery Image
                         </button>
                    </div>
                </>;
            case 'news':
                return <>
                    {renderCommonFields()}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Excerpt</label>
                        <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Category</label>
                        <select name="category" value={formData.category || 'Conservation'} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2">
                            <option>Conservation</option>
                            <option>Travel</option>
                            <option>Relief Update</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Date</label>
                        <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                </>;
            case 'educationPrograms':
                return <>
                    {renderCommonFields()}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Short Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={3} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Long Description</label>
                        <textarea name="longDescription" value={formData.longDescription || ''} onChange={handleChange} rows={6} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Target Audience</label>
                        <input type="text" name="targetAudience" value={formData.targetAudience || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Button Text (e.g., View Schedule →)</label>
                        <input type="text" name="callToAction" value={formData.callToAction || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                     <div className="space-y-3 p-4 border border-gray-600 rounded-md">
                        <label className="block text-sm font-medium text-gray-300">Schedule</label>
                        {(formData.schedule || []).map((item: EducationProgram['schedule'][0], index: number) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                <input type="text" placeholder="Date (e.g., Nov 15, 2023)" value={item.date} onChange={(e) => handleArrayItemChange(e, index, 'schedule', 'date')} className="flex-1 bg-gray-600 border-gray-500 rounded-md shadow-sm text-white p-2" />
                                <input type="text" placeholder="Topic" value={item.topic} onChange={(e) => handleArrayItemChange(e, index, 'schedule', 'topic')} className="flex-grow w-full bg-gray-600 border-gray-500 rounded-md shadow-sm text-white p-2" />
                                <div className="flex gap-2">
                                <input type="text" placeholder="Location" value={item.location} onChange={(e) => handleArrayItemChange(e, index, 'schedule', 'location')} className="flex-grow w-full bg-gray-600 border-gray-500 rounded-md shadow-sm text-white p-2" />
                                <button type="button" onClick={() => handleRemoveArrayItem(index, 'schedule')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">X</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddArrayItem('schedule')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded mt-2">Add Schedule Item</button>
                    </div>
                    <div className="space-y-3 p-4 border border-gray-600 rounded-md">
                         <label className="block text-sm font-medium text-gray-300">Gallery Images</label>
                         <div className="space-y-4">
                            {(formData.galleryImages || []).map((url: string, index: number) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-md">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-grow">
                                            <ImageUploader 
                                                currentImageUrl={url}
                                                onImageUrlChange={(newUrl) => handleGalleryImageChange(newUrl, index)}
                                            />
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveArrayItem(index, 'galleryImages')} 
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex-shrink-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                         </div>
                         <button type="button" onClick={() => handleAddArrayItem('galleryImages')} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded mt-4">
                            Add Gallery Image
                         </button>
                    </div>
                </>;
             case 'tours':
                return <>
                    {renderCommonFields()}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Region</label>
                        <input type="text" name="region" value={formData.region || ''} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Price (UGX)</label>
                            <input type="number" name="price" value={formData.price || 0} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Duration (days)</label>
                            <input type="number" name="duration" value={formData.duration || 0} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Activity</label>
                            <select name="activity" value={formData.activity || 'Wildlife'} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2">
                                <option>Hiking</option>
                                <option>Birdwatching</option>
                                <option>Cultural</option>
                                <option>Wellness</option>
                                <option>Wildlife</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-300">Difficulty</label>
                            <select name="difficulty" value={formData.difficulty || 'Moderate'} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2">
                                <option>Easy</option>
                                <option>Moderate</option>
                                <option>Challenging</option>
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea name="description" value={formData.description || ''} onChange={handleChange} rows={4} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm text-white p-2" required />
                    </div>
                </>;
            default:
                return <p>Invalid content type</p>;
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg">
             <h2 className="text-2xl font-bold text-white mb-6 capitalize">{item ? 'Edit' : 'Add'} {type === 'news' ? 'Blog Post' : type.replace(/([A-Z])/g, ' $1')}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {renderFormFields()}
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    <button type="submit" className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default AdminForm;
