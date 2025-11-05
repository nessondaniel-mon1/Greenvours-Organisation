import React, { useState, FormEvent } from 'react';
import { sendNotificationEmail } from '../services/dataService';

interface RegisterInterestModalProps {
  programTitle: string;
  onClose: () => void;
}

const RegisterInterestModal: React.FC<RegisterInterestModalProps> = ({ programTitle, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
        const subject = `New Interest Registered: ${programTitle}`;
        const htmlBody = `
            <h1>New Interest Registration</h1>
            <p>A user has registered their interest for the program: <strong>${programTitle}</strong>.</p>
            <h2>User Details:</h2>
            <ul>
                <li><strong>Name:</strong> ${formData.name}</li>
                <li><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></li>
            </ul>
            <h2>Message:</h2>
            <p style="white-space: pre-wrap;">${formData.message || 'No message provided.'}</p>
        `;

        await sendNotificationEmail({ subject, htmlBody });
        setStatus('success');
    } catch (error) {
        console.error("Failed to send interest registration notification:", error);
        alert('There was an error submitting your request. Please try again.');
        setStatus('idle');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        {status === 'success' ? (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-accent mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-6">Your interest in "{programTitle}" has been registered. We'll be in touch with more details soon.</p>
            <button
              onClick={onClose}
              className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-light-green transition text-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Register Interest</h2>
            <p className="text-brand-accent font-semibold mb-6">For: {programTitle}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email Address</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-200">Message (Optional)</label>
                <textarea id="message" rows={3} value={formData.message} onChange={handleChange} className="mt-1 p-3 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-brand-accent focus:ring-brand-accent"></textarea>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterInterestModal;