"use client";

import React, { useState } from "react";
import { useCampaign } from "@/app/hooks/CampaignContext";

//Shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Icons
import { Star, Share2, Facebook, Linkedin, Mail } from "lucide-react";

export default function CampaignHeader() {
  const { campaign } = useCampaign();
  const [isFavorite, setIsFavorite] = useState(false);

  if (!campaign) return null;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      action: () =>
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`,
          "_blank"
        ),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () =>
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            window.location.href
          )}`,
          "_blank"
        ),
    },
    {
      name: "Email",
      icon: Mail,
      action: () =>
        (window.location.href = `mailto:?subject=Check out Folkekraft AS&body=${encodeURIComponent(
          window.location.href
        )}`),
    },
  ];

  return (
    <header className="mb-4 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#00263D] text-white flex items-center justify-center font-bold rounded mr-2">
            F
          </div>
          <h1 className="text-3xl font-bold">{campaign.campaignInfo.name}</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleFavorite}>
            <Star
              className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                isFavorite ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {shareOptions.map((option) => (
                <DropdownMenuItem key={option.name} onClick={option.action}>
                  <option.icon className="mr-2 h-4 w-4" />
                  <span>Share on {option.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Header Description */}
      <p className="text-gray-600 mb-4 mt-2">
        {campaign.campaignInfo.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
        {campaign.campaignInfo.tags.map((tag) => (
          <Badge
            variant="secondary"
            key={tag}
            className="rounded-full px-4 py-1 uppercase transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </header>
  );
}
