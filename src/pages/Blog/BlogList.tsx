import type { FunctionalComponent } from "preact";

import { useCallback, useMemo, useRef, useEffect } from "preact/hooks";
import { useLocation, useSearchParams } from "wouter-preact";

import { BlogMeta } from "@/components/BlogMeta";
import { PageHeading } from "@/components/PageHeading";
import { Pagination } from "@/components/Pagination";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tag } from "@/components/Tag";
import { useTranslate } from "@/modules/i18n";
import { Language } from "@/modules/language";

import { getBlogPosts } from "./posts";

const POSTS_PER_PAGE = 4;

const readSearchParams = (): URLSearchParams => {
  if (typeof window !== "undefined" && window.location.search) {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const BlogList: FunctionalComponent = () => {
  const { t, l: lang } = useTranslate();
  const [location, navigate] = useLocation();
  const [wouterParams] = useSearchParams();
  const searchParams =
    wouterParams.toString() === "" && typeof window !== "undefined" && window.location.search
      ? readSearchParams()
      : wouterParams;

  const sortOrder = useMemo(() => {
    const sort = searchParams.get("sort");
    return sort === "oldest" ? "oldest" : "newest";
  }, [searchParams]);

  const postsRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (tagRef.current && searchParams.get("tag")) {
      tagRef.current.value = searchParams.get("tag")!;
    }
    if (sortRef.current && searchParams.get("sort")) {
      sortRef.current.value = searchParams.get("sort")!;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blogPosts = useMemo(() => getBlogPosts(lang), [lang]);

  const selectedTag = useMemo(() => searchParams.get("tag") || null, [searchParams]);

  const currentPage = useMemo(() => {
    const fromPath = location.split("/page/")[1]?.split("/")[0];
    if (fromPath) {
      const page = Number.parseInt(fromPath, 10);
      if (!Number.isNaN(page)) {
        return page;
      }
    }
    const fromQuery = Number.parseInt(searchParams.get("page") ?? "", 10);
    return Number.isNaN(fromQuery) ? 1 : fromQuery;
  }, [location, searchParams]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    for (const post of blogPosts) {
      for (const tag of post.tags) {
        tags.add(tag);
      }
    }

    return [...tags].sort();
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.tags.includes(selectedTag));
  }, [blogPosts, selectedTag]);

  const sortedPosts = useMemo(() => {
    if (sortOrder === "newest") {
      return filteredPosts;
    }

    return [...filteredPosts].reverse();
  }, [filteredPosts, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / POSTS_PER_PAGE));

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safeCurrentPage - 1) * POSTS_PER_PAGE;

    return sortedPosts.slice(start, start + POSTS_PER_PAGE);
  }, [sortedPosts, safeCurrentPage]);

  const buildBlogUrl = useCallback(
    (extraParams: Record<string, string | null>) => {
      const currentPath = location.split("?")[0];
      const basePath = currentPath.replace(/\/page\/\d+\/?$/, "/");
      const pageUrl = safeCurrentPage <= 1 ? basePath : `${basePath}page/${safeCurrentPage}/`;
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(extraParams).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete("page");
      const qs = params.toString();
      return `${pageUrl}${qs ? `?${qs}` : ""}`;
    },
    [location, safeCurrentPage, searchParams],
  );

  const handleTagChange = useCallback(
    (event: Event) => {
      const tag = (event.currentTarget as HTMLSelectElement).value;
      navigate(buildBlogUrl({ tag: tag || null }));
    },
    [navigate, buildBlogUrl],
  );

  const handleSortChange = useCallback(
    (event: Event) => {
      const sort = (event.currentTarget as HTMLSelectElement).value;
      navigate(buildBlogUrl({ sort: sort !== "newest" ? sort : null }));
    },
    [navigate, buildBlogUrl],
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!postsRef.current) {
      return;
    }

    const top = postsRef.current.getBoundingClientRect().top + window.scrollY - 120;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [safeCurrentPage]);

  return (
    <>
      <PageHeading title={t("blog_page_title")} subtitle={t("blog_page_subtitle")} />
      <div class="flex flex-col items-center pb-16" ref={postsRef}>
        <div class="mb-8 w-full @3xl:max-w-4xl">
          <div class="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <ScrollReveal direction="up">
              {allTags.length > 0 && (
                <div class="inline-flex items-baseline gap-2">
                  <label
                    htmlFor="tag-filter"
                    class="shrink-0 cursor-alias text-sm font-medium text-zinc-700 dark:text-zinc-200"
                  >
                    {t("blog_filter_tag")}
                  </label>

                  <select
                    ref={tagRef}
                    id="tag-filter"
                    value={selectedTag ?? ""}
                    onChange={handleTagChange}
                    class="w-auto cursor-pointer capitalize"
                  >
                    <option value="">{t("blog_filter_all")}</option>

                    {allTags.map((tag) => (
                      <option key={tag} value={tag} class="capitalize">
                        {t(`tag_${tag}`)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal direction="up">
              <div class="inline-flex items-baseline gap-2">
                <label
                  htmlFor="sort-order"
                  class="shrink-0 text-sm font-medium text-zinc-700 dark:text-zinc-200"
                >
                  {t("blog_sort_label")}
                </label>

                <select
                  ref={sortRef}
                  id="sort-order"
                  value={sortOrder}
                  onChange={handleSortChange}
                  class="w-auto cursor-pointer"
                >
                  <option value="newest">{t("blog_sort_newest")}</option>

                  <option value="oldest">{t("blog_sort_oldest")}</option>
                </select>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div
          class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 @3xl:max-w-4xl"
          key={`bloglist-${selectedTag}-${sortOrder}-${safeCurrentPage}`}
        >
          {paginatedPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.15} class="flex w-full">
              <a
                href={lang === Language.en ? `/blog/${post.slug}/` : `/${lang}/blog/${post.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href") ?? "";
                  navigate(href, {
                    state: { from: window.location.pathname + window.location.search },
                  });
                }}
                class="group interactive-card w-full"
              >
                <article>
                  <h2>{post.title}</h2>

                  <p class="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-zinc-400">
                    {post.description}
                  </p>

                  <BlogMeta date={post.date} readingTime={post.readingTime} class="mt-3" />

                  {post.tags.length > 0 && (
                    <div class="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                      {post.tags.map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
                    </div>
                  )}
                </article>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {totalPages > 1 && (
          <ScrollReveal
            key={`pagination-${selectedTag ?? "all"}-${sortOrder}-${safeCurrentPage}`}
            direction="up"
            delay={1}
          >
            <Pagination totalPages={totalPages} currentPage={safeCurrentPage} />
          </ScrollReveal>
        )}

        {paginatedPosts.length === 0 && (
          <p class="mt-8 text-sm text-stone-500 dark:text-zinc-500">{t("blog_no_posts_found")}</p>
        )}

        <ScrollReveal as="p" delay={2} class="mt-8 text-sm">
          ℹ️ {t("blog_posts_english_only")}
        </ScrollReveal>
      </div>
    </>
  );
};

export default BlogList;
