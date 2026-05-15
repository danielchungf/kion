import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Author } from "@/lib/types";
import { colors, spacing } from "@/lib/tokens";

interface PageLayoutProps {
  children: ReactNode;
  activePage?: "index" | "ingredients";
  authors?: Author[];
  sourceUrl?: string;
}

export default function PageLayout({ children, activePage, authors, sourceUrl }: PageLayoutProps) {
  return (
    <div className={`min-h-screen ${colors.bg.page} overflow-x-hidden`}>
      <div className={spacing.page}>
        <Navigation activePage={activePage} />
        {children}
      </div>
      <Footer authors={authors} sourceUrl={sourceUrl} centered={Boolean(activePage)} />
    </div>
  );
}
