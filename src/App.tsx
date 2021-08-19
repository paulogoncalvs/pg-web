import { h, FunctionalComponent } from 'preact';
import Router from 'preact-router';
import { Store } from '@/store';
import { history, HandleRouterOnChange } from '@/modules/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';

export const App: FunctionalComponent<{ store?: PageStore }> = ({ store = {} }): JSX.Element => (
    <Store store={store}>
        <main>
            <Header />
            {/* @ts-ignore */}
            <Router onChange={HandleRouterOnChange} history={history}>
                <Home path="/" />
                <Home path="/:locale" />
            </Router>
        </main>
        <Footer />
    </Store>
);

export default App;
