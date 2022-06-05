import { writeFileSync } from 'fs';
import prettier from 'prettier';
import globalConfig from '../config/global/index.js';

(async function generateSitemap() {
    const prettierConfig = await prettier.resolveConfig('prettier.config.js');
    const baseUrl = globalConfig.baseUrl.replace(/\/+$/, '');
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${Object.keys(globalConfig.routes)
            .map((route) =>
                !route.includes('404')
                    ? `<url>
            <loc>${baseUrl}${route}</loc>
            </url>
            `
                    : '',
            )
            .join('')}
    </urlset>`;

    writeFileSync(
        'public/sitemap.xml',
        prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        }),
    );
})();
