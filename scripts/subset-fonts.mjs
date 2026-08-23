import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

// Full original fonts are kept untouched in `original/` — this script reads
// them and writes the subsets next to them, so it can safely run on every
// build (idempotent) and pick up new glyphs when site text changes.
const FONTS_DIR = path.resolve("src/assets/fonts");
const ORIGINALS_DIR = path.join(FONTS_DIR, "original");
const SRC_DIRS = ["src"];
// Always keep the full printable ASCII range plus common typography
// used across locales, so dynamic strings never miss a glyph.
const BASE_TEXT =
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00A0\u2013\u2014\u2018\u2019\u201C\u201D\u2026\u20AC";

async function collectText(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  const files = entries
    .filter((entry) => entry.isFile() && /\.(ts|tsx|mdx|md)$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath ?? entry.path, entry.name));
  const contents = await Promise.all(files.map((file) => readFile(file, "utf8")));
  return contents.join("");
}

const source = BASE_TEXT + (await collectText(SRC_DIRS[0]));
const chars = [...new Set(source)].join("");

const fonts = (await readdir(ORIGINALS_DIR)).filter((file) => file.endsWith(".woff2"));
await Promise.all(
  fonts.map(async (file) => {
    const input = await readFile(path.join(ORIGINALS_DIR, file));
    const output = await subsetFont(input, chars, { targetFormat: "woff2" });
    await writeFile(path.join(FONTS_DIR, file), output);
    console.info(
      `[subset-font] ${file}: ${(input.length / 1024).toFixed(1)} kB -> ${(output.length / 1024).toFixed(1)} kB (${chars.length} glyphs)`,
    );
  }),
);
