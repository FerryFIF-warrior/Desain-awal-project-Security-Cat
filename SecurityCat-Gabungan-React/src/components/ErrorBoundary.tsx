import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

// Pengganti error.tsx (Modul 6): error boundary klien.
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      return (
        <div
          style={{
            background: "#1c1f2a",
            padding: 24,
            borderRadius: 12,
            maxWidth: 640,
            margin: "48px auto",
          }}
        >
          <h1>Dashboard gagal dimuat</h1>
          <p style={{ color: "#89ceff" }}>{String(error.message || error)}</p>
          <button
            onClick={() => this.setState({ error: null })}
            type="button"
            style={{
              background: "#00f0ff",
              color: "#0f131d",
              padding: "10px 18px",
              borderRadius: 8,
              fontWeight: 700,
              border: 0,
            }}
          >
            Coba lagi
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
