import { h } from 'preact';
import routesConfig from '@/config/routes/index.js';
import Home from '@/pages/Home';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const pages = {
    Home,
    Contact,
    NotFound,
};

export const getPage = (url: string): JSX.Element => {
    const route = routesConfig[url];
    // @ts-ignore
    const Page = pages[route?.templateParameters?.View] || NotFound;

    return <Page />;
};
