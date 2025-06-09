import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { axe, toHaveNoViolations } from 'jest-axe';
import routesConfig from '@/config/routes/index.js';
import { App } from '@/App';

expect.extend(toHaveNoViolations);

interface PageTestsOptions {
    name: string;
    route: string;
    storeData: PageStore;
}

const pageTests = ({ name, route, storeData }: PageTestsOptions): void => {
    if (!storeData) {
        return;
    }

    const originalWindowLocation = window.location;

    afterAll(() => {
        window.history.pushState({}, '', originalWindowLocation.pathname);
    });

    describe(`[PAGE] ${name} Page`, () => {
        window.history.pushState({}, name, route);

        const container = render(<App store={storeData} />);

        it('should render', async () => {
            expect(container).toMatchSnapshot();
        });

        it('should not have axe violations', async () => {
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });
    });
};

// Run
for (const pageKey of Object.keys(routesConfig)) {
    const name = routesConfig[pageKey].tests?.name;

    if (name) {
        pageTests({
            name,
            route: pageKey,
            storeData: routesConfig[pageKey].tests,
        });
    }
}
