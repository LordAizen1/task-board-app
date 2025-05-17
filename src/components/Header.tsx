import React from 'react';
import { KanbanSquare, Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-900 text-white shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <KanbanSquare className="h-7 w-7 mr-3" />
            <h1 className="text-2xl font-bold tracking-tight">Task Board</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <a 
              href="https://github.com/LordAizen1/task-board-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center transition-all duration-300 text-sm font-medium"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;