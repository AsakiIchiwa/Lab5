import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from 'react-error-boundary';

// ============================================
// Exercise 4.2: Testing Error Boundaries
// ============================================

// 1. Create a "Bomb" component that throws when rendered
const Bomb = ({ shouldExplode = true }) => {
  if (shouldExplode) {
    throw new Error('Boom!');
  }
  return <div>The bomb is stable</div>;
};

// Fallback UI Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

describe('ErrorBoundary', () => {
  // 4. Silence console.error during tests to keep output clean
  const originalError = console.error;
  
  beforeEach(() => {
    console.error = jest.fn();
  });
  
  afterEach(() => {
    console.error = originalError;
  });
  
  // Test 1: Renders fallback UI when child throws
  test('renders fallback UI when child component throws', () => {
    // 2. Render Bomb inside ErrorBoundary
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Bomb shouldExplode={true} />
      </ErrorBoundary>
    );
    
    // 3. Assert fallback UI is visible
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/boom/i)).toBeInTheDocument();
  });
  
  // Test 2: Application does not crash
  test('application does not crash when error occurs', () => {
    const { container } = render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Bomb shouldExplode={true} />
      </ErrorBoundary>
    );
    
    // If this assertion runs, the app didn't crash!
    expect(container).toBeInTheDocument();
  });
  
  // Test 3: Renders children normally when no error
  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Bomb shouldExplode={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/the bomb is stable/i)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
  
  // Test 4: Reset functionality works
  test('can recover from error using reset button', async () => {
    const user = userEvent.setup();
    let shouldExplode = true;
    
    const { rerender } = render(
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onReset={() => { shouldExplode = false; }}
      >
        <Bomb shouldExplode={shouldExplode} />
      </ErrorBoundary>
    );
    
    // Error state
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    // Click reset
    await user.click(screen.getByRole('button', { name: /try again/i }));
    
    // Rerender with fixed state
    rerender(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Bomb shouldExplode={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/the bomb is stable/i)).toBeInTheDocument();
  });
  
  // Test 5: Error message is displayed correctly
  test('displays the error message in fallback', () => {
    const CustomBomb = () => {
      throw new Error('Custom error message for testing');
    };
    
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CustomBomb />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/custom error message for testing/i)).toBeInTheDocument();
  });
  
  // Test 6: onError callback is called
  test('calls onError when error occurs', () => {
    const onError = jest.fn();
    
    render(
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onError={onError}
      >
        <Bomb shouldExplode={true} />
      </ErrorBoundary>
    );
    
    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0].message).toBe('Boom!');
  });
  
  // Test 7: Nested error boundaries
  test('inner boundary catches error without affecting outer', () => {
    render(
      <ErrorBoundary FallbackComponent={() => <div>Outer Fallback</div>}>
        <div>
          <p>This should still render</p>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Bomb shouldExplode={true} />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    );
    
    // Inner error boundary catches the error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    // Outer content still renders
    expect(screen.getByText(/this should still render/i)).toBeInTheDocument();
    // Outer fallback is NOT shown
    expect(screen.queryByText(/outer fallback/i)).not.toBeInTheDocument();
  });
});
