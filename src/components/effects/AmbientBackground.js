import React from 'react';
import './AmbientBackground.css';

const AmbientBackground = () => {
  return (
    <div className="ambient-background">
      {/* Gradient overlays */}
      <div className="gradient-overlay gradient-1" />
      <div className="gradient-overlay gradient-2" />
      <div className="gradient-overlay gradient-3" />
      
      {/* Animated noise texture */}
      <div className="noise-overlay" />
      
      {/* Vignette effect */}
      <div className="vignette-overlay" />
      
      {/* Grid pattern */}
      <div className="grid-pattern" />
      
      {/* Fog layers */}
      <div className="fog-layer fog-1" />
      <div className="fog-layer fog-2" />
    </div>
  );
};

export default AmbientBackground;
