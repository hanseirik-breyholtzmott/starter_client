import React from "react";

//Shadcn
import { Button } from "@/components/ui/button";

//Icons
import { Star, Share2 } from "lucide-react";

type CompanyInfo = {
  name: string;
  description: string;
  tags: string[];
};

type InvestmentDetails = {
  totalInvestments: number;
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

type Documents = {
  title: string;
  description: string;
  link: string;
};

type Campaign = {
  companyInfo: CompanyInfo;
  investmentDetails: InvestmentDetails;
  perks: Perk[];
  displayImages: DisplayImage[];
  documents: Documents[];
};

interface CampaignHeaderProps {
  campaignData: Campaign | null;
}

export default function CampaignHeader({ campaignData }: CampaignHeaderProps) {
  if (!campaignData) return <div>Loading...</div>;

  const { companyInfo, investmentDetails, perks, displayImages } = campaignData;

  return (
    <header className=" mb-4 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#00263D] text-white flex items-center justify-center font-bold rounded mr-2">
            F
          </div>
          <h1 className="text-3xl font-bold">{companyInfo.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Header Description */}
      <p className="text-gray-600 mb-4">
        {campaignData.companyInfo.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
        {campaignData.companyInfo.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm whitespace-nowrap uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
}
