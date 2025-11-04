import React, { useState, useEffect, useRef } from 'react';
import { Tour, TeamMember, Project, NewsArticle } from '../types';
import * as dataService from '../services/dataService';
import AdminForm from '../components/AdminForm';

type ContentType = 'tours' | 'team' | 'projects' | 'news';
type ContentItem = Tour | TeamMember | Project | NewsArticle;

const AdminPage: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);

    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [editingType, setEditingType] = useState<ContentType | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const pageTopRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = () => {
        setTours(dataService.getTours());
        setTeam(dataService.getTeam());
        setProjects(dataService.getProjects());
        setNews(dataService.getNews());
    };

    const handleEdit = (item: ContentItem, type: ContentType) => {
        setEditingItem(item);
        setEditingType(type);
        setIsFormVisible(true);
        pageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddNew = (type: ContentType) => {
        setEditingItem(null);
        setEditingType(type);
        setIsFormVisible(true);
        pageTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDelete = (id: number | string, type: ContentType) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            const key = dataService.DATA_KEYS[type.toUpperCase() as keyof typeof dataService.DATA_KEYS];
            dataService.deleteItem(key, id);
            loadAllData();
        }
    };
    
    const handleSave = (item: Omit<ContentItem, 'id'> | ContentItem) => {
        if (!editingType) return;
        
        const key = dataService.DATA_KEYS[editingType.toUpperCase() as keyof typeof dataService.DATA_KEYS];
        if ('id' in item) {
            dataService.updateItem(key, item as ContentItem);
        } else {
            dataService.addItem(key, item);
        }
        loadAllData();
        closeForm();
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingItem(null);
        setEditingType(null);
    };

    const renderList = (items: ContentItem[], type: ContentType) => (
        <ul className="space-y-3">
            {items.map(item => (
                <li key={item.id} className="bg-gray-700 p-3 rounded-md flex items-center justify-between">
                    <span className="font-semibold text-white">{'title' in item ? item.title : item.name}</span>
                    <div className="space-x-2">
                        <button onClick={() => handleEdit(item, type)} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded">Edit</button>
                        <button onClick={() => handleDelete(item.id, type)} className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-1 px-3 rounded">Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 ref={pageTopRef} className="text-4xl md:text-5xl font-bold text-white text-center mb-10">Admin Panel</h1>

            {isFormVisible && editingType ? (
                <AdminForm 
                    item={editingItem}
                    type={editingType}
                    onSave={handleSave}
                    onCancel={closeForm}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Tours</h2>
                            <button onClick={() => handleAddNew('tours')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(tours, 'tours')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Team</h2>
                            <button onClick={() => handleAddNew('team')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(team, 'team')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Projects</h2>
                            <button onClick={() => handleAddNew('projects')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(projects, 'projects')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Blog Posts</h2>
                            <button onClick={() => handleAddNew('news')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(news, 'news')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;