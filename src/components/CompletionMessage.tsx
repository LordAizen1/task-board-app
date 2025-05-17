import React, { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';

interface CompletionMessageProps {
  taskTitle: string;
  onClose: () => void;
}

const CompletionMessage: React.FC<CompletionMessageProps> = ({ taskTitle, onClose }) => {
  const [visible, setVisible] = useState(true);
  
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      const dismissTimer = setTimeout(onClose, 500); // give time for exit animation
      return () => clearTimeout(dismissTimer);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  // Choose a random congratulatory message
  const messages = [
    "Great job! 🎉",
    "Task complete! 🚀",
    "Awesome work! 💪",
    "You did it! 🌟",
    "Success! 🏆",
    "Achievement unlocked! 🎯"
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  return (
    <div className={`fixed bottom-8 right-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-w-md transition-all duration-500 transform ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    } animate-celebration z-50`}>
      <div className="flex items-start">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mr-4 flex-shrink-0">
          <Trophy className="text-yellow-600 dark:text-yellow-400 h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center">
            {randomMessage}
            <Star className="h-4 w-4 ml-1 text-yellow-500 dark:text-yellow-400 fill-current" />
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
            You've completed: <span className="font-medium">"{taskTitle}"</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionMessage; 