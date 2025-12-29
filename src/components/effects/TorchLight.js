import React, { useState, useEffect, useCallback } from 'react';
import './TorchLight.css';

const TorchLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [intensity, setIntensity] = useState(1);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    
    // Flicker effect
    const flickerInterval = setInterval(() => {
      setIntensity(0.85 + Math.random() * 0.3);
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(flickerInterval);
    };
  }, [handleMouseMove]);

  return (
    <>
      <div 
        className="torch-light-primary"
        style={{
          left: position.x,
          top: position.y,
          opacity: intensity * 0.15,
          transform: `translate(-50%, -50%) scale(${intensity})`,
        }}
      />
      <div 
        className="torch-light-secondary"
        style={{
          left: position.x,
          top: position.y,
          opacity: intensity * 0.1,
        }}
      />
      <div 
        className="torch-light-glow"
        style={{
          left: position.x,
          top: position.y,
          opacity: intensity * 0.08,
        }}
      />
    </>
  );
};

export default TorchLight;
