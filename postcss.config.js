import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const wrapPlugin = (plugin) => {
    const originalOnce = plugin.Once;
    if (originalOnce) {
        plugin.Once = function (root, result) {
            try {
                return originalOnce.call(this, root, result);
            } catch (e) {
                result.warn(`Plugin error: ${e.message}`);
            }
        };
    }
    return plugin;
};

export default {
    plugins: [wrapPlugin(tailwindcss()), autoprefixer()],
};
