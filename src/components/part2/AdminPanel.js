import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

// ============================================
// Exercise 2.3: Route-Based Code Splitting
// This component is lazy-loaded via React.lazy
// ============================================

// Simulate heavy charting libraries
const simulateHeavyLoad = () => {
  // This simulates the time it takes to load heavy libraries
  console.log('AdminPanel: Heavy charting libraries loaded!');
};

// Mock admin stats
const mockStats = {
  totalUsers: 15234,
  activeQuests: 847,
  goldCirculating: 2847593,
  itemsTraded: 45821,
  guildsActive: 156,
  bossesDefeated: 12847,
};

// Mock chart data
const mockChartData = [
  { month: 'Jan', users: 1200, quests: 450 },
  { month: 'Feb', users: 1450, quests: 520 },
  { month: 'Mar', users: 1680, quests: 610 },
  { month: 'Apr', users: 2100, quests: 780 },
  { month: 'May', users: 2450, quests: 920 },
  { month: 'Jun', users: 2890, quests: 1100 },
];

// Simple bar chart component (simulating heavy chart library)
const BarChart = ({ data, dataKey, color }) => {
  const maxValue = Math.max(...data.map(d => d[dataKey]));
  
  return (
    <div className="bar-chart">
      {data.map((item, index) => (
        <div key={index} className="bar-group">
          <div 
            className="bar"
            style={{ 
              height: `${(item[dataKey] / maxValue) * 150}px`,
              background: color,
            }}
          >
            <span className="bar-value">{item[dataKey]}</span>
          </div>
          <span className="bar-label">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

const AdminPanel = () => {
  const [loadTime, setLoadTime] = useState(0);
  const [stats, setStats] = useState(mockStats);

  useEffect(() => {
    const startTime = performance.now();
    simulateHeavyLoad();
    const endTime = performance.now();
    setLoadTime(Math.round(endTime - startTime));
  }, []);

  return (
    <div className="page-container admin-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">👑</span>
          Admin Panel
        </h1>
        <p className="page-subtitle">
          Exercise 2.3: This component was lazy-loaded via React.lazy!
        </p>
      </header>

      <div className="admin-content">
        {/* Load Info */}
        <section className="load-info rpg-panel">
          <div className="load-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Lazy Loaded</span>
          </div>
          <div className="load-details">
            <p>This component was loaded on-demand using <code>React.lazy()</code> and <code>Suspense</code>.</p>
            <p>It's not included in the initial bundle, reducing your app's startup time!</p>
          </div>
          <div className="load-stats">
            <div className="load-stat">
              <span className="stat-label">Component Load Time:</span>
              <span className="stat-value">{loadTime}ms</span>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-section rpg-panel">
          <h2 className="section-title">Kingdom Statistics</h2>
          <div className="stats-grid">
            <StatCard 
              icon="👥" 
              label="Total Adventurers" 
              value={stats.totalUsers.toLocaleString()} 
              color="gold"
            />
            <StatCard 
              icon="📜" 
              label="Active Quests" 
              value={stats.activeQuests.toLocaleString()} 
              color="cyan"
            />
            <StatCard 
              icon="💰" 
              label="Gold Circulating" 
              value={stats.goldCirculating.toLocaleString()} 
              color="gold"
            />
            <StatCard 
              icon="⚔️" 
              label="Items Traded" 
              value={stats.itemsTraded.toLocaleString()} 
              color="purple"
            />
            <StatCard 
              icon="🏰" 
              label="Active Guilds" 
              value={stats.guildsActive.toLocaleString()} 
              color="green"
            />
            <StatCard 
              icon="🐉" 
              label="Bosses Defeated" 
              value={stats.bossesDefeated.toLocaleString()} 
              color="red"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="charts-section rpg-panel">
          <h2 className="section-title">Growth Analytics</h2>
          <p className="charts-note">
            These charts simulate heavy charting libraries that are only loaded when this page is visited.
          </p>
          <div className="charts-grid">
            <div className="chart-container">
              <h3 className="chart-title">User Growth</h3>
              <BarChart 
                data={mockChartData} 
                dataKey="users" 
                color="linear-gradient(180deg, #ffd700, #8b6914)"
              />
            </div>
            <div className="chart-container">
              <h3 className="chart-title">Quest Completions</h3>
              <BarChart 
                data={mockChartData} 
                dataKey="quests" 
                color="linear-gradient(180deg, #4fc3f7, #0288d1)"
              />
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// App.js - Route-Based Code Splitting
import React, { Suspense, lazy } from 'react';

// Static import (included in main bundle)
import HomePage from './HomePage';

// Dynamic import (separate chunk, loaded on demand)
const AdminPanel = lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* Wrapped in Suspense with fallback */}
      <Route 
        path="/admin" 
        element={
          <Suspense fallback={<LoadingSpinner message="Loading Admin Panel..." />}>
            <AdminPanel />
          </Suspense>
        } 
      />
    </Routes>
  );
}

// This reduces initial bundle size!
// AdminPanel + charting libs only load when user visits /admin`}
          </pre>
        </section>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className={`stat-card color-${color}`}>
    <span className="stat-icon">{icon}</span>
    <div className="stat-content">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  </div>
);

export default AdminPanel;
