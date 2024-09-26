"use client";

import React, { useState } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Icons
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Copy } from "lucide-react";

//Helper functions
import {
  handleCopy,
  formatCurrency,
  calculateDaysRemaining,
  formatDateString,
} from "@/lib/helperFunctions";

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

export default function CampaignInfo({ campaignData }: CampaignHeaderProps) {
  //useState
  const [isCopied, setIsCopied] = useState(false);

  if (!campaignData) {
    return <div>No campaign data available</div>;
  }

  //Contants
  const { companyInfo, investmentDetails, perks, displayImages } = campaignData;

  const urlToShare = "https://invest.folkekraft.no/emisjon"; // The URL you want to share
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    urlToShare
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    urlToShare
  )}`;

  //Functions
  const copyToClipboard = async () => {
    console.log("copying to clipboard");
    const success = await handleCopy(urlToShare);
    if (success) {
      console.log("copied to clipboard");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      <div className="flex-1">
        <div className="bg-gray-900 text-white rounded-lg mb-4 w-full h-full flex items-center justify-end">
          {/* Image */}
          <div className="w-full h-[520px] relative overflow-hidden rounded-xl">
            <iframe
              src="https://player.vimeo.com/video/1007463389?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              style={{ border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Vi har ikke vært gode nok"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
      {/* CAMPAGN INFO */}
      <div className="flex-1 ">
        <div className="bg-white p-8 rounded-xl mb-4 shadow-xl shadow-slate-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-500 font-bold">&#128640; EMISJON</span>
            <Popover>
              <PopoverTrigger>
                <span className=" p-3 px-5 hover:bg-gray-300 bg-gray-100 rounded-lg">
                  i
                </span>
              </PopoverTrigger>
              <PopoverContent>
                Verdsettelsen er pre-money og baserer seg på en nedprising fra
                kr 12 til kr 8 per aksje i forbindelse med emisjonen. Dette
                fører til en justering av verdien fra 32,5 millioner kr til 21,7
                mill. kr. Fremtidig verdsettelse vil bli beregnet basert på
                multippelanalyse av både omsetning og EBITDA, som reflekterer
                selskapets vekstpotensial og lønnsomhet.
              </PopoverContent>
            </Popover>
          </div>
          <h3 className="text-4xl font-bold my-4 ">
            {formatCurrency(investmentDetails.totalInvestedAmount, 0, false)}
          </h3>
          <p className="text-gray-600 mb-2">
            {investmentDetails.sharesPurchasedInPercent} % samlet inn av
            maksbeløpet på 8 millioner
          </p>
          <Progress
            value={investmentDetails.sharesPurchasedInPercent}
            className="mb-4"
          />
          <div className="grid grid-cols-2 gap-4 my-4 py-8 rounded-lg">
            <div>
              <h4 className="text-3xl font-bold">
                {investmentDetails.totalInvestments}
              </h4>
              <p className="text-gray-600">Antall investeringer</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">
                {calculateDaysRemaining(
                  campaignData.investmentDetails.closingDate as string
                )}
              </h4>
              <p className="text-gray-600">igjen for å investere</p>
            </div>
          </div>

          <Link href="/folkekraft/invest">
            <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-16 hidden md:block">
              Invester i Folkekraft
            </Button>
          </Link>
          <p className="text-center text-gray-600 mt-2 hidden md:block">
            Minstetegning er{" "}
            <strong>
              {formatCurrency(investmentDetails.minimumInvestment, 0, false)}
            </strong>
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-8">
            <div className="w-full">
              <Link href="/bestill">
                <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-lg h-12">
                  Bli Folkekraft kunde
                </Button>
              </Link>
            </div>
            <div className="w-full">
              <Popover>
                <PopoverTrigger className="w-full  text-white text-lg h-12">
                  <div className="w-full text-semibold bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-lg h-12 rounded-md flex items-center justify-center">
                    Del Folkekraft
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <ul className="flex flex-col gap-2">
                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base flex flex-row items-center gap-2">
                        <FaFacebook className="text-blue-600 text-xl" />
                        Facebook
                      </li>
                    </a>
                    <a
                      href={linkedInShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base flex flex-row items-center gap-2">
                        <FaLinkedin className="text-blue-800 text-xl" />
                        LinkedIn
                      </li>
                    </a>
                    <li className="w-full">
                      <button
                        className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base w-full text-left flex flex-row items-center gap-2"
                        onClick={copyToClipboard}
                        type="button"
                      >
                        <Copy className="text-blue-600 text-xl" />
                        {isCopied ? "Kopiert!" : "Kopier lenke"}
                      </button>
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
