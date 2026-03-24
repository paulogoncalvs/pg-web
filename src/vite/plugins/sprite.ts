import fs from "node:fs";
import path, { resolve } from "node:path";
import { ICONS_DIR } from "../utils/shared";

export function generateSprite(folder: string = ICONS_DIR): string {
  const iconsDir = resolve(__dirname, "../../../", folder);
  const files: string[] = [];

  const getSvgFiles = (dir: string) => {
    if (!fs.existsSync(dir)) {
      return;
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        getSvgFiles(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".svg")) {
        files.push(fullPath);
      }
    }
  };

  getSvgFiles(iconsDir);

  const symbols: string[] = [];

  for (const file of files) {
    const name = path.basename(file, ".svg");
    let content = fs.readFileSync(file, "utf8");

    content = content.replace(/\bid="([^"]+)"/g, (_m, id) => `id="sprite-${name}-${id}"`);

    const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);
    let viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

    if (!viewBoxMatch) {
      const widthMatch = content.match(/width="(\d+)"/);
      const heightMatch = content.match(/height="(\d+)"/);
      if (widthMatch && heightMatch) {
        viewBox = `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
      }
    }

    content = content
      .replace(/^[\s\S]*?<svg[^>]*>/i, "")
      .replace(/<\/svg>[\s\S]*$/i, "")
      .trim();

    if (content) {
      symbols.push(`<symbol id="sprite-${name}" viewBox="${viewBox}">${content}</symbol>`);
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join("")}</svg>`;
}
