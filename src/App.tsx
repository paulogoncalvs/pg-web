import { h, FunctionalComponent } from 'preact';
import { Route, Router } from 'wouter-preact';
import staticLocationHook from 'wouter-preact/static-location';
import { Store } from '@/modules/store';
import { RouterOnChange } from '@/modules/router';
import { getPage } from '@/modules/router/pages';
import { HeadUpdater } from '@/components/HeadUpdater';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { isBrowser } from '@/utils/browser';

interface AppProps {
    store?: PageStore;
}

export const App: FunctionalComponent<AppProps> = ({ store = {} }): JSX.Element => (
    <Store store={store}>
        <HeadUpdater />
        <main>
            <Header />
            <Router {...(!isBrowser() ? { hook: staticLocationHook(store.url) } : {})}>
                <RouterOnChange />
                <Route path="/:path*">{({ path }): JSX.Element => getPage(path ? `/${path}/` : '/')}</Route>
            </Router>
        </main>
        <Footer />
    </Store>
);

export default App;
