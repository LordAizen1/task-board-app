import React from 'react';
import Board from './components/Board';
import Header from './components/Header';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:h-[calc(100vh-140px)] h-full border border-gray-100 dark:border-gray-700 transition-colors duration-200 overflow-hidden">
              <Board />
            </div>
          </main>
          
          <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 py-4 shadow-inner transition-colors duration-200 mt-auto">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-2 sm:mb-0">
                Task Board App &copy; {new Date().getFullYear()}
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">About</a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Help</a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors">Privacy</a>
              </div>
            </div>
          </footer>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;