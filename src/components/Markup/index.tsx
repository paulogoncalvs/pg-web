import type { FunctionalComponent, JSX } from "preact";

interface MarkupProps extends JSX.HTMLAttributes<HTMLElement> {
  html: string;
  as?: JSX.ElementType;
  sanitize?: (html: string) => string;
}

export const Markup: FunctionalComponent<MarkupProps> = ({
  html,
  as: Component = "div",
  sanitize,
  ...props
}) => {
  if (!html) {
    return null;
  }

  const content = sanitize ? sanitize(html) : html;

  return <Component {...props} dangerouslySetInnerHTML={{ __html: content }} />;
};
