import React from "react";

//Context
import { InvestmentConfirmationProvider } from "@/app/hooks/InvestmentConfirmationContext";
import { InvestmentProvider } from "@/app/hooks/InvestContext";
import { CompanyDataProvider } from "@/app/hooks/CompanyDataContext";

//Components
import Navbar from "./_components/nav";
import Footer from "./_components/footer";

export default function CampaignLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyDataProvider>
      <InvestmentProvider>
        <InvestmentConfirmationProvider>
          <Navbar />
          {children}
          <Footer />
        </InvestmentConfirmationProvider>
      </InvestmentProvider>
    </CompanyDataProvider>
  );
}
