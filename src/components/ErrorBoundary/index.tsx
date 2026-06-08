import type { ComponentChildren, JSX } from "preact";
import type { FunctionalComponent } from "preact";

import { Component, type ErrorInfo } from "preact";

import { useTranslate } from "@/modules/i18n";

const ErrorContent: FunctionalComponent = () => {
  const { t } = useTranslate();
  return (
    <div class="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6" role="alert">
      <h1 class="text-2xl font-bold">{t("error_boundary_title")}</h1>
      <p class="text-stone-600 dark:text-zinc-400">{t("error_boundary_description")}</p>
    </div>
  );
};

interface ErrorBoundaryProps {
  children?: ComponentChildren;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: Readonly<ErrorBoundaryState> = { hasError: false };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render(): JSX.Element | ComponentChildren {
    if (this.state.hasError) {
      return <ErrorContent />;
    }

    return this.props.children;
  }
}
