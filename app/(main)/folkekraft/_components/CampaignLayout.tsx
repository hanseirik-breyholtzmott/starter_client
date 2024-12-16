"use client";

import React, { useEffect } from "react";

//Context
import { useCampaign } from "@/app/hooks/CampaignContext";

//Components
import CampaignHeader from "./page/campaignHeader";
import Tabs from "./page/tabs";
import InvestButton from "./page/investButton";
import CampaignInfo from "./page/campaignInfo";

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
    <main className="min-h-[2000px] relative">
      <div className="container mx-auto w-full px-0 md:px-4 py-8">
        <CampaignHeader />
        <InvestButton />
        <CampaignInfo />
        <Tabs />
      </div>
    </main>
  );
}
