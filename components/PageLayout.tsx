import { ReactNode } from "react";
import Navigation from "./Navigation";

interface PageLayoutProps {
  children: ReactNode;
  activePage?: "index" | "ingredients";
}

export default function PageLayout({ children, activePage }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/watercolor-background.jpg')" }}
      />
      <div className="relative px-5 md:px-[90px] py-[60px]">
        <Navigation activePage={activePage} />
        {children}
      </div>
    </div>
  );
}
