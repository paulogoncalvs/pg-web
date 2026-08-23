import type { FunctionalComponent } from "preact";

import { useCallback } from "preact/hooks";
import { useLocation, useSearch } from "wouter-preact";

import { Link } from "@/components/Link";
import { useTranslate } from "@/modules/i18n";
import { classNames } from "@/utils/classNames";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const linkBase = "interactive interactive-sm";
const linkActive =
  "!border-zinc-900 !bg-zinc-900 !text-white hover:!border-zinc-900 hover:!bg-zinc-900 hover:!text-white focus:!border-zinc-900 focus:!bg-zinc-900 focus:!text-white active:!border-zinc-900 active:!bg-zinc-900 active:!text-white dark:!border-white dark:!bg-white dark:!text-zinc-900 dark:hover:!border-white dark:hover:!bg-white dark:hover:!text-zinc-900 dark:focus:!border-white dark:focus:!bg-white dark:focus:!text-zinc-900 dark:active:!border-white dark:active:!bg-white dark:active:!text-zinc-900";

const hrefForPage = (path: string, search: string, page: number): string => {
  const basePath = path.replace(/\/page\/\d+\/?$/, "/");
  const pagePath = page <= 1 ? basePath : `${basePath}page/${page}/`;
  const params = new URLSearchParams(search);
  params.delete("page");
  const qs = params.toString();
  return qs ? `${pagePath}?${qs}` : pagePath;
};

export const Pagination: FunctionalComponent<PaginationProps> = ({ totalPages, currentPage }) => {
  const { t } = useTranslate();
  const [path, navigate] = useLocation();
  const search = useSearch();

  const navigateToPage = useCallback(
    (page: number) => (e: Event) => {
      e.preventDefault();
      navigate(hrefForPage(path, search, page));
    },
    [path, search, navigate],
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={t("blog_pagination_label")}
      class="mt-8 flex items-center justify-center gap-2"
    >
      <Link
        href={hrefForPage(path, search, currentPage - 1)}
        onClick={navigateToPage(currentPage - 1)}
        class={classNames(linkBase, currentPage === 1 && "pointer-events-none opacity-50")}
        ariaLabel={t("blog_pagination_previous")}
        aria-disabled={currentPage === 1}
      >
        {t("blog_pagination_previous")}
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={hrefForPage(path, search, page)}
          onClick={navigateToPage(page)}
          class={classNames(linkBase, "size-8 p-0", currentPage === page && linkActive)}
          ariaLabel={`${t("blog_pagination_page")} ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      ))}
      <Link
        href={hrefForPage(path, search, currentPage + 1)}
        onClick={navigateToPage(currentPage + 1)}
        class={classNames(linkBase, currentPage === totalPages && "pointer-events-none opacity-50")}
        ariaLabel={t("blog_pagination_next")}
        aria-disabled={currentPage === totalPages}
      >
        {t("blog_pagination_next")}
      </Link>
    </nav>
  );
};
