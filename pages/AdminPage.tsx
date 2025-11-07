import React, { useState, useEffect, useRef } from 'react';
import { Tour, TeamMember, Project, NewsArticle, EducationProgram, ReliefProject, HowWeHelpItem, VisionContent } from '../types';
import * as dataService from '../services/dataService';
import AdminForm from '../components/AdminForm';
import EditBlogPostForm from '../components/EditBlogPostForm';
import EditReliefProjectForm from '../components/EditReliefProjectForm';
import EditHowWeHelpItemForm from '../components/EditHowWeHelpItemForm';
import EditVisionContentForm from '../components/EditVisionContentForm';
import EditContactInfoForm from '../components/EditContactInfoForm';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from '../components/Toast';

type ContentType = 'tours' | 'team' | 'projects' | 'news' | 'educationPrograms' | 'reliefProjects' | 'howWeHelpItems' | 'visionContent' | 'contactInfo';
type ContentItem = Tour | TeamMember | Project | NewsArticle | EducationProgram | ReliefProject | HowWeHelpItem | VisionContent;

const AdminPage: React.FC = () => {
    const [tours, setTours] = useState<Tour[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [educationPrograms, setEducationPrograms] = useState<EducationProgram[]>([]);
    const [reliefProjects, setReliefProjects] = useState<ReliefProject[]>([]);
    const [howWeHelpItems, setHowWeHelpItems] = useState<HowWeHelpItem[]>([]);
    const [visionContent, setVisionContent] = useState<VisionContent[]>([]);

    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [editingType, setEditingType] = useState<ContentType | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{id: number | string, type: ContentType} | null>(null);

    const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

    const pageTopRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const unsubTours = dataService.getTours(setTours);
        const unsubTeam = dataService.getTeam(setTeam);
        const unsubProjects = dataService.getProjects(setProjects);
        const unsubNews = dataService.getNews(setNews);
        const unsubEducationPrograms = dataService.getEducationPrograms(setEducationPrograms);
        const unsubReliefProjects = dataService.getReliefProjects(setReliefProjects);
        const unsubHowWeHelpItems = dataService.getHowWeHelpItems(setHowWeHelpItems);
        const unsubVisionContent = dataService.getVisionContent(setVisionContent);

        return () => {
            unsubTours();
            unsubTeam();
            unsubProjects();
            unsubNews();
            unsubEducationPrograms();
            unsubReliefProjects();
            unsubHowWeHelpItems();
            unsubVisionContent();
        };
    }, []);

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
        setItemToDelete({ id, type });
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            try {
                await dataService.deleteItem(itemToDelete.type, itemToDelete.id as string);
                showToast('Item deleted successfully', 'success');
            } catch (error) {
                showToast('Failed to delete item', 'error');
            }
            closeConfirmModal();
        }
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setItemToDelete(null);
    };
    
    const handleSave = async (item: Omit<ContentItem, 'id'> | ContentItem) => {
        if (!editingType) return;
        
        try {
            if ('id' in item && item.id) {
                await dataService.updateItem(editingType, item.id as string, item as Omit<ContentItem, 'id'>);
            } else {
                await dataService.addItem(editingType, item);
            }
            showToast('Item saved successfully', 'success');
        } catch (error) {
            showToast('Failed to save item', 'error');
        }
        closeForm();
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setEditingItem(null);
        setEditingType(null);
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
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

            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={closeConfirmModal}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item? This action cannot be undone."
            />

            {isFormVisible && editingType ? (
                editingType === 'news' ? (
                    <EditBlogPostForm 
                        item={editingItem as NewsArticle}
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                ) : editingType === 'reliefProjects' ? (
                    <EditReliefProjectForm
                        item={editingItem as ReliefProject}
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                ) : editingType === 'howWeHelpItems' ? (
                    <EditHowWeHelpItemForm
                        item={editingItem as HowWeHelpItem}
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                ) : editingType === 'visionContent' ? (
                    <EditVisionContentForm
                        item={editingItem as VisionContent}
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                ) : editingType === 'contactInfo' ? (
                    <EditContactInfoForm
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                ) : (
                    <AdminForm 
                        item={editingItem}
                        type={editingType}
                        onSave={handleSave}
                        onCancel={closeForm}
                    />
                )
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
                    
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Education Programs</h2>
                            <button onClick={() => handleAddNew('educationPrograms')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(educationPrograms, 'educationPrograms')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Relief Projects</h2>
                            <button onClick={() => handleAddNew('reliefProjects')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(reliefProjects, 'reliefProjects')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage 'How We Help' Items</h2>
                            <button onClick={() => handleAddNew('howWeHelpItems')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add New</button>
                        </div>
                        {renderList(howWeHelpItems, 'howWeHelpItems')}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Vision Content</h2>
                            {visionContent.length > 0 && (
                                <button onClick={() => handleEdit(visionContent[0], 'visionContent')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                            )}
                        </div>
                        {visionContent.length > 0 ? (
                            <div className="bg-gray-700 p-3 rounded-md">
                                <h3 className="font-semibold text-white">{visionContent[0].title}</h3>
                                <p className="text-gray-400 text-sm">{visionContent[0].content.substring(0, 100)}...</p>
                                {visionContent[0].imageUrl && <img src={visionContent[0].imageUrl} alt="Vision" className="mt-2 w-24 h-auto rounded" />}
                            </div>
                        ) : (
                            <p className="text-gray-400">No Vision Content found. Please add one.</p>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Manage Contact Information</h2>
                            <button onClick={() => handleAddNew('contactInfo')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Contact Info</button>
                        </div>
                        <p className="text-gray-400">Edit the organization's contact details and map image.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
