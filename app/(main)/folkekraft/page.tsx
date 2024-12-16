import React from "react";

//Components
import CampaignLayout from "./_components/CampaignLayout";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

const getCampaignData = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/campaign/670edfb1a444b509203c7cd7`
    );

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

  return <CampaignLayout campaignData={campaignData} />;
}
