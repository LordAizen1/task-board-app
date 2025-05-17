import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (active) {
      createConfetti();
      
      // Clean up confetti after animation completes
      const timer = setTimeout(() => {
        setConfetti([]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [active]);
  
  const createConfetti = () => {
    const pieces: JSX.Element[] = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#7bc950', '#6a60a9', '#ff9ff3'];
    
    for (let i = 0; i < 100; i++) {
      const size = Math.floor(Math.random() * 12) + 5; // 5-16px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100; // 0-100%
      const animationDuration = (Math.random() * 2) + 2; // 2-4s
      const rotateDirection = Math.random() > 0.5 ? '360deg' : '-360deg';
      const shape = Math.random() > 0.5 ? '50%' : '0%'; // circle or square
      
      const piece = (
        <div
          key={i}
          className="confetti"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: shape,
            animationDuration: `${animationDuration}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      );
      
      pieces.push(piece);
    }
    
    setConfetti(pieces);
  };
  
  if (!active || confetti.length === 0) {
    return null;
  }
  
  return <div className="confetti-container">{confetti}</div>;
};

export default Confetti; 