import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types';
import * as api from '../services/api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchAllTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTaskById: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  updateTaskStatusById: (id: string, status: Task['status']) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.fetchTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      const newTask = await api.createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskById = async (id: string, taskUpdate: Partial<Task>) => {
    try {
      setLoading(true);
      const updatedTask = await api.updateTask(id, taskUpdate);
      setTasks(prevTasks => 
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: string) => {
    try {
      setLoading(true);
      await api.deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatusById = async (id: string, status: Task['status']) => {
    try {
      setLoading(true);
      const updatedTask = await api.updateTaskStatus(id, status);
      setTasks(prevTasks => 
        prevTasks.map(task => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchAllTasks,
        addTask,
        updateTaskById,
        removeTask,
        updateTaskStatusById
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};