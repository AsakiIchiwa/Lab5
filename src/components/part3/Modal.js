import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

// ============================================
// Exercise 3.2: The "Trapdoor" Modal (Portals)
// Uses createPortal to escape CSS stacking context
// ============================================

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
}) => {
  // Handle escape key
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [onClose, closeOnEscape]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  // Add/remove escape listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  // Get the modal root element (or fallback to body)
  const modalRoot = document.getElementById('modal-root') || document.body;

  // Use createPortal to render outside the DOM hierarchy
  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal-container modal-${size}`} role="dialog" aria-modal="true">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          {showCloseButton && (
            <button 
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Modal Content */}
        <div className="modal-content">
          {children}
        </div>
        
        {/* Decorative Elements */}
        <div className="modal-corner corner-tl">◆</div>
        <div className="modal-corner corner-tr">◆</div>
        <div className="modal-corner corner-bl">◆</div>
        <div className="modal-corner corner-br">◆</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
