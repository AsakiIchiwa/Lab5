import React, { useState, useEffect, useCallback } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
    
    // Add trail particle
    const newTrail = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    
    setTrails(prev => [...prev.slice(-15), newTrail]);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.slice(-10));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index / trails.length) * 0.6,
            transform: `scale(${0.3 + (index / trails.length) * 0.7})`,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`custom-cursor ${isClicking ? 'clicking' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="cursor-core" />
        <div className="cursor-ring" />
        <div className="cursor-sparkles">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="cursor-sparkle" style={{ '--i': i }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
