import type { FunctionalComponent } from "preact";

import { useLocation } from "wouter-preact";

import arrowBackIcon from "@/assets/icons/arrow_back.svg";
import calendarIcon from "@/assets/icons/calendar.svg";
import clockIcon from "@/assets/icons/clock.svg";
import { Icon } from "@/components/Icon";
import { Link } from "@/components/Link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslate } from "@/modules/i18n";

import { blogPostComponents, getBlogPost } from "./posts";

const BlogPost: FunctionalComponent = () => {
  const [location] = useLocation();
  const { t, l: lang } = useTranslate();

  const slug = location.split("/blog/")[1]?.replace("/", "");
  const MDXComponent = blogPostComponents[slug];

  if (!MDXComponent) {
    return (
      <div class="flex flex-col items-center px-6 py-16">
        <h1>{t("blog_post_not_found")}</h1>
      </div>
    );
  }

  const post = getBlogPost(slug, lang);

  return (
    <>
      <div class="flex flex-col gap-6 px-6 pt-16">
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
      <div class="px-6 pb-16 text-left text-sm sm:text-base md:max-w-prose md:self-center">
        <ScrollReveal class="prose" delay={5} forceVisible>
          <MDXComponent />
        </ScrollReveal>
        <ScrollReveal
          delay={1}
          as="p"
          class="mt-12 border-t border-white/50 pt-12 text-sm italic dark:border-zinc-600/50"
        >
          🏁 {t("blog_post_footer")}
        </ScrollReveal>
      </div>
    </>
  );
};

export default BlogPost;
