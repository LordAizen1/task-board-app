import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Task } from '../types';
import { Plus, CheckCircle, Circle, Clock, PartyPopper } from 'lucide-react';

interface ColumnProps {
  columnId: string;
  title: string;
  tasks: Task[];
  onAddTask: (status: Task['status']) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  columnId,
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask
}) => {
  const getColumnStyle = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'inProgress':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'done':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const getHeaderStyle = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return 'bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white';
      case 'inProgress':
        return 'bg-gradient-to-r from-purple-600 to-purple-500 dark:from-purple-700 dark:to-purple-600 text-white';
      case 'done':
        return 'bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-500 dark:from-gray-700 dark:to-gray-600 text-white';
    }
  };

  const getColumnIcon = (columnId: string) => {
    switch (columnId) {
      case 'todo':
        return <Circle size={18} className="mr-2" />;
      case 'inProgress':
        return <Clock size={18} className="mr-2" />;
      case 'done':
        return <CheckCircle size={18} className="mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col rounded-lg border ${getColumnStyle(columnId)} shadow-md h-full md:max-h-[calc(100vh-180px)] transition-all duration-300 hover:shadow-lg mb-4 md:mb-0`}>
      <div className={`p-3 ${getHeaderStyle(columnId)} rounded-t-lg flex justify-between items-center`}>
        <div className="flex items-center">
          {getColumnIcon(columnId)}
          <h2 className="font-semibold">{title}</h2>
          {columnId === 'done' && <PartyPopper size={16} className="ml-2 text-yellow-300" />}
        </div>
        <span className="flex items-center text-sm bg-white/20 px-2 py-1 rounded-full">
          <span className="font-medium mr-1">{tasks.length}</span> 
          {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      <button
        onClick={() => onAddTask(columnId as Task['status'])}
        className="flex items-center justify-center mx-3 mt-3 p-2 rounded-md border border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-700/50 transition-all"
      >
        <Plus size={16} className="mr-1" />
        <span className="text-sm font-medium">Add Task</span>
      </button>
      
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-3 flex-1 overflow-y-auto ${
              snapshot.isDraggingOver 
                ? columnId === 'done' 
                  ? 'bg-green-100/50 dark:bg-green-900/20' 
                  : 'bg-gray-100/80 dark:bg-gray-700/30' 
                : ''
            } transition-colors min-h-[100px] max-h-full rounded-b-lg`}
            style={{
              background: snapshot.isDraggingOver 
                ? columnId === 'done'
                  ? 'repeating-linear-gradient(45deg, rgba(0,200,83,0.04), rgba(0,200,83,0.04) 10px, rgba(0,200,83,0.08) 10px, rgba(0,200,83,0.08) 20px)'
                  : 'repeating-linear-gradient(45deg, rgba(0,0,0,0.02), rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.04) 10px, rgba(0,0,0,0.04) 20px)'
                : 'transparent'
            }}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm italic">
                No tasks yet
              </div>
            )}
            {columnId === 'done' && snapshot.isDraggingOver && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <PartyPopper size={64} className="text-green-600 dark:text-green-500" />
              </div>
            )}
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;