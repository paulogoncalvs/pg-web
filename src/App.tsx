import type { FunctionalComponent, JSX } from "preact";

import { Route, Router } from "wouter-preact";
import { memoryLocation } from "wouter-preact/memory-location";

import { CookieConsentBar } from "@/components/CookieConsentBar";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/Footer";
import { GA4Provider } from "@/components/GA4Provider";
import { Header } from "@/components/Header";
import { HeadUpdater } from "@/components/HeadUpdater";
import { Overlay } from "@/components/Overlay";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SideDrawer } from "@/components/SideDrawer";
import { RouterOnChange } from "@/modules/router";
import { RouterPage } from "@/modules/router/pages";
import { StoreContextProvider } from "@/modules/store";

const DEFAULT_STORE: PageStore = {};

interface AppProps {
  store?: PageStore;
}

export const App: FunctionalComponent<AppProps> = ({ store = DEFAULT_STORE }): JSX.Element => {
  const routerHook =
    typeof window === "undefined" && store.url
      ? memoryLocation({ path: store.url, static: true }).hook
      : undefined;

  return (
    <StoreContextProvider store={store}>
      <Router hook={routerHook} ssrPath={store.url}>
        <HeadUpdater />
        <RouterOnChange />
        <div class="flex min-h-screen flex-col">
          <Header />
          <SideDrawer />
          <ErrorBoundary>
            <main class="flex flex-1 flex-col space-y-16 text-center">
              <Route path="*">
                {(params): JSX.Element => RouterPage(params["*"] ? `/${params["*"]}` : "/")}
              </Route>
            </main>
          </ErrorBoundary>
          <Footer />
        </div>
      </Router>
      <ScrollToTop />
      <CookieConsentBar />
      <GA4Provider />
      <Overlay />
    </StoreContextProvider>
  );
};
