import type { FunctionalComponent } from "preact";

import { useMemo } from "preact/hooks";

import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

import { getBlogPosts, type BlogPost } from "./posts";

const BlogList: FunctionalComponent = () => {
  const { t, l: lang } = useTranslate();

  const blogPosts: BlogPost[] = useMemo(() => getBlogPosts(lang), [lang]);

  return (
    <>
      <h1 class="pt-16">
        <ScrollReveal delay={1} as="span">
          {t("blog_page_title")}
        </ScrollReveal>
        <ScrollReveal delay={2} as="span">
          {t("blog_page_subtitle")}
        </ScrollReveal>
      </h1>
      <div class="flex flex-col items-center pb-16">
        <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 @3xl:max-w-4xl">
          {blogPosts.map((post: BlogPost) => (
            <ScrollReveal key={post.slug} delay={3} class="flex w-full">
              <Link useRouter href={`/blog/${post.slug}/`} class="group interactive-card w-full">
                <article>
                  <h2>{post.title}</h2>
                  <p class="mt-2 line-clamp-2 text-sm text-stone-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                  <div class="mt-3 inline-flex items-center justify-center gap-3 text-xs text-stone-500 dark:text-zinc-500">
                    <span class="flex items-center gap-1">
                      <Icon src={calendarIcon} class="size-3" aria-hidden="true" />
                      {post.date}
                    </span>
                    <span class="flex items-center gap-1">
                      <Icon src={clockIcon} class="size-3" aria-hidden="true" />
                      {t("blog_reading_time", { min: String(post.readingTime) })}
                    </span>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={4} class="mt-12 text-sm italic" as="p">
          {t("blog_posts_english_only")}
        </ScrollReveal>
      </div>
    </>
  );
};

export default BlogList;
