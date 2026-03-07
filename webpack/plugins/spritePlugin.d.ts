declare module './spritePlugin.js' {
    import { Plugin } from 'webpack';
    export class SpritePlugin implements Plugin {
        constructor(options: { icons: string; output?: string });
    }
}
