/* eslint-disable react/no-danger */
import { h, FunctionalComponent, VNode } from 'preact';
import classNames from 'classnames';

export const Markup: FunctionalComponent<{
    data: string | VNode;
    classes?: string;
    Element?: FunctionalComponent<{ class?: string; dangerouslySetInnerHTML: { __html: string | VNode } }> | string;
}> = ({ data = '', classes, Element = 'div' }): JSX.Element => (
    <Element class={classNames('mux', classes)} dangerouslySetInnerHTML={{ __html: data }} />
);
