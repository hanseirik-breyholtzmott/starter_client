import React from "react";

//NextJS
import dynamic from "next/dynamic";

//Components
import CampaignHeader from "./_components/page/campaignHeader";
import Tabs from "./_components/page/tabs";
import InvestButton from "./_components/page/investButton";

//Dynamic imports
const CampaignInfo = dynamic(() => import("./_components/page/campaignInfo"));

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

const getCampaignData = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/campaign/670edfb1a444b509203c7cd7`
    );

    console.log("API Response:", {
      status: response.status,
      data: JSON.stringify(response.data, null, 2),
    });

    if (response.status != 200) {
      console.log("Failed to fetch data");
      throw new Error("Failed to fetch data");
    }

    const data = response.data;
    return {
      campaign: data.campaign,
      caplist: data.caplist,
    };
  } catch (error) {
    console.error("API Error:", error);
  }
};

export default async function CampaignPage() {
  const campaignData = await getCampaignData();

  if (!campaignData) {
    return <div>Error loading campaign data</div>;
  }

  return (
    <main className="min-h-[2000px] relative">
      <div className="container mx-auto w-full px-0 md:px-4 py-8">
        {/* Header */}
        <CampaignHeader campaignData={campaignData.campaign} />

        {/* Invest Button */}
        <InvestButton />

        {/* Main Carousel */}
        <CampaignInfo
          campaignData={campaignData.campaign}
          totalInvestments={campaignData.caplist.totalInvestments}
          totalInvested={campaignData.caplist.totalInvested}
        />

        {/* Tabs */}
        <Tabs
          caplist={campaignData.caplist.investors}
          documents={campaignData.campaign.documents}
          perks={campaignData.campaign.perks}
        />
      </div>
    </main>
  );
}
