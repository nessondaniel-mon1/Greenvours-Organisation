import React, { useState } from 'react';

// A predefined list of high-quality stock images for the gallery
const GALLERY_IMAGES = [
    'https://picsum.photos/seed/gallery1/600/400',
    'https://picsum.photos/seed/gallery2/600/400',
    'https://picsum.photos/seed/gallery3/600/400',
    'https://picsum.photos/seed/gallery4/600/400',
    'https://picsum.photos/seed/gallery5/600/400',
    'https://picsum.photos/seed/gallery6/600/400',
    'https://picsum.photos/seed/gallery7/600/400',
    'https://picsum.photos/seed/gallery8/600/400',
];

interface ImageUploaderProps {
    currentImageUrl: string;
    onImageUrlChange: (newUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImageUrl, onImageUrlChange }) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUrlChange(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGallerySelect = (url: string) => {
        onImageUrlChange(url);
        setIsGalleryOpen(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300">Image</label>
            <div className="mt-2 flex items-center space-x-4">
                <div className="w-32 h-20 bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                    {currentImageUrl && <img src={currentImageUrl} alt="Preview" className="w-full h-full object-cover" />}
                </div>
                <div className="space-y-2">
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <button type="button" onClick={triggerFileInput} className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold py-2 px-3 rounded w-full text-center">
                        Upload from Computer
                    </button>
                    <button type="button" onClick={() => setIsGalleryOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2 px-3 rounded w-full text-center">
                        Choose from Gallery
                    </button>
                </div>
            </div>

            {isGalleryOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsGalleryOpen(false)}>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-white mb-4">Select an Image</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
                            {GALLERY_IMAGES.map(url => (
                                <div key={url} className="cursor-pointer group" onClick={() => handleGallerySelect(url)}>
                                    <img src={url} alt="Gallery image" className="w-full h-32 object-cover rounded-md group-hover:ring-4 ring-brand-accent transition" />
                                </div>
                            ))}
                        </div>
                         <div className="text-right mt-6">
                            <button type="button" onClick={() => setIsGalleryOpen(false)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;