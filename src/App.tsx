import { h, FunctionalComponent, JSX } from 'preact';
import { Route, Router } from 'wouter-preact';
import { StoreContextProvider } from '@/modules/store';
import { RouterOnChange } from '@/modules/router';
import { RouterPage } from '@/modules/router/pages';
import { HeadUpdater } from '@/components/HeadUpdater';
import { Header } from '@/components/Header';
import { SideDrawer } from '@/components/SideDrawer';
import { Footer } from '@/components/Footer';
import { Overlay } from '@/components/Overlay';
import { CookieConsentBar } from '@/components/CookieConsentBar';
import { GA4Provider } from '@/components/GA4Provider';

interface AppProps {
    store?: PageStore;
}

export const App: FunctionalComponent<AppProps> = ({ store = {} }): JSX.Element => (
    <StoreContextProvider store={store}>
        <HeadUpdater />
        <Router ssrPath={store.url}>
            <RouterOnChange />
            <Header />
            <main class="mx-auto">
                <Route path="*">{(params): JSX.Element => RouterPage(params['*'] ? `/${params['*']}` : '/')}</Route>
            </main>
            <SideDrawer />
        </Router>
        <Footer />
        <CookieConsentBar />
        <GA4Provider />
        <Overlay />
    </StoreContextProvider>
);

export default App;
