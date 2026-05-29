import path from "node:path";
import { fileURLToPath } from "node:url";

// Directory constants
export const ICONS_DIR = "src/assets/icons";
export const DIST_DIR = "dist";
export const SPRITE_FILENAME = "sprite.svg";

const resolveFromRoot = (relative: string): string =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../", relative);

export const resolveIconsDir = (): string => resolveFromRoot(ICONS_DIR);

export const resolveDistDir = (): string => resolveFromRoot(DIST_DIR);
