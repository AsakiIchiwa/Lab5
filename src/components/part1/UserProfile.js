import React, { useReducer, useCallback } from 'react';
import './UserProfile.css';

// ============================================
// Exercise 1.1: The Fetch Machine (useReducer)
// Finite State Machine Pattern Implementation
// ============================================

// Valid state transitions map
const validTransitions = {
  idle: ['loading'],
  loading: ['resolved', 'rejected'],
  resolved: ['loading'],
  rejected: ['loading'],
};

// Initial state
const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'resolved' | 'rejected'
  data: null,
  error: null,
};

// Reducer with FSM validation
function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT': {
      // Validate transition: can only go to 'loading' from idle, resolved, or rejected
      if (!validTransitions[state.status].includes('loading')) {
        console.warn(`Invalid transition: ${state.status} -> loading`);
        return state;
      }
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    }
    
    case 'FETCH_SUCCESS': {
      // Validate transition: can only succeed from 'loading'
      if (!validTransitions[state.status].includes('resolved')) {
        console.warn(`Invalid transition: ${state.status} -> resolved`);
        return state;
      }
      return {
        ...state,
        status: 'resolved',
        data: action.payload,
        error: null,
      };
    }
    
    case 'FETCH_FAILURE': {
      // Validate transition: can only fail from 'loading'
      if (!validTransitions[state.status].includes('rejected')) {
        console.warn(`Invalid transition: ${state.status} -> rejected`);
        return state;
      }
      return {
        ...state,
        status: 'rejected',
        data: null,
        error: action.payload,
      };
    }
    
    case 'RESET': {
      return initialState;
    }
    
    default:
      return state;
  }
}

// Mock API for demonstration
const mockUsers = [
  { id: 1, name: 'Aragorn', class: 'Ranger', level: 87, guild: 'Fellowship', avatar: '⚔️' },
  { id: 2, name: 'Gandalf', class: 'Wizard', level: 99, guild: 'Istari', avatar: '🧙' },
  { id: 3, name: 'Legolas', class: 'Archer', level: 82, guild: 'Woodland', avatar: '🏹' },
  { id: 4, name: 'Gimli', class: 'Warrior', level: 75, guild: 'Erebor', avatar: '🪓' },
  { id: 5, name: 'Frodo', class: 'Hobbit', level: 50, guild: 'Shire', avatar: '💍' },
];

const fetchUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 'error') {
        reject(new Error('The dark lord has blocked this request!'));
      } else {
        const user = mockUsers.find(u => u.id === parseInt(userId)) || mockUsers[Math.floor(Math.random() * mockUsers.length)];
        resolve(user);
      }
    }, 1500);
  });
};

