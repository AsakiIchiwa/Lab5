import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/part4/LoginForm';

// ============================================
// Exercise 4.1: Integration Testing a Form
// Using React Testing Library and userEvent
// ============================================

describe('LoginForm', () => {
  // Mock login function
  const mockLogin = jest.fn();
  
  // Setup userEvent
  const user = userEvent.setup();
  
  beforeEach(() => {
    mockLogin.mockReset();
  });
  
  // Test 1: Renders form elements
  test('renders email and password inputs', () => {
    render(<LoginForm onLogin={mockLogin} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });
  
  // Test 2: User can type in inputs
  test('allows user to type email and password', async () => {
    render(<LoginForm onLogin={mockLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'hero@guild.com');
    await user.type(passwordInput, 'secretpass');
    
    expect(emailInput).toHaveValue('hero@guild.com');
    expect(passwordInput).toHaveValue('secretpass');
  });
  
  // Test 3: Shows loading state during submission
  test('shows loading state when submitting', async () => {
    // Make the mock hang to test loading state
    mockLogin.mockImplementation(() => new Promise(() => {}));
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    
    expect(screen.getByText(/authenticating/i)).toBeInTheDocument();
  });
  
  // Test 4: Shows success message after successful login
  test('shows welcome message after successful login', async () => {
    mockLogin.mockResolvedValue({
      success: true,
      user: { name: 'TestHero', email: 'hero@guild.com' }
    });
    
    render(<LoginForm onLogin={mockLogin} />);
    
    // Act - Fill form and submit
    await user.type(screen.getByLabelText(/email/i), 'hero@guild.com');
    await user.type(screen.getByLabelText(/password/i), 'secretpass');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    
    // Assert - Wait for success message
    expect(await screen.findByText(/welcome back, testhero/i)).toBeInTheDocument();
  });
  
  // Test 5: Shows error message on failed login
  test('shows error message when login fails', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByLabelText(/email/i), 'bad@email.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    
    // Assert - Error alert appears
    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/invalid credentials/i);
  });
  
  // Test 6: Calls onLogin with correct arguments
  test('calls onLogin with email and password', async () => {
    mockLogin.mockResolvedValue({ success: true, user: { name: 'Test' } });
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'mypassword');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'mypassword');
    });
  });
  
  // Test 7: Inputs are disabled while loading
  test('disables inputs while loading', async () => {
    mockLogin.mockImplementation(() => new Promise(() => {}));
    
    render(<LoginForm onLogin={mockLogin} />);
    
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /enter/i }));
    
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });
  
  // Anti-Pattern: We do NOT test internal state
  // ❌ expect(component.state.email).toBe('...')
  // ✅ We only test what the user sees!
});
