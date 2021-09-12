import globalRoutesConfig from '@/shared/routes.js';
import { isBrowser } from '@/utils/browser';
import { useRouter } from '@/modules/router';

export const HeadUpdater = (): null => {
    useRouter();

    if (!isBrowser()) {
        return null;
    }

    const { title } = globalRoutesConfig[window.location.pathname]?.templateParameters?.head;

    document.title = title;

    return null;
};
