import path from "node:path";

export function transformSvgToSymbol(code: string, id: string) {
  if (!id.endsWith(".svg")) {
    return null;
  }

  const iconName = `#sprite-${path.basename(id, ".svg")}`;

  const viewBoxMatch = code.match(/viewBox="([^"]+)"/i);
  let viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

  if (!viewBoxMatch) {
    const widthMatch = code.match(/width="(\d+)"/);
    const heightMatch = code.match(/height="(\d+)"/);
    if (widthMatch && heightMatch) {
      viewBox = `0 0 ${widthMatch[1]} ${heightMatch[1]}`;
    }
  }

  return `export default ["${iconName}", "${viewBox}"];`;
}
