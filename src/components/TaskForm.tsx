import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { X } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  initialStatus?: Task['status'];
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  initialStatus = 'todo',
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || initialStatus);
  const [titleError, setTitleError] = useState('');

  const isEditing = !!task;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status
    });
  };

  useEffect(() => {
    // Reset error when title changes
    if (title.trim()) {
      setTitleError('');
    }
  }, [title]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-fade-in-up">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
          <button 
            onClick={onCancel}
            className="text-white/80 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={`w-full px-3 py-2 bg-white dark:bg-gray-700 border ${
                titleError ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 transition-colors`}
              autoFocus
            />
            {titleError && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{titleError}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 transition-colors min-h-[100px]"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStatus('todo')}
                className={`py-2 px-3 rounded-md text-center text-sm font-medium transition-colors ${
                  status === 'todo'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-2 border-blue-400 dark:border-blue-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                To Do
              </button>
              <button
                type="button"
                onClick={() => setStatus('inProgress')}
                className={`py-2 px-3 rounded-md text-center text-sm font-medium transition-colors ${
                  status === 'inProgress'
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border-2 border-purple-400 dark:border-purple-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => setStatus('done')}
                className={`py-2 px-3 rounded-md text-center text-sm font-medium transition-colors ${
                  status === 'done'
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-2 border-green-400 dark:border-green-600'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Done
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
            >
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;