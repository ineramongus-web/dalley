import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any; // Changed from Error | null to any to catch non-standard errors
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // Explicitly declare state to avoid TS errors
  public state: ErrorBoundaryState;
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorMessage = 
        this.state.error instanceof Error 
          ? this.state.error.message 
          : typeof this.state.error === 'object' 
            ? JSON.stringify(this.state.error, null, 2)
            : String(this.state.error);

      return (
        <div style={{ 
          padding: '2rem', 
          color: '#fff', 
          background: '#050505', 
          minHeight: '100vh', 
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '600px' }}>
            The application encountered a critical error. This prevents the black screen issue.
          </p>
          <div style={{ 
            background: '#111', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid #333',
            overflow: 'auto', 
            maxWidth: '90%',
            width: '600px',
            textAlign: 'left',
            marginBottom: '2rem'
          }}>
            <code style={{ color: '#f87171', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
              {errorMessage}
            </code>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '0.75rem 2rem', 
              background: '#ec4899', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '99px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);