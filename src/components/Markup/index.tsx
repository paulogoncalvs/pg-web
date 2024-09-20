import { h, FunctionalComponent, VNode } from 'preact';
import classNames from 'classnames';

interface MarkupComponentProps {
    data: string | VNode;
    classes?: string;
    Element?: FunctionalComponent<{ class?: string; dangerouslySetInnerHTML: { __html: string | VNode } }> | string;
}

export const Markup: FunctionalComponent<MarkupComponentProps> = ({
    data = '',
    classes,
    Element = 'div',
    // @ts-ignore
}): JSX.Element => <Element class={classNames('mux', classes)} dangerouslySetInnerHTML={{ __html: data }} />;
