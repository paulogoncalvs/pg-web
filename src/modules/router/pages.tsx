import { h } from 'preact';
import routesConfig from '@/config/routes/index.js';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

const pages = {
    Home,
    NotFound,
};

export const getPage = (url: string): JSX.Element => {
    const route = routesConfig[url];
    const Page = pages[route?.templateParameters?.View] || NotFound;

    return <Page />;
};
