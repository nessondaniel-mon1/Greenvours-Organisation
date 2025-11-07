import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string; // Add a new prop for the confirm button text
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, confirmButtonText = 'Confirm' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-4 text-center">{title}</h2>
        <p className="text-gray-300 text-center mb-6">{message}</p>
        <div className="flex justify-center space-x-4 mt-8">
          <button 
            type="button" 
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
