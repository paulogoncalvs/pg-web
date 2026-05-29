import type { ComponentChildren, JSX } from "preact";

import { Component } from "preact";

interface ErrorBoundaryProps {
  children?: ComponentChildren;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: Readonly<ErrorBoundaryState> = { hasError: false };

  componentDidCatch(error: Error, errorInfo: preact.ErrorInfo): void {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): JSX.Element | ComponentChildren {
    if (this.state.hasError) {
      return (
        <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6" role="alert">
          <h1 class="text-2xl font-bold">Something went wrong</h1>
          <p class="text-stone-600 dark:text-zinc-400">Try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
