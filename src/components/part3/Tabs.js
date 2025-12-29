import React, { createContext, useContext, useState } from 'react';

// ============================================
// Exercise 3.1: Compound Components Pattern
// Creates a flexible Tabs API using Context
// ============================================

// Create the Tabs Context
const TabsContext = createContext();

// Custom hook to use Tabs context
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
};

// Main Tabs component (Parent)
const Tabs = ({ children, defaultIndex = 0, onChange }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex: handleTabChange }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Tabs.List - Container for tab buttons
const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`tabs-list ${className}`} role="tablist">
      {children}
    </div>
  );
};

// Tabs.Tab - Individual tab button
const Tab = ({ children, index, disabled = false, icon }) => {
  const { activeTabIndex, setActiveTabIndex } = useTabsContext();
  const isActive = activeTabIndex === index;

  return (
    <button
      className={`tab-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      onClick={() => !disabled && setActiveTabIndex(index)}
      disabled={disabled}
    >
      {icon && <span className="tab-icon">{icon}</span>}
      <span className="tab-text">{children}</span>
      {isActive && <div className="tab-indicator" />}
    </button>
  );
};

// Tabs.Panel - Content panel for each tab
const Panel = ({ children, index, className = '' }) => {
  const { activeTabIndex } = useTabsContext();
  const isActive = activeTabIndex === index;

  if (!isActive) return null;

  return (
    <div
      className={`tab-panel ${className}`}
      role="tabpanel"
      aria-hidden={!isActive}
    >
      {children}
    </div>
  );
};

// Attach child components to Tabs
Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
