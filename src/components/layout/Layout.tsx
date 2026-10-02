import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SkipLink } from "../common/SkipLink";
import { useLocation } from "@/lib/router-hooks";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-charcoal-900">
      <SkipLink />
      <Header overlayHero={isHome} />
      <main id="main-content" className={`flex-grow ${isHome ? "pt-0" : "pt-24 md:pt-32"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
