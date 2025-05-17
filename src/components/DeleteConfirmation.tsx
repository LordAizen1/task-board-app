import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  taskTitle,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-scale">
        <div className="bg-gradient-to-r from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Delete Task</h2>
          <button 
            onClick={onCancel}
            className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4 flex-shrink-0">
              <AlertTriangle className="text-red-600 dark:text-red-400 h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Confirm deletion</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">This action cannot be undone</p>
            </div>
          </div>
          
          <p className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            Are you sure you want to delete "<span className="font-medium">{taskTitle}</span>"?
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;