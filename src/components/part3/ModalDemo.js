import React, { useState } from 'react';
import Modal from './Modal';
import './ModalDemo.css';

// ============================================
// Exercise 3.2: Portal Modal Demo
// Demonstrates event bubbling through Portals
// ============================================

const ModalDemo = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [parentClickCount, setParentClickCount] = useState(0);

  // Event bubbling demonstration
  const handleParentClick = () => {
    setParentClickCount(prev => prev + 1);
    console.log('Parent div clicked! (Event bubbling from Portal)');
  };

  return (
    <div className="page-container modal-demo-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🚪</span>
          Portal Modal
        </h1>
        <p className="page-subtitle">
          Exercise 3.2: Use createPortal to escape CSS stacking context
        </p>
      </header>

      <div className="modal-demo-content">
        {/* The Problem */}
        <section className="problem-section rpg-panel">
          <h2 className="section-title">The Problem</h2>
          <p className="section-description">
            When a modal is inside a parent with <code>overflow: hidden</code>, it gets clipped.
            Portals solve this by rendering the modal outside the DOM hierarchy!
          </p>
          
          <div className="clipped-container">
            <div className="clipped-label">overflow: hidden</div>
            <p>This container clips its children. Without Portals, a modal here would be cut off!</p>
            <div className="clipped-demo-box">
              <span>I'm clipped! 😢</span>
            </div>
          </div>
        </section>

        {/* Modal Triggers */}
        <section className="triggers-section rpg-panel">
          <h2 className="section-title">Open Portals</h2>
          
          <div className="triggers-grid">
            <div className="trigger-card">
              <span className="trigger-icon">📜</span>
              <h3>Basic Modal</h3>
              <p>Simple modal with title and content</p>
              <button 
                className="rpg-button"
                onClick={() => setBasicModalOpen(true)}
              >
                Open Basic
              </button>
            </div>
            
            <div className="trigger-card">
              <span className="trigger-icon">⚔️</span>
              <h3>Quest Modal</h3>
              <p>Detailed quest information</p>
              <button 
                className="rpg-button rpg-button-magic"
                onClick={() => setQuestModalOpen(true)}
              >
                View Quest
              </button>
            </div>
            
            <div className="trigger-card">
              <span className="trigger-icon">🛒</span>
              <h3>Shop Modal</h3>
              <p>Large modal with items</p>
              <button 
                className="rpg-button"
                onClick={() => setShopModalOpen(true)}
              >
                Open Shop
              </button>
            </div>
          </div>
        </section>

        {/* Event Bubbling Demo */}
        <section 
          className="bubbling-section rpg-panel"
          onClick={handleParentClick}
        >
          <h2 className="section-title">Event Bubbling Challenge</h2>
          <p className="section-description">
            Even though the Portal renders outside this div in the DOM, React's synthetic events 
            still bubble up through the React component tree!
          </p>
          
          <div className="bubbling-demo">
            <div className="click-counter">
              <span className="counter-label">Parent Click Count:</span>
              <span className="counter-value">{parentClickCount}</span>
            </div>
            <p className="bubbling-hint">
              👆 Click the button inside the modal - the parent's onClick will still fire!
            </p>
            <button 
              className="rpg-button rpg-button-magic"
              onClick={(e) => {
                e.stopPropagation(); // This click won't bubble
                setQuestModalOpen(true);
              }}
            >
              Open Modal (stopPropagation)
            </button>
          </div>
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// Modal.js using createPortal
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  // Render into a DOM node outside the parent hierarchy
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Escapes parent's CSS!
  );
};

// Event Bubbling Demo
// Even though Portal renders elsewhere in DOM,
// React events bubble through the component tree!
<div onClick={() => console.log('Parent clicked!')}>
  <Modal isOpen={true}>
    <button onClick={() => console.log('Button clicked!')}>
      Click Me
    </button>
    {/* Clicking this WILL trigger parent's onClick! */}
  </Modal>
