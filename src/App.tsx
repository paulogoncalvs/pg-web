import type { FunctionalComponent, JSX } from "preact";

import { Route, Router } from "wouter-preact";
import { memoryLocation } from "wouter-preact/memory-location";

import { BannerStack } from "@/components/BannerStack";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { GA4Provider } from "@/components/GA4Provider";
import { Header } from "@/components/Header";
import { HeadUpdater } from "@/components/HeadUpdater";
import { OverlayWithStore } from "@/components/Overlay";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SideDrawer } from "@/components/SideDrawer";
import { RouterOnChange } from "@/modules/router";
import { StoreContextProvider } from "@/modules/store";

const DEFAULT_STORE: PageStore = {};

interface AppProps {
  store?: PageStore;
  routerPage?: (url: string) => JSX.Element;
}

export const App: FunctionalComponent<AppProps> = ({
  store = DEFAULT_STORE,
  routerPage,
}): JSX.Element => {
  const routerHook =
    typeof window === "undefined" && store.url
      ? memoryLocation({ path: store.url, static: true }).hook
      : undefined;

  return (
    <StoreContextProvider store={store}>
      <BannerStack />
      <Router hook={routerHook} ssrPath={store.url}>
        <HeadUpdater />
        <RouterOnChange />
        <div class="flex min-h-screen flex-col">
          <Header />
          <SideDrawer />
          <ErrorBoundary>
            <main class="@container flex flex-1 flex-col space-y-16 px-6 text-center">
              {routerPage ? (
                <Route path="*">
                  {(params): JSX.Element => routerPage(params["*"] ? `/${params["*"]}` : "/")}
                </Route>
              ) : null}
            </main>
          </ErrorBoundary>
          <Footer />
        </div>
      </Router>
      <ScrollToTop />
      <GA4Provider />
      <OverlayWithStore />
    </StoreContextProvider>
  );
};
