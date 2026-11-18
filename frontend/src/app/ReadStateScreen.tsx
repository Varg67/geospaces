import type { ReactNode } from "react";
export function ReadStateScreen({ children }: { children: ReactNode }) {
  return (
    <main id="workspace" className="boot-state" tabIndex={-1}>
      <div className="read-state">
        <h1>GeoSpace Companion</h1>
        {children}
      </div>
    </main>
  );
}
