import type { FunctionalComponent } from "preact";

import axe from "axe-core";
import { JSDOM } from "jsdom";
import { render } from "preact-render-to-string";

interface PageTestsOptions {
  name: string;
  route: string;
  Component: FunctionalComponent;
}

const pageTests = ({ name, route, Component }: PageTestsOptions): void => {
  describe(`[PAGE CONTENT] ${name} Page`, () => {
    window.history.pushState({}, name, route);

    const container = render(<Component />);

    it("should render", async () => {
      expect(container).toMatchSnapshot();
    });

    it("should not have axe violations", async () => {
      const dom = new JSDOM();
      dom.window.document.body.innerHTML = container;
      const results = await axe.run(dom.window.document);

      const relevantViolations = results.violations.filter(
        (v: { id: string }) => !["html-has-lang", "document-title"].includes(v.id),
      );

      expect(relevantViolations.length).toBe(0);
    });
  });
};

const testableRoutes: PageTestsOptions[] = [
  { name: "Home", route: "/", Component: (await import("@/pages/Home")).default },
  { name: "Contact", route: "/contact/", Component: (await import("@/pages/Contact")).default },
  { name: "Offline", route: "/offline/", Component: (await import("@/pages/Offline")).default },
  { name: "404", route: "/404/", Component: (await import("@/pages/NotFound")).default },
];

for (const routeConfig of testableRoutes) {
  pageTests(routeConfig);
}
