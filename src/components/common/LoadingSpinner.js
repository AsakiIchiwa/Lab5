import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-spinner-rpg">
        <div className="spinner-ring ring-outer">
          <div className="ring-segment" />
          <div className="ring-segment" />
          <div className="ring-segment" />
          <div className="ring-segment" />
        </div>
        <div className="spinner-ring ring-inner">
          <div className="ring-rune">ᚠ</div>
          <div className="ring-rune">ᚢ</div>
          <div className="ring-rune">ᚦ</div>
          <div className="ring-rune">ᚨ</div>
        </div>
        <div className="spinner-core">
          <span className="core-icon">⚔️</span>
        </div>
      </div>
      <p className="loading-message">{message}</p>
      <div className="loading-dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
