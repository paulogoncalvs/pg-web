import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { axe, toHaveNoViolations } from 'jest-axe';
import routesConfig from '@/config/routes/index.js';
import { App } from '@/App';

expect.extend(toHaveNoViolations);

interface PageTestsOptions {
    name: string;
    route: string;
}

export const pageTests = ({ name, route }: PageTestsOptions): void => {
    const data = routesConfig[route]?.templateParameters;

    if (!data) {
        return;
    }

    const originalWindowLocation = window.location;

    afterAll(() => {
        window.history.pushState({}, '', originalWindowLocation.pathname);
    });

    describe(`[PAGE] ${name} Page`, () => {
        window.history.pushState({}, name, route);

        const container = render(<App store={data} />);

        it('should render', async () => {
            expect(container).toMatchSnapshot();
        });

        it('should not have axe violations', async () => {
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });
    });
};
