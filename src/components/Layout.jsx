import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import React from "react";
import SEOHead from "./SEOHead";
import { useMobile } from "../hooks/use-mobile";

export default function Layout({ children }) {
  const isMobile = useMobile();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className={`${isMobile ? 'block' : 'grid grid-cols-12 gap-8'}`}>
          <main className={`${isMobile ? 'mb-8' : 'col-span-8'}`}>
            {children}
          </main>
          <aside className={`${isMobile ? '' : 'col-span-4'}`}>
            <Sidebar />
          </aside>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}