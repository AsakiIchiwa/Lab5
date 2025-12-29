import React, { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react';
import './Dashboard.css';

// ============================================
// Exercise 2.1 & 2.2: Performance Engineering
// useMemo, useCallback, and React.memo
// ============================================

// Generate mock data (10,000 items for the laggy list)
const generateItems = (count) => {
  const names = ['Dragon', 'Phoenix', 'Griffin', 'Unicorn', 'Basilisk', 'Hydra', 'Chimera', 'Kraken'];
  const types = ['Fire', 'Ice', 'Lightning', 'Shadow', 'Light', 'Earth', 'Wind', 'Water'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${types[i % types.length]} ${names[i % names.length]} #${i + 1}`,
    level: Math.floor(Math.random() * 100) + 1,
    power: Math.floor(Math.random() * 1000) + 100,
    type: types[i % types.length],
    icon: ['🐉', '🦅', '🦁', '🦄', '🐍', '🐙', '🦇', '🐺'][i % 8],
  }));
};

// Memoized ListItem component - Exercise 2.1 & 2.2
const ListItem = memo(({ item, onDelete, isSelected, onSelect }) => {
  // Track renders for demonstration
  const renderCount = useRef(0);
  renderCount.current += 1;
  
  // Uncomment to see when this re-renders:
  // console.log(`ListItem ${item.id} rendered (${renderCount.current} times)`);

  return (
    <div 
      className={`list-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(item.id)}
    >
      <span className="item-icon">{item.icon}</span>
      <div className="item-content">
        <span className="item-name">{item.name}</span>
        <div className="item-stats">
          <span className="stat">Lv. {item.level}</span>
          <span className="stat">⚡ {item.power}</span>
          <span className={`type type-${item.type.toLowerCase()}`}>{item.type}</span>
        </div>
      </div>
      <div className="item-actions">
        <span className="render-count" title="Render count">
          🔄 {renderCount.current}
        </span>
        <button 
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
});

ListItem.displayName = 'ListItem';

// Main Dashboard Component
const Dashboard = () => {
  const [items, setItems] = useState(() => generateItems(1000));
  const [theme, setTheme] = useState('dark');
  const [sortBy, setSortBy] = useState('id');
  const [filterType, setFilterType] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [optimizationEnabled, setOptimizationEnabled] = useState(true);
  
  // Profiling state
  const [lastRenderTime, setLastRenderTime] = useState(0);
  const renderStartTime = useRef(Date.now());
  
  useEffect(() => {
    renderStartTime.current = Date.now();
  });
  
  useEffect(() => {
    setLastRenderTime(Date.now() - renderStartTime.current);
  });

  // Exercise 2.1: useMemo for expensive sorting/filtering
  const processedItems = useMemo(() => {
    console.log('Processing items... (useMemo running)');
    const startTime = performance.now();
    
    let result = [...items];
    
    // Filter
    if (filterType !== 'all') {
      result = result.filter(item => item.type === filterType);
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'level':
          return b.level - a.level;
        case 'power':
          return b.power - a.power;
        default:
          return a.id - b.id;
      }
    });
    
    const endTime = performance.now();
    console.log(`Processing took ${(endTime - startTime).toFixed(2)}ms`);
    
    return result;
  }, [items, sortBy, filterType]); // Only recalculate when these change, NOT theme!

  // Exercise 2.2: useCallback for stable function references
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleSelect = useCallback((id) => {
    setSelectedId(prev => prev === id ? null : id);
  }, []);

  // Non-optimized versions for comparison
  const handleDeleteUnoptimized = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectUnoptimized = (id) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const resetItems = () => {
    setItems(generateItems(1000));
    setSelectedId(null);
  };

  return (
    <div className={`page-container dashboard-page theme-${theme}`}>
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">📊</span>
          The Laggy List
        </h1>
        <p className="page-subtitle">
          Exercise 2.1 & 2.2: Performance optimization with useMemo, useCallback & React.memo
        </p>
      </header>

      <div className="dashboard-content">
        {/* Control Panel */}
        <section className="dashboard-controls rpg-panel">
          <div className="controls-row">
            <div className="control-group">
              <label className="control-label">Theme:</label>
              <button className="rpg-button" onClick={toggleTheme}>
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>

            <div className="control-group">
              <label className="control-label">Sort By:</label>
              <select 
                className="rpg-input"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="name">Name</option>
                <option value="level">Level</option>
                <option value="power">Power</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Filter Type:</label>
              <select 
                className="rpg-input"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Fire">🔥 Fire</option>
                <option value="Ice">❄️ Ice</option>
                <option value="Lightning">⚡ Lightning</option>
                <option value="Shadow">🌑 Shadow</option>
                <option value="Light">✨ Light</option>
                <option value="Earth">🌍 Earth</option>
                <option value="Wind">💨 Wind</option>
                <option value="Water">💧 Water</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Optimization:</label>
              <button 
                className={`rpg-button ${optimizationEnabled ? 'rpg-button-magic' : 'rpg-button-danger'}`}
                onClick={() => setOptimizationEnabled(!optimizationEnabled)}
              >
                {optimizationEnabled ? '✅ Enabled' : '❌ Disabled'}
              </button>
            </div>

            <button className="rpg-button" onClick={resetItems}>
              🔄 Reset List
            </button>
          </div>

          {/* Performance Stats */}
          <div className="perf-stats">
            <div className="stat-item">
              <span className="stat-label">Items:</span>
              <span className="stat-value">{processedItems.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Render:</span>
              <span className={`stat-value ${lastRenderTime > 50 ? 'slow' : 'fast'}`}>
                {lastRenderTime}ms
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Theme Changes:</span>
              <span className="stat-value info">Won't re-sort!</span>
            </div>
          </div>
        </section>

        {/* Optimization Info */}
        <section className="info-panel rpg-panel">
          <h3 className="section-title">How It Works</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">📝</span>
              <div>
                <strong>useMemo</strong>
                <p>Sorting only recalculates when items, sortBy, or filterType changes - NOT on theme toggle!</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🔗</span>
              <div>
                <strong>useCallback</strong>
                <p>handleDelete and handleSelect have stable references, preventing child re-renders.</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🛡️</span>
              <div>
                <strong>React.memo</strong>
                <p>ListItem only re-renders when its props actually change. Check the render count!</p>
              </div>
            </div>
          </div>
        </section>

        {/* The List */}
        <section className="list-section rpg-panel">
          <h2 className="section-title">Creature List ({processedItems.length} creatures)</h2>
          <div className="list-container">
            {processedItems.slice(0, 100).map(item => (
              optimizationEnabled ? (
                <ListItem
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onSelect={handleSelect}
                  isSelected={selectedId === item.id}
                />
              ) : (
                <ListItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteUnoptimized}
                  onSelect={handleSelectUnoptimized}
                  isSelected={selectedId === item.id}
                />
              )
            ))}
          </div>
          {processedItems.length > 100 && (
            <p className="list-note">Showing first 100 items for performance...</p>
          )}
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// Exercise 2.1: useMemo for expensive calculations
const processedItems = useMemo(() => {
  let result = [...items];
  if (filterType !== 'all') {
    result = result.filter(item => item.type === filterType);
  }
  result.sort((a, b) => { /* sort logic */ });
  return result;
}, [items, sortBy, filterType]); // NOT theme!

// Exercise 2.2: useCallback for stable references
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // Empty deps = stable reference

// React.memo prevents re-renders when props don't change
const ListItem = memo(({ item, onDelete, isSelected }) => {
  return <div>...</div>;
});`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
