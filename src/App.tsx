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

interface AppProps {
    store?: PageStore;
}

export const App: FunctionalComponent<AppProps> = ({ store = {} }): JSX.Element => (
    <StoreContextProvider store={store}>
        <HeadUpdater />
        <Router ssrPath={store.url}>
            <RouterOnChange />
            <Header />
            <main class="container px-6 pt-14 pb-14 mx-auto sm:pb-14">
                <Route path="*">{(params): JSX.Element => RouterPage(params['*'] ? `/${params['*']}` : '/')}</Route>
            </main>
            <SideDrawer />
        </Router>
        <Footer />
        <Overlay />
    </StoreContextProvider>
);

export default App;
