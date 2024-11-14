"use client";

import React from "react";

// Define props for MainContent, including children prop
interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 p-4 bg-background">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      {/* Render the dynamic content passed from children */}
      <div>{children}</div>
    </main>
  );
}
