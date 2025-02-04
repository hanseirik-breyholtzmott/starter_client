"use client";

import React from "react";
import Footer from "./Footer";

// Define props for MainContent, including children prop
interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="bg-[#F1F2F6] overflow-y-auto">
      {/* Render the dynamic content passed from children */}
      <div className="container mx-auto md:px-12 px-4 py-12 flex flex-col ">
        {children}
      </div>
      <Footer />
    </main>
  );
}
