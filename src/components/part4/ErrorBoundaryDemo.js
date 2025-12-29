import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './ErrorBoundaryDemo.css';

// ============================================
// Exercise 4.2: Testing Error Boundaries
// Using react-error-boundary for error handling
// ============================================

// The "Bomb" component - throws when triggered
const Bomb = ({ shouldExplode }) => {
  if (shouldExplode) {
    throw new Error('💥 BOOM! The component exploded!');
  }
  return (
    <div className="bomb-safe">
      <span className="bomb-icon">💣</span>
      <p>The bomb is stable... for now.</p>
    </div>
  );
};

// Fallback UI component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-fallback" role="alert">
      <div className="fallback-icon">💀</div>
      <h3 className="fallback-title">Something went wrong!</h3>
      <p className="fallback-message">{error.message}</p>
      <div className="fallback-details">
        <pre>{error.stack?.split('\n').slice(0, 3).join('\n')}</pre>
      </div>
      <button 
        className="rpg-button rpg-button-magic"
        onClick={resetErrorBoundary}
      >
        🔄 Try Again
      </button>
    </div>
  );
};

// Demo component showing different error scenarios
const ErrorBoundaryDemo = () => {
  const [bombArmed, setBombArmed] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setBombArmed(false);
    setKey(prev => prev + 1);
  };

  const triggerExplosion = () => {
    setBombArmed(true);
  };

  return (
    <div className="page-container error-boundary-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">💥</span>
          Error Boundary
        </h1>
        <p className="page-subtitle">
          Exercise 4.2: Catch and handle component errors gracefully
        </p>
      </header>

      <div className="error-boundary-content">
        {/* Bomb Container */}
        <section className="bomb-section rpg-panel">
          <h2 className="section-title">The Unstable Component</h2>
          <p className="section-description">
            The Bomb component below is wrapped in an ErrorBoundary. 
            When it explodes, the error is caught and a fallback UI is shown!
          </p>

          <div className="bomb-container">
            <ErrorBoundary
              key={key}
              FallbackComponent={ErrorFallback}
              onReset={handleReset}
              onError={(error, info) => {
                console.log('Error caught by boundary:', error);
                console.log('Component stack:', info.componentStack);
              }}
            >
              <Bomb shouldExplode={bombArmed} />
            </ErrorBoundary>
          </div>

          <div className="bomb-controls">
            <button 
              className="rpg-button rpg-button-danger"
              onClick={triggerExplosion}
              disabled={bombArmed}
            >
              💣 Arm the Bomb
            </button>
            <button 
              className="rpg-button"
              onClick={handleReset}
            >
              🔄 Reset Demo
            </button>
          </div>
        </section>

        {/* Multiple Boundaries Demo */}
        <section className="multi-boundary-section rpg-panel">
          <h2 className="section-title">Isolated Boundaries</h2>
          <p className="section-description">
            Each card has its own ErrorBoundary. One failing component 
            doesn't crash the others!
          </p>

          <div className="cards-grid">
            <IsolatedCard 
              title="Fire Spell" 
              icon="🔥" 
              canFail 
            />
            <IsolatedCard 
              title="Ice Spell" 
              icon="❄️" 
              canFail 
            />
            <IsolatedCard 
              title="Lightning Spell" 
              icon="⚡" 
              canFail 
            />
            <IsolatedCard 
              title="Heal Spell" 
              icon="💚" 
              canFail={false} 
            />
          </div>
        </section>

        {/* Testing Info */}
        <section className="testing-info rpg-panel">
          <h2 className="section-title">Testing Error Boundaries</h2>
          
          <div className="test-steps">
            <div className="test-step">
              <span className="step-number">1</span>
              <div>
                <h4>Create a "Bomb" Component</h4>
                <code>if (shouldExplode) throw new Error('Boom!');</code>
              </div>
            </div>
            
            <div className="test-step">
              <span className="step-number">2</span>
              <div>
                <h4>Wrap in ErrorBoundary</h4>
                <code>&lt;ErrorBoundary FallbackComponent={'{Fallback}'}&gt;</code>
              </div>
            </div>
            
            <div className="test-step">
              <span className="step-number">3</span>
              <div>
                <h4>Assert Fallback Renders</h4>
                <code>expect(screen.getByText(/something went wrong/i))</code>
              </div>
            </div>
            
            <div className="test-step">
              <span className="step-number">4</span>
              <div>
                <h4>Silence Console Errors</h4>
                <code>jest.spyOn(console, 'error').mockImplementation()</code>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Test Code)</h2>
          <pre className="code-block">
{`// ErrorBoundary.test.js
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';

// 1. Create a "Bomb" component that throws
const Bomb = () => {
  throw new Error('Boom!');
};

// 2. Fallback UI
const Fallback = ({ error }) => (
  <div role="alert">Something went wrong: {error.message}</div>
);

describe('ErrorBoundary', () => {
  // 4. Silence console.error during test
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  
  afterEach(() => {
    console.error.mockRestore();
  });
  
  test('renders fallback when child throws', () => {
    // Render Bomb inside ErrorBoundary
    render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Bomb />
      </ErrorBoundary>
    );
    
    // 3. Assert fallback UI is visible
    expect(
      screen.getByRole('alert')
    ).toHaveTextContent(/something went wrong/i);
    
    expect(
      screen.getByText(/boom/i)
    ).toBeInTheDocument();
  });
  
  test('app does not crash', () => {
    // If we reach this assertion, the app didn't crash!
    const { container } = render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Bomb />
      </ErrorBoundary>
    );
    
    expect(container).toBeInTheDocument();
  });
});`}
          </pre>
        </section>
      </div>
    </div>
  );
};

// Isolated Card Component with its own boundary
const IsolatedCard = ({ title, icon, canFail }) => {
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  const CardContent = ({ shouldFail }) => {
    if (shouldFail) {
      throw new Error(`${title} spell backfired!`);
    }
    return (
      <div className="spell-card-content">
        <span className="spell-icon">{icon}</span>
        <h4>{title}</h4>
        {canFail && (
          <button 
            className="rpg-button rpg-button-danger cast-btn"
            onClick={() => setHasError(true)}
          >
            Cast (Risky!)
          </button>
        )}
        {!canFail && (
          <span className="safe-badge">✨ Always Safe</span>
        )}
      </div>
    );
  };

  const CardFallback = ({ resetErrorBoundary }) => (
    <div className="spell-card-error">
      <span className="error-icon">💀</span>
      <p>Spell Failed!</p>
      <button 
        className="rpg-button retry-btn"
        onClick={() => {
          setHasError(false);
          setKey(k => k + 1);
          resetErrorBoundary();
        }}
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="isolated-card">
      <ErrorBoundary
        key={key}
        FallbackComponent={CardFallback}
        onReset={() => setHasError(false)}
      >
        <CardContent shouldFail={hasError} />
      </ErrorBoundary>
    </div>
  );
};

export default ErrorBoundaryDemo;
