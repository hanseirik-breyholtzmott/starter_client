import React from "react";
import Sidebar from "./_components/sidebar";
import Header from "./_components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex flex-col w-full pl-0 md:pl-24 lg:pl-64">
        <Header />
        <main className="bg-slate-50 p-4 mt-16 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
}
