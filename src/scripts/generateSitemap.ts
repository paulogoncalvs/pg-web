import { writeFileSync } from 'fs';
import prettier from 'prettier';
import globalConfig from '../config/global/index.js';

const shouldIgnoreRoute = (route: string): boolean =>
    !!['offline', '404', '/en'].some((element) => route.includes(element));

(async function generateSitemap(): Promise<void> {
    const prettierConfig = await prettier.resolveConfig('prettier.config.js');
    const baseUrl = globalConfig.baseUrl.replace(/\/+$/, '');
    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${Object.keys(globalConfig.routes)
            .map((route) =>
                shouldIgnoreRoute(route)
                    ? ''
                    : `<url>
            <loc>${baseUrl}${route}</loc>
            </url>
            `,
            )
            .join('')}
    </urlset>`;

    writeFileSync(
        'public/sitemap.xml',
        await prettier.format(sitemap, {
            ...prettierConfig,
            parser: 'html',
        }),
    );

    console.info('New Sitemap Generated in /public/sitemap.xml');
})();
