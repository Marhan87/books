
import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types';


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {

    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      
      return <h1>Something went wrong.</h1>;
    }


    return this.props.children;
  }
}

export default ErrorBoundary;
