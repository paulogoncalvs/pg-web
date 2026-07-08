import type { FunctionalComponent } from "preact";

import { useCallback, useMemo, useRef, useEffect, useState } from "preact/hooks";
import { useSearchParams } from "wouter-preact";

import { BlogMeta } from "@/components/BlogMeta";
import { Link } from "@/components/Link";
import { PageHeading } from "@/components/PageHeading";
import { Pagination } from "@/components/Pagination";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tag } from "@/components/Tag";
import { useTranslate } from "@/modules/i18n";

import { getBlogPosts } from "./posts";

const POSTS_PER_PAGE = 4;

const BlogList: FunctionalComponent = () => {
  const { t, l: lang } = useTranslate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const postsRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const blogPosts = useMemo(() => getBlogPosts(lang), [lang]);

  const selectedTag = useMemo(() => searchParams.get("tag") || null, [searchParams]);

  const currentPage = useMemo(() => {
    const page = Number.parseInt(searchParams.get("page") ?? "1", 10);
    return Number.isNaN(page) ? 1 : page;
  }, [searchParams]);

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

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const handleTagChange = useCallback(
    (event: Event) => {
      const tag = (event.currentTarget as HTMLSelectElement).value;

      updateSearchParams({
        tag: tag || null,
        page: null,
      });
    },
    [updateSearchParams],
  );

  const handleSortChange = useCallback(
    (event: Event) => {
      setSortOrder((event.currentTarget as HTMLSelectElement).value as "newest" | "oldest");

      updateSearchParams({
        page: null,
      });
    },
    [updateSearchParams],
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
                    id="tag-filter"
                    value={selectedTag ?? ""}
                    onChange={handleTagChange}
                    class="w-auto cursor-pointer capitalize"
                    aria-label={t("blog_filter_tag")}
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
                  id="sort-order"
                  value={sortOrder}
                  onChange={handleSortChange}
                  class="w-auto cursor-pointer"
                  aria-label={t("blog_sort_label")}
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
              <Link useRouter href={`/blog/${post.slug}/`} class="group interactive-card w-full">
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
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {totalPages > 1 && (
          <ScrollReveal
            key={`pagination-${selectedTag ?? "all"}-${sortOrder}-${safeCurrentPage}`}
            direction="up"
            delay={1}
          >
            <Pagination totalPages={totalPages} />
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
