import React, { useState, useEffect } from 'react';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { COLLECTIONS } from '../services/dataService';
import ImageUploader from './ImageUploader';
import { ContactInfo } from '../types';

interface EditContactInfoFormProps {
  onFormChange: () => void;
  onCancel: () => void;
  onSave: (contactInfo: ContactInfo) => void;
}

const EditContactInfoForm: React.FC<EditContactInfoFormProps> = ({ onFormChange, onCancel, onSave }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, COLLECTIONS.CONTACT_INFO, 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactInfo(docSnap.data() as ContactInfo);
        } else {
          // Initialize with empty data if no document exists
          setContactInfo({
            bookingEmail: '',
            generalEmail: '',
            address: '',
            imageUrl: '',
          });
        }
      } catch (err: any) {
        console.error("Error fetching contact info:", err);
        setError("Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setContactInfo(prev => ({
      ...prev!,
      [id]: value,
    }));
    onFormChange();
  };

  const handleImageUpload = (url: string) => {
    setContactInfo(prev => ({
      ...prev!,
      imageUrl: url,
    }));
    onFormChange();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const docRef = doc(db, COLLECTIONS.CONTACT_INFO, 'main');
      await setDoc(docRef, contactInfo);
      setSuccess("Contact information updated successfully!");
      onSave(contactInfo);
    } catch (err: any) {
      console.error("Error updating contact info:", err);
      setError("Failed to update contact information.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading contact information...</div>;
  }

  if (error && !contactInfo) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">Edit Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bookingEmail" className="block text-sm font-medium text-gray-300">Booking Email</label>
          <input
            type="email"
            id="bookingEmail"
            value={contactInfo?.bookingEmail || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"
          />
        </div>
        <div>
          <label htmlFor="generalEmail" className="block text-sm font-medium text-gray-300">General Email</label>
          <input
            type="email"
            id="generalEmail"
            value={contactInfo?.generalEmail || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
          <textarea
            id="address"
            rows={3}
            value={contactInfo?.address || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Map Image</label>
          <ImageUploader
            currentImageUrl={contactInfo?.imageUrl}
            onImageUrlChange={handleImageUpload}
            folder="contact"
          />
          {contactInfo?.imageUrl && (
            <div className="mt-2">
              <img src={contactInfo.imageUrl} alt="Current Map" className="max-w-full h-auto rounded-md" />
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : 'Save Contact Info'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContactInfoForm;
