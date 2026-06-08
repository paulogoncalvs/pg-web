import type { FunctionalComponent, JSX } from "preact";

export type BannerVariant = "info" | "warning" | "error" | "neutral";

interface BannerProps {
  isVisible: boolean;
  variant?: BannerVariant;
  className?: string;
  fixed?: boolean;
  children: JSX.Element | string;
}

const variantStyles: Record<BannerVariant, string> = {
  info: "border-blue-600/30 bg-blue-600/10 text-blue-800 dark:border-blue-400/20 dark:bg-blue-400/5 dark:text-blue-200",
  warning:
    "border-yellow-600/30 bg-yellow-600/10 text-yellow-800 dark:border-yellow-400/20 dark:bg-yellow-400/5 dark:text-yellow-200",
  error:
    "border-red-600/30 bg-red-600/10 text-red-800 dark:border-red-400/20 dark:bg-red-400/5 dark:text-red-200",
  neutral:
    "border-white/80 bg-white/80 text-zinc-900 dark:border-white/15 dark:bg-zinc-900/60 dark:text-zinc-100",
};

export const Banner: FunctionalComponent<BannerProps> = ({
  isVisible,
  variant = "info",
  className = "",
  fixed: isFixed = true,
  children,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      class={`${isFixed ? "fixed right-0 bottom-0 left-0 z-50" : ""} border-t px-4 py-3 text-center text-sm backdrop-blur-md ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};
