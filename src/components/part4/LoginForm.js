import React, { useState } from 'react';
import './LoginForm.css';

// ============================================
// Exercise 4.1: Integration Testing a Form
// This component is designed to be tested with RTL
// ============================================

// Mock API function
export const loginAPI = async (email, password) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (email === 'error@test.com') {
    throw new Error('Invalid credentials');
  }
  
  if (!email.includes('@') || password.length < 6) {
    throw new Error('Invalid email or password too short');
  }
  
  return {
    success: true,
    user: {
      name: email.split('@')[0],
      email: email,
    },
  };
};

const LoginForm = ({ onLogin = loginAPI }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset state
    setStatus('loading');
    setMessage('');
    
    try {
      const result = await onLogin(email, password);
      setStatus('success');
      setMessage(`Welcome back, ${result.user.name}!`);
      setUserName(result.user.name);
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Login failed');
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setStatus('idle');
    setMessage('');
    setUserName('');
  };

  return (
    <div className="page-container login-form-page">
      <header className="page-header">
        <h1 className="page-title">
          <span className="title-icon">🔐</span>
          Login Form
        </h1>
        <p className="page-subtitle">
          Exercise 4.1: Integration testing with React Testing Library
        </p>
      </header>

      <div className="login-form-content">
        {/* Login Card */}
        <section className="login-card rpg-panel">
          <div className="login-header">
            <div className="login-emblem">🏰</div>
            <h2 className="login-title">Adventurer's Guild</h2>
            <p className="login-subtitle">Enter your credentials to continue</p>
          </div>

          {status === 'success' ? (
            <div className="login-success">
              <div className="success-icon">✅</div>
              <h3 className="success-title">Welcome back, {userName}!</h3>
              <p className="success-message">You have successfully logged in to the guild.</p>
              <button 
                className="rpg-button"
                onClick={handleReset}
                data-testid="reset-button"
              >
                Log Out
              </button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="rpg-input"
                  placeholder="hero@guild.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  aria-label="Email Address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="rpg-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={status === 'loading'}
                  aria-label="Password"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="error-message" role="alert">
                  <span className="error-icon">⚠️</span>
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="rpg-button rpg-button-magic submit-button"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Authenticating...
                  </>
                ) : (
                  '🗝️ Enter the Guild'
                )}
              </button>
            </form>
          )}

          <div className="login-footer">
            <p>Test credentials: any valid email + 6+ char password</p>
            <p>Error test: error@test.com</p>
          </div>
        </section>

        {/* Testing Info */}
        <section className="testing-info rpg-panel">
          <h2 className="section-title">Testing Strategy</h2>
          
          <div className="test-cases">
            <div className="test-case">
              <span className="test-icon">✓</span>
              <div>
                <h4>Render Test</h4>
                <code>render(&lt;LoginForm /&gt;)</code>
                <p>Assert: form elements are present</p>
              </div>
            </div>
            
            <div className="test-case">
              <span className="test-icon">✓</span>
              <div>
                <h4>User Interaction</h4>
                <code>userEvent.type(emailInput, 'test@example.com')</code>
                <p>Assert: input values update correctly</p>
              </div>
            </div>
            
            <div className="test-case">
              <span className="test-icon">✓</span>
              <div>
                <h4>Async Success</h4>
                <code>await screen.findByText(/welcome back/i)</code>
                <p>Assert: success message appears after login</p>
              </div>
            </div>
            
            <div className="test-case">
              <span className="test-icon">✓</span>
              <div>
                <h4>Error Handling</h4>
                <code>await screen.findByRole('alert')</code>
                <p>Assert: error message displays on failure</p>
              </div>
            </div>
          </div>

          <div className="anti-pattern-warning">
            <span className="warning-icon">⚠️</span>
            <div>
              <strong>Anti-Pattern:</strong>
              <p>Don't test internal state like <code>useState</code> values. Test what the user sees!</p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="code-section rpg-panel">
          <h2 className="section-title">Ancient Scrolls (Test Code)</h2>
          <pre className="code-block">
{`// LoginForm.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  // Mock the API
  const mockLogin = jest.fn();
  
  beforeEach(() => {
    mockLogin.mockReset();
  });
  
  test('shows success message after login', async () => {
    // Arrange
    mockLogin.mockResolvedValue({ 
      success: true, 
      user: { name: 'Hero' } 
    });
    render(<LoginForm onLogin={mockLogin} />);
    
    // Act
    await userEvent.type(
      screen.getByLabelText(/email/i), 
      'hero@guild.com'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i), 
      'secretpass'
    );
    await userEvent.click(
      screen.getByRole('button', { name: /enter/i })
    );
    
    // Assert - Wait for async result
    expect(
      await screen.findByText(/welcome back/i)
    ).toBeInTheDocument();
  });
  
  test('shows error on failed login', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm onLogin={mockLogin} />);
    
    // Fill and submit
    await userEvent.type(screen.getByLabelText(/email/i), 'bad@email.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /enter/i }));
    
    // Assert error appears
    expect(await screen.findByRole('alert')).toHaveTextContent(/invalid/i);
  });
});`}
          </pre>
        </section>
      </div>
    </div>
  );
};

export default LoginForm;
