import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import TaskForm from './TaskForm';
import DeleteConfirmation from './DeleteConfirmation';
import Confetti from './Confetti';
import CompletionMessage from './CompletionMessage';
import { Task } from '../types';
import { useTaskContext } from '../contexts/TaskContext';
import { KanbanSquare, Loader2 } from 'lucide-react';

const Board: React.FC = () => {
  const { 
    tasks, 
    loading, 
    error,
    addTask, 
    updateTaskById, 
    removeTask, 
    updateTaskStatusById 
  } = useTaskContext();
  
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [initialStatus, setInitialStatus] = useState<Task['status']>('todo');
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTask, setCompletedTask] = useState<Task | null>(null);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Drop outside a droppable area
    if (!destination) return;

    // Drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the task's status has changed
    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId as Task['status'];
      await updateTaskStatusById(draggableId, newStatus);
      
      // If task is moved to 'done' column, show celebration
      if (newStatus === 'done' && source.droppableId !== 'done') {
        const completedTask = tasks.find(task => task.id === draggableId);
        if (completedTask) {
          setCompletedTask(completedTask);
          setShowConfetti(true);
          
          // Reset confetti after a delay
          setTimeout(() => {
            setShowConfetti(false);
          }, 3500);
        }
      }
    }
  };

  const handleAddTask = (status: Task['status']) => {
    setInitialStatus(status);
    setIsAddingTask(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleSubmitTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (taskToEdit) {
      await updateTaskById(taskToEdit.id, taskData);
      setTaskToEdit(null);
    } else {
      await addTask(taskData);
      setIsAddingTask(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await removeTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'inProgress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  if (loading && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg max-w-md">
          <p className="font-semibold">Error loading tasks</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-3">Please ensure the server is running by executing:</p>
          <pre className="bg-red-50 p-2 rounded mt-1 text-xs">npm run server</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full overflow-y-auto pb-4 md:overflow-visible">
          <Column
            columnId="todo"
            title="To Do"
            tasks={todoTasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              if (task) handleDeleteTask(task);
            }}
          />
          <Column
            columnId="inProgress"
            title="In Progress"
            tasks={inProgressTasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              if (task) handleDeleteTask(task);
            }}
          />
          <Column
            columnId="done"
            title="Done"
            tasks={doneTasks}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={(taskId) => {
              const task = tasks.find(t => t.id === taskId);
              if (task) handleDeleteTask(task);
            }}
          />
        </div>
      </DragDropContext>

      {isAddingTask && (
        <TaskForm
          onSubmit={handleSubmitTask}
          onCancel={() => setIsAddingTask(false)}
          initialStatus={initialStatus}
        />
      )}

      {taskToEdit && (
        <TaskForm
          task={taskToEdit}
          onSubmit={handleSubmitTask}
          onCancel={() => setTaskToEdit(null)}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmation
          taskTitle={taskToDelete.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
      
      {/* Celebration effects */}
      <Confetti active={showConfetti} />
      
      {completedTask && showConfetti && (
        <CompletionMessage 
          taskTitle={completedTask.title} 
          onClose={() => setCompletedTask(null)} 
        />
      )}
    </div>
  );
};

export default Board;