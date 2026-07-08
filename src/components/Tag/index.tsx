import type { FunctionalComponent } from "preact";

import { useTranslate } from "@/modules/i18n";

interface TagProps {
  tag: string;
}

export const Tag: FunctionalComponent<TagProps> = ({ tag }) => {
  const { t } = useTranslate();

  return (
    <span class="rounded-md border border-zinc-200 bg-white/70 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
      {t(`tag_${tag}`)}
    </span>
  );
};
