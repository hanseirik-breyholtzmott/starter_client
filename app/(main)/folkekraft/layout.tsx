import React from "react";

//Context
import { InvestmentConfirmationProvider } from "@/app/hooks/InvestmentConfirmationContext";
import { InvestmentProvider } from "@/app/hooks/InvestContext";
import { CompanyDataProvider } from "@/app/hooks/CompanyDataContext";

//Components
import Navbar from "./_components/nav";
import Footer from "./_components/footer";

export default function CampaignLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyDataProvider>
      <InvestmentProvider>
        <InvestmentConfirmationProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </InvestmentConfirmationProvider>
      </InvestmentProvider>
    </CompanyDataProvider>
  );
}
