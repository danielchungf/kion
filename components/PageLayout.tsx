import { ReactNode } from "react";
import Navigation from "./Navigation";
import { colors, spacing } from "@/lib/tokens";

interface PageLayoutProps {
  children: ReactNode;
  activePage?: "index" | "ingredients";
}

export default function PageLayout({ children, activePage }: PageLayoutProps) {
  return (
    <div className={`relative min-h-screen ${colors.bg.page} overflow-x-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/watercolor-background.jpg')" }}
      />
      <div className={`relative ${spacing.page}`}>
        <Navigation activePage={activePage} />
        {children}
      </div>
    </div>
  );
}
