"use client";

import React, { useState } from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import MainContent from "./_components/MainContent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
