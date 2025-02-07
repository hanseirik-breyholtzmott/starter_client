import React from "react";

//Context
import { InvestmentProvider } from "@/app/hooks/InvestContext";
import { CampaignProvider } from "@/app/hooks/CampaignContext";
//Components
import Navbar from "./_components/nav";
import Footer from "./_components/footer";

//Context

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CampaignProvider>
      <InvestmentProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </InvestmentProvider>
    </CampaignProvider>
  );
}
