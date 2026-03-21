import { ReactNode } from "react";
import Navigation from "./Navigation";
import { colors, spacing } from "@/lib/tokens";

interface PageLayoutProps {
  children: ReactNode;
  activePage?: "index" | "ingredients";
}

export default function PageLayout({ children, activePage }: PageLayoutProps) {
  return (
    <div className={`min-h-screen ${colors.bg.page} overflow-x-hidden`}>
      <div className={spacing.page}>
        <Navigation activePage={activePage} />
        {children}
      </div>
    </div>
  );
}
