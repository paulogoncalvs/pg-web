import routesConfig from '@/config/routes/index.js';
import { useRouter } from '@/modules/router';
import { isBrowser } from '@/utils/browser';

export const HeadUpdater = (): null => {
    useRouter();

    if (!isBrowser()) {
        return null;
    }

    const data = routesConfig[window.location.pathname.replace(/\/?$/, '/')] || {};

    if (data.templateParameters) {
        const { title } = data.templateParameters.head;

        document.title = title;
    }

    return null;
};
