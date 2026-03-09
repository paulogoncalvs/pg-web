declare module 'dotenv-webpack' {
    import type { WebpackPluginInstance } from 'webpack';
    interface DotenvOptions {
        path?: string;
        safe?: boolean;
        systemvars?: boolean;
        defaults?: boolean;
        prefix?: string;
    }
    class Dotenv implements WebpackPluginInstance {
        constructor(options?: DotenvOptions);
        apply(): void;
    }
    export default Dotenv;
}

declare module 'html-webpack-tags-plugin' {
    import type { WebpackPluginInstance } from 'webpack';
    interface HtmlWebpackTagsPluginOptions {
        append?: boolean;
        publicPath?: boolean | string;
        assetsPath?: string;
        hash?: boolean | ((assetName: string, hash: string) => string);
        metas?: Record<string, string>[];
        scripts?: string[];
        links?: string[];
    }
    class HtmlWebpackTagsPlugin implements WebpackPluginInstance {
        constructor(options?: HtmlWebpackTagsPluginOptions);
        apply(): void;
    }
    export default HtmlWebpackTagsPlugin;
}

declare module 'html-webpack-deploy-plugin' {
    import type { WebpackPluginInstance } from 'webpack';
    interface HtmlWebpackDeployPluginOptions {
        assetsPath?: string;
        hash?: boolean | ((assetName: string, hash: string) => string);
        publicPath?: boolean | string;
        assets?: {
            js?: string[];
            css?: string[];
            links?: Array<{ rel: string; type?: string; href: string }>;
        };
    }
    class HtmlWebpackDeployPlugin implements WebpackPluginInstance {
        constructor(options?: HtmlWebpackDeployPluginOptions);
        apply(): void;
    }
    export default HtmlWebpackDeployPlugin;
}

declare module 'webpack-bundle-analyzer' {
    import type { WebpackPluginInstance } from 'webpack';
    interface BundleAnalyzerPluginOptions {
        analyzerHost?: string;
        analyzerPort?: number | 'auto';
        reportFilename?: string;
        defaultSizes?: string;
        openAnalyzer?: boolean;
        generateStatsFile?: boolean;
        statsFilename?: string;
        statsOptions?: null | {
            source?: boolean;
            modules?: boolean;
            children?: boolean;
            chunks?: boolean;
            chunkModules?: boolean;
            exclude?: RegExp[];
        };
        analyzerMode?: 'server' | 'static' | 'json' | 'disabled';
        reportTitle?: string | (() => string);
        showSize?: 'stat' | 'parsed' | 'gzip';
        showOpenUI?: boolean;
        useStats?: boolean;
        logger?: 'console' | 'internal' | 'none';
    }
    class BundleAnalyzerPlugin implements WebpackPluginInstance {
        constructor(options?: BundleAnalyzerPluginOptions);
        apply(): void;
    }
    export { BundleAnalyzerPlugin };
    export default BundleAnalyzerPlugin;
}
