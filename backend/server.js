import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

console.log('Initializing server...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

console.log(`Server directory: ${__dirname}`);
console.log(`Data file path: ${join(__dirname, 'tasks.json')}`);

// Configure CORS
app.use(cors());

// Configure security headers
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  );
  next();
});

app.use(express.json());

// Data file path
const dataFilePath = join(__dirname, 'tasks.json');

// Initialize tasks data
let tasks = [];

// Load tasks from file if it exists
try {
  if (fs.existsSync(dataFilePath)) {
    console.log('Loading tasks from existing file...');
    const data = fs.readFileSync(dataFilePath, 'utf8');
    tasks = JSON.parse(data);
    console.log(`Loaded ${tasks.length} tasks`);
  } else {
    console.log('No tasks file found, creating sample data...');
    // Initial sample data
    tasks = [
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
    
    // Save initial data
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
    console.log('Sample data created and saved');
  }
} catch (error) {
  console.error('Error loading tasks:', error);
}

// Helper to save tasks to file
const saveTasks = () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/api/tasks', (req, res) => {
  console.log('GET /api/tasks - Returning all tasks');
  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status } = req.body;
  console.log(`POST /api/tasks - Creating new task: "${title}"`);
  
  if (!title) {
    console.log('POST /api/tasks - Error: Title is required');
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTask = {
    id: uuidv4(),
    title,
    description: description || '',
    status: status || 'todo',
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  saveTasks();
  
  console.log(`Task created with ID: ${newTask.id}`);
  res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  console.log(`PUT /api/tasks/${id} - Updating task`);
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    console.log(`PUT /api/tasks/${id} - Error: Task not found`);
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updatedAt: new Date().toISOString()
  };
  
  saveTasks();
  
  console.log(`Task ${id} updated successfully`);
  res.json(tasks[taskIndex]);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/tasks/${id} - Deleting task`);
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    console.log(`DELETE /api/tasks/${id} - Error: Task not found`);
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  
  saveTasks();
  
  console.log(`Task ${id} deleted successfully`);
  res.json(deletedTask);
});

// Update task status (for drag and drop)
app.patch('/api/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log(`PATCH /api/tasks/${id}/status - Updating status to ${status}`);
  
  if (!status) {
    console.log(`PATCH /api/tasks/${id}/status - Error: Status is required`);
    return res.status(400).json({ error: 'Status is required' });
  }
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex === -1) {
    console.log(`PATCH /api/tasks/${id}/status - Error: Task not found`);
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks[taskIndex].status = status;
  tasks[taskIndex].updatedAt = new Date().toISOString();
  
  saveTasks();
  
  console.log(`Task ${id} status updated to ${status}`);
  res.json(tasks[taskIndex]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});