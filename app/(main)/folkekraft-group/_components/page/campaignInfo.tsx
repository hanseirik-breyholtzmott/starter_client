"use client";

import React, { useState, useEffect, useCallback } from "react";

//Nextjs
import Link from "next/link";
import Image from "next/image";

//Shadcn
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Icons
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Copy } from "lucide-react";

//Helper functions
import {
  handleCopy,
  formatCurrency,
  calculateDaysRemaining,
} from "@/lib/helperFunctions";

type CampaignInfo = {
  name: string;
  description: string;
  tags: string[];
};

type InvestmentDetails = {
  minimumInvestment: number;
  maximumInvestment: number;
  shareClassId: string;
  sharePrice: number;
  startDate: string;
  closingDate: string | null;
  status: string;
  startAmount: number;
  targetAmount: number;
  availableShares: number;
  investmentCount: number;
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
  campaignInfo: CampaignInfo;
  investmentDetails: InvestmentDetails;
  perks: Perk[];
  displayImages: DisplayImage[];
  documents: Documents[];
};

interface CampaignInfoProps {
  campaignData: Campaign;
  totalInvestments?: number;
  totalInvested?: number;
}

export default function CampaignInfo({
  campaignData,
  totalInvestments,
  totalInvested,
}: CampaignInfoProps) {
  //useState
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  //useEffect
  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  //useCallback
  const copyToClipboard = useCallback(async () => {
    console.log("copying to clipboard");
    const success = await handleCopy(urlToShare);
    if (success && isMounted) {
      console.log("copied to clipboard");
      setIsCopied(true);
      setTimeout(() => {
        if (isMounted) {
          setIsCopied(false);
        }
      }, 2000);
    }
  }, [isMounted]);

  // Move this check after the hooks
  if (!campaignData) {
    return <div>No campaign data available</div>;
  }

  //Constants
  const { campaignInfo, investmentDetails, perks, displayImages } =
    campaignData;

  const urlToShare = "https://invest.folkekraft.no/emisjon"; // The URL you want to share
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    urlToShare
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    urlToShare
  )}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      <div className="flex-1">
        <div className="bg-gray-900 text-white rounded-lg mb-4 w-full h-full flex items-center justify-end">
          {/* Image */}
          <div className="w-full h-[520px] relative overflow-hidden rounded-xl">
            <Image
              src="https://utfs.io/f/1c66qeb7SCm5lMVVTviYE0rjfSp8dacCVPGq7lkgw2IoZhUb"
              alt="Folkekraft Group Video"
              fill
              className="object-cover"
            />
            <iframe
              src="https://player.vimeo.com/video/1029570862?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
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
              <PopoverContent></PopoverContent>
            </Popover>
          </div>
          <h3 className="text-4xl font-bold my-4 ">
            {formatCurrency(investmentDetails.startAmount, 0, false)}
          </h3>
          <p className="text-gray-600 mb-2">
            {(
              ((totalInvested as number) / investmentDetails.targetAmount) *
              100
            ).toFixed(0)}
            % samlet inn av maksbeløpet på 12 millioner
          </p>
          <Progress
            value={
              ((totalInvested as number) / investmentDetails.targetAmount) * 100
            }
            className="mb-4"
          />
          <div className="grid grid-cols-2 gap-4 my-4 py-8 rounded-lg">
            <div>
              <h4 className="text-3xl font-bold">
                {(totalInvestments as number) + 14}
              </h4>
              <p className="text-gray-600">Antall investeringer</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">
                {calculateDaysRemaining(
                  campaignData.investmentDetails.closingDate as string
                )}{" "}
                dager
              </h4>
              <p className="text-gray-600">igjen for å investere</p>
            </div>
          </div>

          <Link href="/folkekraft-group/invest">
            <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-16 hidden md:block">
              Invester i Folkekraft Group
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
              <Link
                href="https://folkekraft-weborder.utilitycloud.app/?product=27bf03faa8524810856f558bca49bb34#/"
                target="_blank"
              >
                <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-lg h-12">
                  Bli Folkekraft kunde
                </Button>
              </Link>
            </div>
            <div className="w-full hidden">
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
