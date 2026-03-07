import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class SpritePlugin {
    constructor(options = {}) {
        this.iconsDir = options.icons;
        this.outputTemplate = options.output || 'assets/img/sprite.[contenthash].svg';
        this.filenames = {};
    }

    getSvgFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        return entries.flatMap((entry) => {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                return this.getSvgFiles(fullPath);
            }

            if (entry.isFile() && entry.name.endsWith('.svg')) {
                return [fullPath];
            }

            return [];
        });
    }

    extractViewBox(content) {
        const viewBoxMatch = content.match(/viewBox="([^"]+)"/i);

        if (viewBoxMatch) {
            return viewBoxMatch[1];
        }

        const width = content.match(/width="([^"]+)"/i)?.[1];
        const height = content.match(/height="([^"]+)"/i)?.[1];

        if (width && height) {
            return `0 0 ${width} ${height}`;
        }

        return '0 0 24 24';
    }

    removeSvgWrapper(content) {
        return content
            .replace(/^[\s\S]*?<svg[^>]*>/i, '')
            .replace(/<\/svg>[\s\S]*$/i, '')
            .trim();
    }

    prefixIds(content, prefix) {
        const idMap = new Map();

        // prefix all ids
        content = content.replace(/\bid="([^"]+)"/g, (match, id) => {
            const newId = `${prefix}-${id}`;
            idMap.set(id, newId);
            return `id="${newId}"`;
        });

        // update references
        for (const [oldId, newId] of idMap.entries()) {
            const patterns = [
                new RegExp(`url\\(#${oldId}\\)`, 'g'),
                new RegExp(`href="#${oldId}"`, 'g'),
                new RegExp(`xlink:href="#${oldId}"`, 'g'),
                new RegExp(`aria-labelledby="${oldId}"`, 'g'),
                new RegExp(`"#${oldId}"`, 'g'),
            ];

            for (const pattern of patterns) {
                content = content.replace(pattern, (match) => match.replace(oldId, newId));
            }
        }

        return content;
    }

    apply(compiler) {
        const pluginName = 'SpritePlugin';
        const { webpack } = compiler;

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                },
                () => {
                    const files = this.getSvgFiles(this.iconsDir).sort();
                    const symbols = [];

                    for (const file of files) {
                        const name = path.basename(file, '.svg');

                        let content = fs.readFileSync(file, 'utf8');

                        // prefix ids to avoid collisions
                        content = this.prefixIds(content, `sprite-${name}`);

                        const viewBox = this.extractViewBox(content);

                        content = this.removeSvgWrapper(content);

                        if (!content.trim()) {
                            console.warn(`[SpritePlugin] Empty SVG skipped: ${file}`);
                            continue;
                        }

                        symbols.push(`<symbol id="sprite-${name}" viewBox="${viewBox}">${content}</symbol>`);
                    }

                    const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">${symbols.join('\n')}</svg>`;

                    const hash = crypto.createHash('md5').update(spriteContent).digest('hex').slice(0, 20);

                    const filename = this.outputTemplate.replace('[contenthash]', hash);

                    compilation.emitAsset(filename, new webpack.sources.RawSource(spriteContent));

                    this.filenames.spritemap = filename;
                },
            );
        });
    }
}
