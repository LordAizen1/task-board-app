import React from 'react';
import { Task } from '../types';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-600';
      case 'inProgress':
        return 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600';
      case 'done':
        return 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600';
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'inProgress':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300';
      case 'done':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'inProgress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`p-4 mb-3 rounded-lg border ${
            getStatusColor(task.status)
          } ${
            snapshot.isDragging ? 'shadow-lg rotate-1' : 'shadow hover:shadow-md'
          } transition-all duration-200 transform hover:-translate-y-1`}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.9 : 1
          }}
        >
          <div className="flex items-center mb-2">
            <div 
              {...provided.dragHandleProps} 
              className="mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <GripVertical size={16} />
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadge(task.status)}`}>
              {getStatusLabel(task.status)}
            </span>
          </div>
          
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-md mb-1 pr-4">{task.title}</h3>
            <div className="flex space-x-1">
              <button 
                onClick={() => onEdit(task)}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                aria-label="Edit task"
              >
                <Pencil size={16} />
              </button>
              <button 
                onClick={() => onDelete(task.id)}
                className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 mt-1">{task.description}</p>
          )}
          
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400 border-t pt-2 border-gray-200 dark:border-gray-700">
            <span>Created: {formatDate(task.createdAt)}</span>
            {task.updatedAt && (
              <span>Updated: {formatDate(task.updatedAt)}</span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;