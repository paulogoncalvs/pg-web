import axe from "axe-core";
import { JSDOM } from "jsdom";
import { render } from "preact-render-to-string";
import { App } from "@/App";
import routesConfig from "@/config/routes";

interface PageTestsOptions {
  name: string;
  route: string;
  storeData: PageStore;
}

const pageTests = ({ name, route, storeData }: PageTestsOptions): void => {
  if (!storeData) {
    return;
  }

  const originalWindowLocation = window.location;

  afterAll(() => {
    window.history.pushState({}, "", originalWindowLocation.pathname);
  });

  describe(`[PAGE CONTENT] ${name} Page`, () => {
    window.history.pushState({}, name, route);

    const container = render(<App store={storeData} />);

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

// Run
for (const pageKey of Object.keys(routesConfig)) {
  const name = routesConfig[pageKey].tests?.name;
  const storeData = routesConfig[pageKey].tests || {};

  if (name) {
    pageTests({
      name,
      route: pageKey,
      storeData,
    });
  }
}
