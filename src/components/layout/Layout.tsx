import { SiteHeader } from "./SiteHeader";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <SiteHeader />
      <main className="flex-1 container py-8 animate-fade-in">
        {children}
      </main>
      <footer className="border-t">
        <div className="container py-6 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Threat Guardian X</p>
          <nav aria-label="Footer" className="flex items-center gap-4">
            <a className="story-link" href="/about">About</a>
            <a className="story-link" href="/contact">Contact</a>
            <a className="story-link" href="/domain-scan">Domain Scan</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};
