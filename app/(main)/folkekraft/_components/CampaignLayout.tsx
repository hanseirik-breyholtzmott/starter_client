"use client";

import React, { useEffect } from "react";

//Context
import { useCampaign } from "@/app/hooks/CampaignContext";

//Components
import CampaignHeader from "./page/campaignHeader";
import Tabs from "./page/tabs";
import InvestButton from "./page/investButton";
import CampaignInfo from "./page/campaignInfo";
import TabInterface from "./TabInterface";

type Props = {
  campaignData: any;
};

export default function CampaignLayout({ campaignData }: Props) {
  const { setCampaign, setCaplist } = useCampaign();

  useEffect(() => {
    // Set initial data immediately without loading state
    setCampaign(campaignData.campaign);
    setCaplist(campaignData.caplist);
  }, []);

  return (
    <main className="min-h-screen relative">
      <div className="container mx-auto w-full px-0 md:px-4 py-8 h-full">
        <CampaignHeader />
        <InvestButton />
        <CampaignInfo />
        <TabInterface />
      </div>
    </main>
  );
}
