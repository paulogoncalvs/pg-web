import type { FunctionalComponent } from "preact";

import { useLocation } from "wouter-preact";

import BlogList from "./BlogList";
import BlogPost from "./BlogPost";

const BlogPage: FunctionalComponent = () => {
  const [location] = useLocation();

  const isPost = location.includes("/blog/") && !location.endsWith("/blog/");

  if (isPost) {
    return <BlogPost />;
  }

  return <BlogList />;
};

export default BlogPage;
