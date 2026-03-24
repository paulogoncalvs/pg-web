if (typeof window !== "undefined") {
  const mockQuery = (query: string) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  });

  window.matchMedia = vi.fn(mockQuery) as (query: string) => MediaQueryList;
}
