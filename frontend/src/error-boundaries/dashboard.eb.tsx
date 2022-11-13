import { Component } from "react";
import { DashboardErrorComponent } from "../components/Errors";

interface State {
  hasError: boolean;
  error: { message: ""; stack: "" };
  info: { componentStack: "" };
}

class DashboardErrorBoundary extends Component<any, State> {
  state: State = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error: any) => {
    return { hasError: true };
  };

  componentDidCatch = (error: any, info: any) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <DashboardErrorComponent /> : children;
  }
}

export { DashboardErrorBoundary };
