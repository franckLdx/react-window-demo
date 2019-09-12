import React from 'react';
import { Redirect } from 'react-router';

interface ErrorCatcherState {
  hasError: boolean;
}

export class ErrorCatcher extends React.Component<{}, ErrorCatcherState> {
  state = { hasError: false };

  componentDidCatch(error: Error) {
    console.error(error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Redirect to="/error" />;
    }
    return this.props.children;
  }
}