import type { FunctionalComponent } from "preact";
import { useContext } from "preact/hooks";

import { StoreContext } from "@/modules/store";

interface IconComponentProps {
  src: IconSrc;
  width?: string;
  height?: string;
  classes?: string;
  viewBox?: string;
  ariaHidden?: boolean;
  onClick?(): unknown;
  otherProps?: unknown;
}

export const Icon: FunctionalComponent<IconComponentProps> = ({
  src,
  width = "24",
  height = "24",
  classes = "fill-current",
  ariaHidden,
  ...otherProps
}) => {
  const { filenames } = useContext(StoreContext);

  // Handle both array format (Vite transformed) and string format (SSR)
  let hash = "#";
  let viewBox: string | undefined;

  // Normal Vite client format: ['#sprite-x', '0 0 24 24']
  if (
    Array.isArray(src) &&
    src.length > 0 &&
    typeof src[0] === "string" &&
    src[0].startsWith("#")
  ) {
    hash = src[0];
    viewBox = src[1];
  }
  // SSR format: the src might be something else
  else {
    const srcStr = String(src);
    const match = srcStr.match(/#sprite-([^>\s]+)/);
    if (match) {
      hash = `#sprite-${match[1]}`;
    }
  }

  return (
    <svg
      {...otherProps}
      role="img"
      aria-hidden={ariaHidden}
      aria-label={hash.replace("#", "")}
      class={classes}
      width={width}
      height={height}
      {...(viewBox ? { viewBox } : {})}
    >
      <use href={`${filenames ? filenames.sprite : ""}${hash}`} />
    </svg>
  );
};
