import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:3001/api';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<Task> => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, status: Task['status']): Promise<Task> => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};