import type { ComponentType, FunctionalComponent } from "preact";

import { useState, useEffect } from "preact/hooks";
import { useLocation } from "wouter-preact";

import arrowBackIcon from "@/assets/icons/arrow_back.svg";
import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

import { blogPostLoaders, getCachedBlogPostComponent, getBlogPost } from "./posts";

function useMDXComponent(slug: string | undefined): {
  Component: ComponentType | null;
  loading: boolean;
} {
  const [state, setState] = useState<{
    Component: ComponentType | null;
    loading: boolean;
  }>(() => {
    if (!slug) {
      return { Component: null, loading: false };
    }
    const cached = getCachedBlogPostComponent(slug);
    return { Component: cached ?? null, loading: !cached };
  });

  useEffect(() => {
    if (!slug) {
      setState({ Component: null, loading: false });
      return;
    }

    const cached = getCachedBlogPostComponent(slug);
    if (cached) {
      setState({ Component: cached, loading: false });
      return;
    }

    const loader = blogPostLoaders[slug];
    if (!loader) {
      setState({ Component: null, loading: false });
      return;
    }

    setState({ Component: null, loading: true });

    let current = true;
    loader().then((mod) => {
      if (current) {
        setState({ Component: mod.default, loading: false });
      }
    });

    return () => {
      current = false;
    };
  }, [slug]);

  return state;
}

interface BlogPostProps {
  MDXComponent?: ComponentType;
}

const BlogPost: FunctionalComponent<BlogPostProps> = (props) => {
  const [location] = useLocation();
  const { t, l: lang } = useTranslate();

  const slug = location.split("/blog/")[1]?.replace("/", "");
  const { Component: lazyComponent, loading } = useMDXComponent(slug);
  const post = slug ? getBlogPost(slug, lang) : undefined;

  const MDXComponent = props.MDXComponent ?? lazyComponent;
  const isLoading = loading && !props.MDXComponent;

  if (!slug && !isLoading) {
    return (
      <div class="flex flex-col items-center px-6 py-16">
        <h1>{t("blog_post_not_found")}</h1>
      </div>
    );
  }

  return (
    <>
      <div class="flex flex-col gap-5 pt-16">
        <h1>
          <ScrollReveal delay={1} as="span" class="block">
            {post?.title}
          </ScrollReveal>
          <ScrollReveal delay={2} as="span">
            {post?.description}
          </ScrollReveal>
        </h1>

        <ScrollReveal
          delay={3}
          as="div"
          class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base text-stone-600 dark:text-zinc-400"
        >
          <span class="flex items-center gap-2">
            <Icon src={calendarIcon} class="size-4" aria-hidden="true" />
            {post?.date}
          </span>
          <span class="flex items-center gap-2">
            <Icon src={clockIcon} class="size-4" aria-hidden="true" />
            {t("blog_reading_time", { min: String(post?.readingTime ?? 0) })}
          </span>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={3.5}>
          <Link useRouter href="/blog/" class="interactive interactive-icon interactive-sm">
            <Icon src={arrowBackIcon} class="size-3" aria-hidden />
            {t("blog_back_link")}
          </Link>
        </ScrollReveal>
      </div>
      <div class="pb-16 text-left text-sm sm:text-base @3xl:max-w-prose @3xl:self-center">
        {MDXComponent ? (
          <>
            <ScrollReveal class="prose" delay={5}>
              <MDXComponent />
            </ScrollReveal>
            <ScrollReveal
              delay={1}
              as="p"
              class="mt-12 border-t border-white/50 pt-12 text-sm italic dark:border-zinc-600/50"
            >
              🏁 {t("blog_post_footer")}
            </ScrollReveal>
          </>
        ) : isLoading ? (
          <div class="relative min-h-[60dvh]">
            <ScrollReveal delay={3} class="flex flex-col gap-3">
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-5/6 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-2/3 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-3/4 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-11/12 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-3/4 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-5/6 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-2/3 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-7/8 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-5/6 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-3/4 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-11/12 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-11/12 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-3/4 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-5/6 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-2/3 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-7/8 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-5/6 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-3/4 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-11/12 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-full animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
              <div class="h-4 w-4/5 animate-pulse rounded bg-stone-400/60 dark:bg-zinc-600/60" />
            </ScrollReveal>
          </div>
        ) : (
          <div class="flex flex-col items-center">
            <h1>{t("blog_post_not_found")}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
