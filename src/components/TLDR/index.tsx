import type { FunctionalComponent } from "preact";

import { useTranslate } from "@/modules/i18n";

export const TLDR: FunctionalComponent<{ children?: preact.ComponentChildren }> = ({
  children,
}) => {
  const { t } = useTranslate();

  return (
    <div class="mb-12 border-l-4 border-stone-400/40 pl-6 text-base leading-7 italic sm:text-lg dark:border-zinc-600/80 [&_p]:m-0 [&_p]:inline">
      <span class="mr-1 font-bold tracking-wide text-stone-500 dark:text-zinc-500">
        {t("blog_tldr")}{" "}
      </span>
      {children}
    </div>
  );
};
