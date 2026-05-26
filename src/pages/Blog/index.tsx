import type { FunctionalComponent } from "preact";

import { useLocation } from "wouter-preact";

import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import { blogPath } from "./constants";

const BlogPage: FunctionalComponent = () => {
  const [location] = useLocation();

  const isPost = location.includes(blogPath) && !location.endsWith(blogPath);

  if (isPost) {
    return <BlogPost />;
  }

  return <BlogList />;
};

export default BlogPage;
