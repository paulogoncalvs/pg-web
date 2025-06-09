import { h, JSX, FunctionalComponent } from 'preact';
import routesConfig from '@/config/routes/index.js';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Offline from '@/pages/Offline';

interface Pages {
    [key: string]: FunctionalComponent;
}

const pages: Pages = {
    Home,
    Contact,
    NotFound,
    Offline,
};

export const RouterPage = (url: string): JSX.Element => {
    const route = routesConfig[url.replace('index.html', '')];
    const view = route?.templateParameters?.View;
    const Page = pages[view] || NotFound;

    return <Page />;
};
