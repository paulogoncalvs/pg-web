import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { Link } from '@/components/Link';

describe('Link', () => {
    it('should render Link component', () => {
        expect(render(<Link href="/test/" />)).toMatchSnapshot();
    });

    it('should render Link component that opens on a new window', () => {
        expect(render(<Link href="/test/" newWindow />)).toMatchSnapshot();
    });
});
