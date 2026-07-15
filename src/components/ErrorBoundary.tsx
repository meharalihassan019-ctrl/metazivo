import React, { ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-[250px] p-6 flex flex-col items-center justify-center border border-dashed border-slate-800/50 bg-slate-950/20 rounded-3xl text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-200">
              {this.state.error?.message || "Interactive Canvas Error"}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              The {this.props.fallbackName || "3D visual element"} encountered an error while rendering on scroll. The rest of the site remains perfectly functional.
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold tracking-wider rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:text-white transition-all duration-300 shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span>REINITIALIZE COMPONENT</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
