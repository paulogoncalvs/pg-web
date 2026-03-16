import { classNames } from '@/utils/classNames';
import { FunctionalComponent, JSX, VNode } from 'preact';

interface MarkupComponentProps {
    data: string | VNode;
    classes?: string;
    Element?: JSX.ElementType;
}

export const Markup: FunctionalComponent<MarkupComponentProps> = ({
    data = '',
    classes,
    Element = 'div',
}): JSX.Element => <Element class={classNames(classes)} dangerouslySetInnerHTML={{ __html: data }} />;
