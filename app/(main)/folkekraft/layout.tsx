import React from "react";

//Context
import { InvestmentConfirmationProvider } from "@/app/hooks/InvestmentConfirmationContext";

//Components
import Navbar from "./_components/nav";
import Footer from "./_components/footer";

export default function CampaignLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <InvestmentConfirmationProvider>
      <Navbar />
      {children}
      <Footer />
    </InvestmentConfirmationProvider>
  );
}
