import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log for diagnostics — replace/extend with a reporting service if desired
    console.error('AUSM crashed with an uncaught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFBFC] p-4">
          <div className="max-w-md w-full bg-white border-2 border-[#1B3A5C] rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-[#800020] text-white border-2 border-[#1B3A5C] rounded-full mx-auto flex items-center justify-center mb-5">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black text-[#1B3A5C] mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-slate-600 font-medium mb-6 leading-relaxed">
              Campus Cart hit an unexpected snag. Your data is safe — try reloading the page,
              and if the problem sticks around, let us know.
            </p>
            <button
              onClick={this.handleReload}
              className="w-full bg-[#800020] hover:bg-[#600018] text-white font-black text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
