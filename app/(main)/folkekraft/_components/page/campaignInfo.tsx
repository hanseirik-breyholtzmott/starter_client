"use client";

import React, { useState } from "react";

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
import { handleCopy } from "@/lib/helperFunctions";

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

interface CampaignHeaderProps {
  campaignData: Campaign | null;
}

export default function campaignInfo({ campaignData }: CampaignHeaderProps) {
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
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="bg-gray-900 text-white  rounded-lg mb-4 max-w-[650px] max-h-[520px] w-full h-full">
          {/* Video */}
          <Carousel className="max-w-[650px] max-h-[520px] w-full h-full">
            <CarouselContent className=" h-[520px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className="p-1 h-full">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-center p-6 h-full">
                        <span className="text-6xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
        </div>
        {/* Litte Carousel */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm hidden md:block"
        >
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
                Place content for the popover here.
              </PopoverContent>
            </Popover>
          </div>
          <h3 className="text-4xl font-bold my-4 ">4 200 000 kr</h3>
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
                {investmentDetails.totalInvestors}
              </h4>
              <p className="text-gray-600">Investors</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">49 days</h4>
              <p className="text-gray-600">igjen for å investere</p>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-16 hidden md:block">
            Hjelp oss å styrke Medeierskap
          </Button>
          <p className="text-center text-gray-600 mt-2 hidden md:block">
            Minstetegning er <strong>2 400kr</strong>
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-8">
            <div className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                Bli Folkekraft kunde
              </Button>
            </div>
            <div className="w-full">
              <Popover>
                <PopoverTrigger className="w-full  text-white text-lg h-12">
                  <div className="w-full text-semibold bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 rounded-md flex items-center justify-center">
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
