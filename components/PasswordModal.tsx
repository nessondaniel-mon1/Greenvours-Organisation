import React, { useState, FormEvent } from 'react';

interface PasswordModalProps {
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ onSubmit, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onCancel}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button 
              type="button" 
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-brand-accent hover:bg-opacity-90 text-brand-green font-bold py-2 px-4 rounded transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;