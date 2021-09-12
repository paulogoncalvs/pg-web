import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { App } from '@/App';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('App', () => {
    const container = render(<App />);

    it('should render App', async () => {
        expect(container).toMatchSnapshot();
    });

    it('should not have axe violations', async () => {
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