</div>`}
          </pre>
        </section>
      </div>

      {/* Modals (rendered via Portal) */}
      <Modal 
        isOpen={basicModalOpen} 
        onClose={() => setBasicModalOpen(false)}
        title="⚔️ Basic Modal"
        size="small"
      >
        <div className="modal-demo-content-inner">
          <p>This modal is rendered into <code>#modal-root</code> using <code>createPortal</code>.</p>
          <p>It escapes any parent's CSS clipping or overflow restrictions!</p>
          <div className="modal-actions">
            <button 
              className="rpg-button"
              onClick={() => setBasicModalOpen(false)}
            >
              Close Portal
            </button>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={questModalOpen} 
        onClose={() => setQuestModalOpen(false)}
        title="🗡️ Quest: Dragon's Lair"
        size="medium"
      >
        <QuestContent onClose={() => setQuestModalOpen(false)} />
      </Modal>

      <Modal 
        isOpen={shopModalOpen} 
        onClose={() => setShopModalOpen(false)}
        title="🏪 Adventurer's Shop"
        size="large"
      >
        <ShopContent onClose={() => setShopModalOpen(false)} />
      </Modal>
    </div>
  );
};

// Quest Content Component
const QuestContent = ({ onClose }) => (
  <div className="quest-modal-content">
    <div className="quest-banner">
      <span className="quest-banner-icon">🐉</span>
    </div>
    
    <div className="quest-details">
      <div className="quest-meta">
        <span className="quest-difficulty epic">Epic</span>
        <span className="quest-reward">💰 5,000 Gold</span>
        <span className="quest-xp">✨ 2,500 XP</span>
      </div>
      
      <p className="quest-description">
        The ancient dragon Volkaroth has awakened from his centuries-long slumber. 
        Venture into the volcanic depths and defeat this legendary beast before 
        he razes the kingdom to ashes!
      </p>
      
      <div className="quest-objectives">
        <h4>Objectives:</h4>
        <ul>
          <li>☐ Navigate through the Volcanic Caves</li>
          <li>☐ Defeat the Fire Elementals (0/5)</li>
          <li>☐ Find the Dragon's Chamber</li>
          <li>☐ Slay Volkaroth the Destroyer</li>
        </ul>
      </div>
      
      <div className="quest-requirements">
        <h4>Requirements:</h4>
        <span className="requirement">Level 50+</span>
        <span className="requirement">Fire Resistance Gear</span>
        <span className="requirement">Party of 4+</span>
      </div>
    </div>
    
    <div className="modal-actions">
      <button className="rpg-button" onClick={onClose}>
        Decline
      </button>
      <button className="rpg-button rpg-button-magic" onClick={onClose}>
        ⚔️ Accept Quest
      </button>
    </div>
  </div>
);

// Shop Content Component
const ShopContent = ({ onClose }) => {
  const items = [
    { name: 'Health Potion', price: 50, icon: '🧪', stock: 99 },
    { name: 'Mana Potion', price: 75, icon: '💎', stock: 50 },
    { name: 'Fire Sword', price: 500, icon: '🗡️', stock: 3 },
    { name: 'Ice Shield', price: 450, icon: '🛡️', stock: 5 },
    { name: 'Magic Staff', price: 650, icon: '🪄', stock: 2 },
    { name: 'Dragon Armor', price: 2000, icon: '🐲', stock: 1 },
  ];

  return (
    <div className="shop-modal-content">
      <div className="shop-items-grid">
        {items.map((item, index) => (
          <div key={index} className="shop-modal-item">
            <span className="item-icon">{item.icon}</span>
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-stock">Stock: {item.stock}</span>
            </div>
            <div className="item-purchase">
              <span className="item-price">💰 {item.price}</span>
              <button className="rpg-button buy-btn">Buy</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="modal-actions">
        <span className="player-gold">Your Gold: 💰 3,500</span>
        <button className="rpg-button" onClick={onClose}>
          Close Shop
        </button>
      </div>
    </div>
  );
};

export default ModalDemo;
