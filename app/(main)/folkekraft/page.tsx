import React from "react";

//NextJS

//Components
import CampaignHeader from "./_components/page/campaignHeader";
import CampaignInfo from "./_components/page/campaignInfo";
import Tabs from "./_components/page/tabs";
import InvestButton from "./_components/page/investButton";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

// Define the types for the API response
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
  name: string;
  actionText: string;
  boldText: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
};

type DisplayImage = {
  image: string;
  alt: string;
};

type Campaign = {
  companyInfo: CompanyInfo;
  investmentDetails: InvestmentDetails;
  perks: Perk[];
  displayImages: DisplayImage[];
};

type Caplist = {
  investors: any[]; // Replace with a more specific type if available
};

const getCampaignData = async () => {
  try {
    const response = await axiosInstance.get("/api/campaign/1");

    if (response.status != 200) {
      console.log("Failed to fetch data");
      throw new Error("Failed to fetch data");
    } else {
      console.log("Data fetched successfully");
    }

    const data = response.data;

    console.log(data);

    return {
      campaign: data.campaign,
      caplist: data.caplist,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function CampaignPage() {
  const campaignData = await getCampaignData();

  console.log(campaignData);

  if (!campaignData) {
    return <div>Error loading campaign data</div>;
  }

  return (
    <main className="min-h-[2000px] relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <CampaignHeader campaignData={campaignData.campaign} />

        {/* Invest Button */}
        <InvestButton />

        {/* Main Carousel */}
        <CampaignInfo campaignData={campaignData.campaign} />

        {/* Tabs */}
        <Tabs />
      </div>
    </main>
  );
}
