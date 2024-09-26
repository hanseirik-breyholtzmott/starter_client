"use client";

import React, { useState } from "react";

//Shadcn
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//Components
import Investments from "./investments";
import InvestmentSummary from "./investmentSummary";
import InvestmentTracker from "./investmentTracker";
import InvestmentTransactions from "./investmentTransactions";

//Data
const tabsData = [
  { id: "investments", label: "Investeringer", count: 1 },
  { id: "summary", label: "Oppsummering", count: null },
  //{ id: "tracker", label: "Tracker", count: null },
  { id: "transactions", label: "Transaksjoner", count: null },
];

//Icons
import { Mail } from "lucide-react";

interface ShareDetails {
  total: number; // Total number of shares
  shares: number; // Total number of shares
  value: number; // Current value of the shares
}

interface CurrentValue {
  totalAmount: number; // Total current value of all shares
  percentageChange: number; // Percentage change in value from initial investment
}

interface Investments {
  totalShares: number; // Total number of shares acquired from investments
  totalValue: number; // Total current value of those shares
  customerShares: ShareDetails; // Details of customer-owned shares
  referralShares: ShareDetails; // Details of referral-acquired shares
}

interface PortfolioSummary {
  investorSharesValue: number; // Total value of investor-acquired shares
  customerSharesValue: number; // Total value of customer-owned shares
  referralSharesValue: number; // Total value of shares acquired from referrals
  accountDetails: any[]; // Array of account data for further details
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  // Add more fields as necessary based on your transaction structure
}

// Main data structure interface
interface Data {
  totalInvested: number; // Total amount invested by the user
  totalShares: number; // Total number of shares owned by the user
  currentValue: CurrentValue; // Current value of the shares and percentage change
  investments: Investments; // Investment details including shares and values
  portfolioSummary: PortfolioSummary; // Summary of the user's portfolio
  transactions: Transaction[];
  referralLink: string; // Array of user transaction details
}

type Props = {
  portfolioData: Data;
  portfolioSummary: PortfolioSummary;
  transactions: Transaction[];
};

export default function PortfolioLayout({
  portfolioData,
  portfolioSummary,
  transactions,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>("investments");
  return (
    <section className="container mx-auto">
      <Tabs
        defaultValue="investments"
        onValueChange={setActiveTab}
        className="w-full sm:w-auto"
      >
        <div className="text-7xl font-black mt-8">
          <h1>Min portefølje</h1>
        </div>
        <TabsList className="h-auto p-0 bg-transparent flex flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
          <div className="flex flex-row gap-8">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                  activeTab === tab.id &&
                    "active:text-[#00263D] border-[#59C9B9]"
                )}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </div>
          <a
            href="mailto:lg@folkekraft.no"
            className="flex items-center text-xl text-gray-500 hover:text-gray-700"
          >
            <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
            Spørsmål?
          </a>
        </TabsList>
        <TabsContent value="investments">
          <Investments portfolioData={portfolioData} />
        </TabsContent>
        <TabsContent value="summary">
          <InvestmentSummary
            portfolioSummary={portfolioSummary}
            currentValue={portfolioData.currentValue.totalAmount}
            percentageChange={portfolioData.currentValue.percentageChange}
          />
        </TabsContent>
        {/*<TabsContent value="tracker">
          <InvestmentTracker />
        </TabsContent>*/}
        <TabsContent value="transactions">
          <InvestmentTransactions transactions={transactions} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
