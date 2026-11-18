import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
afterEach(cleanup);

// jsdom has no layout engine; browser checks exercise the real observer.
globalThis.ResizeObserver = class implements ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: { width: 1000, height: 540 },
        } as ResizeObserverEntry,
      ],
      this,
    );
  }
  unobserve() {}
  disconnect() {}
};
