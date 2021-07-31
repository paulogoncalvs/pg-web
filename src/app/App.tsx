import { h, FunctionalComponent } from 'preact';
import Router from 'preact-router';
import { AppProvider } from '@/app/AppContext';
import { history, HandleRouterOnChange } from '@/app/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';

export const App: FunctionalComponent<{ store?: PageStore }> = ({ store = {} }): JSX.Element => (
    <AppProvider store={store}>
        <main>
            <Header />
            {/* @ts-ignore */}
            <Router onChange={HandleRouterOnChange} history={history}>
                <Home path="/" />
                <Home path="/:locale" />
            </Router>
        </main>
        <Footer />
    </AppProvider>
);

export default App;
