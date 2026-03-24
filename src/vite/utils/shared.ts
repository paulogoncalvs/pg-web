import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directory constants
export const ICONS_DIR = "src/assets/icons";
export const DIST_DIR = "dist";
export const PUBLIC_ASSETS_IMG_DIR = "public/assets/img";
export const DIST_ASSETS_IMG_DIR = "dist/assets/img";

// Asset name constants
export const SPRITE_FILENAME = "sprite.svg";

const resolveFromRoot = (relative: string): string =>
  path.resolve(__dirname, "../../../", relative);

export const resolveIconsDir = (): string => resolveFromRoot(ICONS_DIR);

export const resolvePublicAssetsImgDir = (): string => resolveFromRoot(PUBLIC_ASSETS_IMG_DIR);

export const resolveDistAssetsImgDir = (): string => resolveFromRoot(DIST_ASSETS_IMG_DIR);

export const resolveDistDir = (): string => resolveFromRoot(DIST_DIR);
