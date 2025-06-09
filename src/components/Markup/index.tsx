import { h, FunctionalComponent, VNode, JSX } from 'preact';
import classNames from 'classnames';

interface MarkupComponentProps {
    data: string | VNode;
    classes?: string;
    Element?: JSX.ElementType;
}

export const Markup: FunctionalComponent<MarkupComponentProps> = ({
    data = '',
    classes,
    Element = 'div',
}): JSX.Element => <Element class={classNames('mux', classes)} dangerouslySetInnerHTML={{ __html: data }} />;
