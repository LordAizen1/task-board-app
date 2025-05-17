import axios from 'axios';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Check if we're in GitHub Pages environment
const isGitHubPages = window.location.hostname === 'lordaizen1.github.io';

// Mock data for GitHub Pages
let mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Complete project setup',
    description: 'Set up the React and Node.js environment',
    status: 'todo',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Design UI components',
    description: 'Create wireframes and design system',
    status: 'inProgress',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Write documentation',
    description: 'Create README and API documentation',
    status: 'done',
    createdAt: new Date().toISOString()
  }
];

// API URL for local development
const API_URL = 'http://localhost:3001/api';

export const fetchTasks = async (): Promise<Task[]> => {
  if (isGitHubPages) {
    return mockTasks;
  }

  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  if (isGitHubPages) {
    const newTask: Task = {
      id: uuidv4(),
      ...task,
      createdAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return newTask;
  }

  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  if (isGitHubPages) {
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    mockTasks[index] = {
      ...mockTasks[index],
      ...task,
      updatedAt: new Date().toISOString()
    };
    return mockTasks[index];
  }

  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<Task> => {
  if (isGitHubPages) {
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const deletedTask = mockTasks[index];
    mockTasks = mockTasks.filter(t => t.id !== id);
    return deletedTask;
  }

  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> => {
  if (isGitHubPages) {
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    mockTasks[index] = {
      ...mockTasks[index],
      status,
      updatedAt: new Date().toISOString()
    };
    return mockTasks[index];
  }

  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};