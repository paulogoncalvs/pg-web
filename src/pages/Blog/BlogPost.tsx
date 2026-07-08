import type { ComponentType, FunctionalComponent } from "preact";

import { useState, useEffect } from "preact/hooks";
import { useLocation } from "wouter-preact";

import arrowBackIcon from "@/assets/icons/arrow_back.svg";
import { BlogMeta } from "@/components/BlogMeta";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { PageHeading } from "@/components/PageHeading";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Tag } from "@/components/Tag";
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

    const loadingTimer = setTimeout(() => {
      setState({ Component: null, loading: true });
    }, 200);

    let current = true;
    loader().then((mod) => {
      if (current) {
        clearTimeout(loadingTimer);
        setState({ Component: mod.default, loading: false });
      }
    });

    return () => {
      current = false;
      clearTimeout(loadingTimer);
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
        <PageHeading title={post?.title} subtitle={post?.description} titleClass="block" class="" />

        <ScrollReveal as="div" delay={1}>
          <BlogMeta date={post?.date ?? ""} readingTime={post?.readingTime ?? 0} size="base" />
        </ScrollReveal>
        {post?.tags && post.tags.length > 0 && (
          <div class="flex flex-wrap items-center justify-center gap-1.5">
            {post.tags.map((tag, index) => (
              <ScrollReveal delay={0.5 * index} key={tag}>
                <Tag key={"tag-" + tag} tag={tag} />
              </ScrollReveal>
            ))}
          </div>
        )}
        <ScrollReveal direction="up" delay={1}>
          <Link
            href="/blog/"
            onClick={(e) => {
              e.preventDefault();
              history.back();
            }}
            class="interactive interactive-icon interactive-sm"
          >
            <Icon src={arrowBackIcon} class="size-3" aria-hidden />
            {t("blog_back_link")}
          </Link>
        </ScrollReveal>
      </div>
      <div class="pb-16 text-left text-sm sm:text-base @3xl:max-w-prose @3xl:self-center">
        {MDXComponent ? (
          <>
            <ScrollReveal class="prose" delay={1}>
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
              {[
                "w-full",
                "w-5/6",
                "w-2/3",
                "w-4/5",
                "w-3/4",
                "w-full",
                "w-11/12",
                "w-3/4",
                "w-full",
                "w-5/6",
                "w-4/5",
                "w-full",
                "w-2/3",
                "w-7/8",
                "w-full",
                "w-5/6",
                "w-3/4",
                "w-11/12",
                "w-full",
                "w-4/5",
                "w-full",
                "w-11/12",
                "w-3/4",
                "w-full",
                "w-5/6",
                "w-4/5",
                "w-full",
                "w-2/3",
                "w-7/8",
                "w-full",
                "w-5/6",
                "w-3/4",
                "w-11/12",
                "w-full",
                "w-4/5",
              ].map((w, i) => (
                <div
                  key={`blog-post-sklt-${i + 1}`}
                  class={`h-4 ${w} animate-pulse rounded-sm bg-stone-400/60 dark:bg-zinc-600/60`}
                />
              ))}
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
