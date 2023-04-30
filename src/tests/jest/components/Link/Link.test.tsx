import { h } from 'preact';
import { render } from 'preact-render-to-string';
import { Link } from '@/components/Link';

describe('[COMPONENT] Link Component', () => {
    it('should render default', () => {
        expect(render(<Link href="/test/" />)).toMatchSnapshot();
    });

    it('should render to open on a new window', () => {
        expect(render(<Link href="/test/" newWindow />)).toMatchSnapshot();
    });
});
