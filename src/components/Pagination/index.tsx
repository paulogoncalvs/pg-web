import type { FunctionalComponent } from "preact";

import { useEffect, useState } from "preact/hooks";
import { useSearch, useSearchParams } from "wouter-preact";

import { Button } from "@/components/Button";
import { useTranslate } from "@/modules/i18n";
import { classNames } from "@/utils/classNames";

interface PaginationProps {
  totalPages: number;
}

const btnBase = "interactive interactive-sm";
const btnActive =
  "!border-zinc-900 !bg-zinc-900 !text-white hover:!border-zinc-900 hover:!bg-zinc-900 hover:!text-white focus:!border-zinc-900 focus:!bg-zinc-900 focus:!text-white active:!border-zinc-900 active:!bg-zinc-900 active:!text-white dark:!border-white dark:!bg-white dark:!text-zinc-900 dark:hover:!border-white dark:hover:!bg-white dark:hover:!text-zinc-900 dark:focus:!border-white dark:focus:!bg-white dark:focus:!text-zinc-900 dark:active:!border-white dark:active:!bg-white dark:active:!text-zinc-900";

export const Pagination: FunctionalComponent<PaginationProps> = ({ totalPages }) => {
  const { t } = useTranslate();
  const searchString = useSearch();
  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const rawPage = parseInt(params.get("page") || "1", 10) || 1;
    setCurrentPage(Math.min(Math.max(rawPage, 1), totalPages));
  }, [searchString, totalPages]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchString);
    params.set("page", String(page));
    setSearchParams(params, { replace: true });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav class="mt-8 flex items-center justify-center gap-2">
      <Button
        type="button"
        class={classNames(btnBase, currentPage === 1 && "pointer-events-none opacity-50")}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel={t("blog_pagination_previous")}
      >
        {t("blog_pagination_previous")}
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          type="button"
          class={classNames(btnBase, "size-8 p-0", currentPage === page && btnActive)}
          onClick={() => goToPage(page)}
          ariaLabel={`${t("blog_pagination_page")} ${page}`}
          ariaCurrent={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      ))}
      <Button
        type="button"
        class={classNames(btnBase, currentPage === totalPages && "pointer-events-none opacity-50")}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel={t("blog_pagination_next")}
      >
        {t("blog_pagination_next")}
      </Button>
    </nav>
  );
};
