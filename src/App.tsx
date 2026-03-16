import { CookieConsentBar } from '@/components/CookieConsentBar';
import { Footer } from '@/components/Footer';
import { GA4Provider } from '@/components/GA4Provider';
import { HeadUpdater } from '@/components/HeadUpdater';
import { Header } from '@/components/Header';
import { Overlay } from '@/components/Overlay';
import { SideDrawer } from '@/components/SideDrawer';
import { RouterOnChange } from '@/modules/router';
import { RouterPage } from '@/modules/router/pages';
import { StoreContextProvider } from '@/modules/store';
import { FunctionalComponent, JSX } from 'preact';
import { Route, Router } from 'wouter-preact';

interface AppProps {
    store?: PageStore;
}

export const App: FunctionalComponent<AppProps> = ({ store = {} }): JSX.Element => (
    <StoreContextProvider store={store}>
        <HeadUpdater />
        <Router ssrPath={store.url}>
            <RouterOnChange />
            <Header />
            <SideDrawer />
            <main>
                <Route path="*">{(params): JSX.Element => RouterPage(params['*'] ? `/${params['*']}` : '/')}</Route>
            </main>
        </Router>
        <Footer />
        <CookieConsentBar />
        <GA4Provider />
        <Overlay />
    </StoreContextProvider>
);

export default App;
