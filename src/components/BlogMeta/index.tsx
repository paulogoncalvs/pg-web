import type { FunctionalComponent } from "preact";

import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";
import { Icon } from "@/components/Icon";
import { useTranslate } from "@/modules/i18n";
import { classNames } from "@/utils/classNames";

interface BlogMetaProps {
  date: string;
  readingTime: number;
  size?: "sm" | "base";
  class?: string;
}

const sizeMap = {
  sm: { icon: "size-3", gap: "gap-3", text: "text-xs" },
  base: { icon: "size-4", gap: "gap-5", text: "text-base" },
} as const;

export const BlogMeta: FunctionalComponent<BlogMetaProps> = ({
  date,
  readingTime,
  size = "sm",
  class: classes,
}) => {
  const { t } = useTranslate();
  const s = sizeMap[size];

  return (
    <div
      class={classNames(
        `inline-flex items-center justify-center ${s.gap} ${s.text} text-stone-500 dark:text-zinc-500`,
        classes,
      )}
    >
      <span class="flex items-center gap-1">
        <Icon src={calendarIcon} class={s.icon} aria-hidden="true" />
        {date}
      </span>
      <span class="flex items-center gap-1">
        <Icon src={clockIcon} class={s.icon} aria-hidden="true" />
        {t("blog_reading_time", { min: String(readingTime) })}
      </span>
    </div>
  );
};
