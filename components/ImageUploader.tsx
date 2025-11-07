import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
    currentImageUrl: string;
    onImageUrlChange: (newUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImageUrl, onImageUrlChange }) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const CLOUDINARY_CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
    const CLOUDINARY_UPLOAD_PRESET = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            throw new Error("Cloudinary credentials are not set in environment variables.");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Cloudinary upload failed.");
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            throw error;
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsUploading(true);
            try {
                const downloadURL = await uploadImageToCloudinary(file);
                onImageUrlChange(downloadURL);
            } catch (error: any) {
                alert(error.message); // Provide user feedback
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear the input
                }
            }
        }
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
                    <button 
                        type="button" 
                        onClick={triggerFileInput} 
                        className="bg-gray-600 hover:bg-gray-500 text-white text-sm font-bold py-2 px-3 rounded w-full text-center"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;