// Main Component
const UserProfile = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const [selectedUser, setSelectedUser] = React.useState('1');

  const handleFetch = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' });
    
    try {
      const userData = await fetchUser(selectedUser);
      dispatch({ type: 'FETCH_SUCCESS', payload: userData });
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error.message });
    }
  }, [selectedUser]);

  const handleForceInvalidTransition = () => {
    // This will be blocked by FSM validation
    dispatch({ type: 'FETCH_SUCCESS', payload: { name: 'Invalid!' } });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="page-container user-profile-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">📜</span>
          The Fetch Machine
        </h1>
        <p className="page-subtitle">
          Exercise 1.1: Master the art of useReducer with Finite State Machine patterns
        </p>
      </header>

      <div className="user-profile-content">
        {/* Control Panel */}
        <section className="control-panel rpg-panel">
          <h2 className="section-title">Control Crystal</h2>
          
          <div className="control-group">
            <label className="control-label">Select Hero:</label>
            <select 
              className="rpg-input hero-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={state.status === 'loading'}
            >
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.avatar} {user.name} - {user.class}
                </option>
              ))}
              <option value="error">💀 Trigger Error</option>
            </select>
          </div>

          <div className="button-group">
            <button 
              className="rpg-button rpg-button-magic"
              onClick={handleFetch}
              disabled={state.status === 'loading'}
            >
              {state.status === 'loading' ? '🔮 Summoning...' : '🔮 Summon Hero Data'}
            </button>
            
            <button 
              className="rpg-button"
              onClick={handleReset}
              disabled={state.status === 'loading'}
            >
              🔄 Reset
            </button>
            
            <button 
              className="rpg-button rpg-button-danger"
              onClick={handleForceInvalidTransition}
              title="Test FSM validation"
            >
              ⚠️ Force Invalid
            </button>
          </div>
        </section>

        {/* State Machine Visualization */}
        <section className="state-machine rpg-panel">
          <h2 className="section-title">State Machine</h2>
          
          <div className="state-diagram">
            <StateNode status="idle" current={state.status} />
            <StateArrow from="idle" to="loading" label="FETCH_INIT" />
            <StateNode status="loading" current={state.status} />
            <div className="state-branches">
              <StateArrow from="loading" to="resolved" label="SUCCESS" />
              <StateArrow from="loading" to="rejected" label="FAILURE" />
            </div>
            <div className="state-results">
              <StateNode status="resolved" current={state.status} />
              <StateNode status="rejected" current={state.status} />
            </div>
          </div>
          
          <div className="current-state">
            <span className="state-label">Current State:</span>
            <span className={`state-value state-${state.status}`}>
              {state.status.toUpperCase()}
            </span>
          </div>
        </section>

        {/* Result Display */}
        <section className="result-display rpg-panel">
          <h2 className="section-title">Hero Profile</h2>
          
          {state.status === 'idle' && (
            <div className="status-idle">
              <span className="status-icon">🎭</span>
              <span>Awaiting your command, adventurer...</span>
            </div>
          )}
          
          {state.status === 'loading' && (
            <div className="status-loading">
              <div className="magic-circle">
                <span className="magic-rune">ᚠ</span>
                <span className="magic-rune">ᚢ</span>
                <span className="magic-rune">ᚦ</span>
                <span className="magic-rune">ᚨ</span>
              </div>
              <span>Channeling the arcane energies...</span>
            </div>
          )}
          
          {state.status === 'resolved' && state.data && (
            <div className="hero-card">
              <div className="hero-avatar">{state.data.avatar}</div>
              <div className="hero-info">
                <h3 className="hero-name">{state.data.name}</h3>
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-label">Class</span>
                    <span className="stat-value">{state.data.class}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Level</span>
                    <span className="stat-value">{state.data.level}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Guild</span>
                    <span className="stat-value">{state.data.guild}</span>
                  </div>
                </div>
                <div className="level-bar">
                  <div className="level-fill" style={{ width: `${state.data.level}%` }} />
                </div>
              </div>
            </div>
          )}
          
          {state.status === 'rejected' && (
            <div className="status-error">
              <span className="status-icon">💀</span>
              <span>{state.error}</span>
            </div>
          )}
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Code)</h2>
          <pre className="code-block">
{`// Finite State Machine Reducer
const validTransitions = {
  idle: ['loading'],
  loading: ['resolved', 'rejected'],
  resolved: ['loading'],
  rejected: ['loading'],
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      // Validate: only from idle/resolved/rejected
      if (!validTransitions[state.status].includes('loading'))
        return state; // Block invalid transition!
      return { ...state, status: 'loading', error: null };
      
    case 'FETCH_SUCCESS':
      // Validate: only from loading
      if (!validTransitions[state.status].includes('resolved'))
        return state;
      return { ...state, status: 'resolved', data: action.payload };
      
    case 'FETCH_FAILURE':
      // Validate: only from loading
      if (!validTransitions[state.status].includes('rejected'))
        return state;
      return { ...state, status: 'rejected', error: action.payload };
  }
}`}
          </pre>
        </section>
      </div>
    </div>
  );
};

// Helper Components
const StateNode = ({ status, current }) => (
  <div className={`state-node ${status === current ? 'active' : ''}`}>
    <span className="node-icon">
      {status === 'idle' && '🎭'}
      {status === 'loading' && '⏳'}
      {status === 'resolved' && '✅'}
      {status === 'rejected' && '❌'}
    </span>
    <span className="node-label">{status}</span>
  </div>
);

const StateArrow = ({ from, to, label }) => (
  <div className="state-arrow">
    <div className="arrow-line" />
    <span className="arrow-label">{label}</span>
  </div>
);

export default UserProfile;
