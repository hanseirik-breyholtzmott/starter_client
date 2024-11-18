"use client";

import React, { useState } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//Icons
import { Mail } from "lucide-react";

//TabComponents
import About from "./about";
import CapList from "./caplist";
import Team from "./team";
import Documents from "./documents";
import FundingVideo from "./fundingVideo";

//Data
const tabsData = [
  { id: "about", label: "Beskrivelse", count: null },
  //{ id: "emisjon", label: "Emisjonsnytt", count: 1 },
  //{ id: "caplist", label: "Aksjeeiebok", count: null },
  { id: "team", label: "Team", count: null },
  { id: "documents", label: "Dokumenter", count: null },
];

type Props = {};

type CompanyInfo = {
  name: string;
  description: string;
  tags: string[];
};

type InvestmentDetails = {
  totalInvestors: number;
  totalInvestedAmount: number;
  minimumInvestment: number;
  sharesPurchasedInPercent: number;
  status: string;
  closingDate: string | null;
};

type Perk = {
  title: string;
  actionText: string;
  boldText: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
};

type Documents = {
  title: string;
  description: string;
  fileName: string;
  url: string;
};

type Investor = {
  userId: string;
  totalShares: number;
  name: string;
  email: string;
  percentageOwnership: number;
};

type Caplist = Investor[];

interface CaplistProps {
  caplist: Caplist; // Add this line
  documents: Documents[];
  perks: Perk[];
}

export default function TabsComponent({
  caplist,
  documents,
  perks,
}: CaplistProps) {
  //useState
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="w-full container mx-auto">
      <div className="flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="h-auto p-0 bg-transparent flex flex-col lg:flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
            <div className="flex flex-col lg:flex-row gap-8">
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
            <Link
              href="mailto:lg@folkekraft.no"
              className="flex items-center text-xl text-gray-500 hover:text-gray-700"
            >
              <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
              Spørsmål?
            </Link>
          </TabsList>
          <TabsContent value="about">
            <About perks={perks} />
          </TabsContent>
          <TabsContent value="emisjon">
            <FundingVideo perks={perks} />
          </TabsContent>
          {/*<TabsContent value="caplist">
            <CapList caplist={caplist} perks={perks} />
          </TabsContent>*/}
          <TabsContent value="team">
            <Team perks={perks} />
          </TabsContent>
          <TabsContent value="documents">
            <Documents documents={documents} perks={perks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
