import type { FunctionalComponent } from "preact";

import { useLocation } from "wouter-preact";

import BlogList from "./BlogList";
import BlogPost from "./BlogPost";

const BlogPage: FunctionalComponent = () => {
  const [location] = useLocation();

  const path = location.split("?")[0];
  const isPost =
    path.includes("/blog/") && !path.endsWith("/blog/") && !path.includes("/blog/page/");

  if (isPost) {
    return <BlogPost />;
  }

  return <BlogList />;
};

export default BlogPage;
