import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import CustomCursor from './components/effects/CustomCursor';
import ParticleSystem from './components/effects/ParticleSystem';
import TorchLight from './components/effects/TorchLight';
import AmbientBackground from './components/effects/AmbientBackground';
import LoadingSpinner from './components/common/LoadingSpinner';
import UserProfile from './components/part1/UserProfile';
import ShoppingCart from './components/part1/ShoppingCart';
import TabsDemo from './components/part3/TabsDemo';
import ModalDemo from './components/part3/ModalDemo';
import LoginForm from './components/part4/LoginForm';
import ErrorBoundaryDemo from './components/part4/ErrorBoundaryDemo';
import './styles/App.css';

// Part 2: Performance (Lazy loaded for demonstration)
const Dashboard = lazy(() => import('./components/part2/Dashboard'));

// Lazy loaded AdminPanel for Exercise 2.3
const AdminPanel = lazy(() => import('./components/part2/AdminPanel'));

function App() {
  return (
    <div className="app-container">
      <AmbientBackground />
      <ParticleSystem />
      <CustomCursor />
      <TorchLight />
      
      <header className="app-header">
        <div className="header-content">
          <h1 className="rpg-title app-title">
            <span className="title-icon">⚔️</span>
            React Advanced Quests
            <span className="title-icon">🛡️</span>
          </h1>
          <p className="rpg-subtitle header-subtitle">Lab 5: Master the Art of React</p>
        </div>
        
        <nav className="quest-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">🏰</span>
            <span className="nav-text">Guild Hall</span>
          </NavLink>
          
          <div className="nav-section">
            <span className="nav-section-title">Part 1: State Magic</span>
            <NavLink to="/fetch-machine" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">📜</span>
              <span className="nav-text">Fetch Machine</span>
            </NavLink>
            <NavLink to="/shopping-cart" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">🛒</span>
              <span className="nav-text">Global Store</span>
            </NavLink>
          </div>
          
          <div className="nav-section">
            <span className="nav-section-title">Part 2: Performance</span>
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Laggy List</span>
            </NavLink>
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">👑</span>
              <span className="nav-text">Admin Panel</span>
            </NavLink>
          </div>
          
          <div className="nav-section">
            <span className="nav-section-title">Part 3: Patterns</span>
            <NavLink to="/tabs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">📑</span>
              <span className="nav-text">Compound Tabs</span>
            </NavLink>
            <NavLink to="/modal" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">🚪</span>
              <span className="nav-text">Portal Modal</span>
            </NavLink>
          </div>
          
          <div className="nav-section">
            <span className="nav-section-title">Part 4: Testing</span>
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">🔐</span>
              <span className="nav-text">Login Form</span>
            </NavLink>
            <NavLink to="/error-boundary" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">💥</span>
              <span className="nav-text">Error Boundary</span>
            </NavLink>
          </div>
        </nav>
      </header>
      
      <main className="app-main">
        <Suspense fallback={<LoadingSpinner message="Loading Quest..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fetch-machine" element={<UserProfile />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/tabs" element={<TabsDemo />} />
            <Route path="/modal" element={<ModalDemo />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/error-boundary" element={<ErrorBoundaryDemo />} />
          </Routes>
        </Suspense>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="footer-icon">✨</span>
            React Advanced Lab 5 - Forged in the Fires of Knowledge
            <span className="footer-icon">✨</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Home Component
function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-emblem">
          <span className="emblem-icon">⚔️</span>
          <div className="emblem-glow"></div>
        </div>
        <h2 className="rpg-title hero-title">Welcome, Brave Developer</h2>
        <p className="hero-description">
          Your quest awaits! Master the ancient arts of React through these sacred exercises.
          Each challenge will test your skills in state management, performance optimization,
          design patterns, and testing strategies.
        </p>
      </div>
      
      <div className="quests-grid">
        <QuestCard 
          icon="📜"
          title="Part 1: State Magic"
          description="Master useReducer and Redux Toolkit to manage complex state with the power of finite state machines."
          exercises={['The Fetch Machine', 'The Global Store']}
          difficulty={3}
        />
        <QuestCard 
          icon="⚡"
          title="Part 2: Performance"
          description="Optimize your components with useMemo, useCallback, React.memo, and code splitting techniques."
          exercises={['The Laggy List', 'Stabilization', 'Code Splitting']}
          difficulty={4}
        />
        <QuestCard 
          icon="🏗️"
          title="Part 3: Patterns"
          description="Build flexible, reusable components using Compound Components and Portals."
          exercises={['Compound Tabs', 'Portal Modal']}
          difficulty={4}
        />
        <QuestCard 
          icon="🧪"
          title="Part 4: Testing"
          description="Write resilient integration tests using Jest and React Testing Library."
          exercises={['Integration Testing', 'Error Boundaries']}
          difficulty={3}
        />
      </div>
    </div>
  );
}

// Quest Card Component
function QuestCard({ icon, title, description, exercises, difficulty }) {
  return (
    <div className="quest-card rpg-card">
      <div className="quest-card-header">
        <span className="quest-icon">{icon}</span>
        <h3 className="quest-title">{title}</h3>
      </div>
      <p className="quest-description">{description}</p>
      <div className="quest-exercises">
        <span className="exercises-label">Exercises:</span>
        <ul className="exercises-list">
          {exercises.map((ex, idx) => (
            <li key={idx} className="exercise-item">
              <span className="exercise-bullet">◆</span>
              {ex}
            </li>
          ))}
        </ul>
      </div>
      <div className="quest-difficulty">
        <span className="difficulty-label">Difficulty:</span>
        <div className="difficulty-stars">
          {[...Array(5)].map((_, idx) => (
            <span key={idx} className={`star ${idx < difficulty ? 'filled' : ''}`}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
