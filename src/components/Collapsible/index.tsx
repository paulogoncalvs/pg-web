import type { ComponentChildren, FunctionalComponent } from "preact";

import { useEffect, useRef } from "preact/hooks";

import chevronDownIcon from "@/assets/icons/chevron_down.svg";
import { Icon } from "@/components/Icon";
import { classNames } from "@/utils/classNames";

interface CollapsibleProps {
  title: string;
  children: ComponentChildren;
  defaultOpen?: boolean;
  class?: string;
  summaryClass?: string;
  contentClass?: string;
}

export const Collapsible: FunctionalComponent<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  class: classes = "",
  summaryClass = "",
  contentClass = "",
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    if (detailsRef.current && defaultOpen) {
      detailsRef.current.open = true;
    }
  }, [defaultOpen]);

  return (
    <details ref={detailsRef} class={classNames("group", classes)}>
      <summary
        class={classNames(
          "flex cursor-pointer items-center justify-between bg-transparent p-0 text-xs font-bold tracking-widest uppercase transition-colors hover:text-zinc-600 dark:hover:text-zinc-400",
          summaryClass,
        )}
      >
        <span>{title}</span>
        <Icon
          src={chevronDownIcon}
          width="12"
          height="12"
          ariaHidden
          class="transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div class={classNames(contentClass)}>{children}</div>
    </details>
  );
};
