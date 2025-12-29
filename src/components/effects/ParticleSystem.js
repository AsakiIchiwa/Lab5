import React, { useState, useEffect, useMemo } from 'react';
import './ParticleSystem.css';

const ParticleSystem = () => {
  const [particles, setParticles] = useState([]);

  // Generate initial particles
  const generateParticles = useMemo(() => {
    const types = ['ember', 'sparkle', 'magic', 'dust', 'orb'];
    const newParticles = [];
    
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 8,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 8,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }
    
    return newParticles;
  }, []);

  useEffect(() => {
    setParticles(generateParticles);
  }, [generateParticles]);

  return (
    <div className="particle-system">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle-${particle.type}`}
          style={{
            '--x': `${particle.x}%`,
            '--y': `${particle.y}%`,
            '--size': `${particle.size}px`,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
            '--opacity': particle.opacity,
          }}
        />
      ))}
      
      {/* Floating runes */}
      <div className="floating-runes">
        {['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'].map((rune, index) => (
          <span 
            key={index} 
            className="rune"
            style={{
              '--index': index,
              '--total': 8,
            }}
          >
            {rune}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ParticleSystem;
