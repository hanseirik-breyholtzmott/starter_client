"use client";

import { useRouter } from "next/navigation";
import InvestmentCard from "@/app/_components/InvestmentCard";
import { type InvestmentOpportunity } from "@/types/campaign";

interface CampaignGridProps {
  initialCampaigns: InvestmentOpportunity[];
}

export default function CampaignGrid({ initialCampaigns }: CampaignGridProps) {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    if (id === "672cbcce19b91a12e631f7f5") {
      router.push(`/folkekraft-group`);
    } else {
      router.push(`/folkekraft`);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {initialCampaigns.map((campaign) => (
        <div
          key={campaign.id}
          onClick={() => handleCardClick(campaign.id)}
          className="cursor-pointer"
        >
          <InvestmentCard opportunity={campaign} />
        </div>
      ))}
    </div>
  );
}
