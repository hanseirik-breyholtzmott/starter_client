"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useCampaign } from "@/app/hooks/CampaignContext";

//Framer Motion
import { motion, AnimatePresence } from "framer-motion";

//Smooth Progress
import SmoothProgress from "@/app/(main)/folkekraft/_components/Progressbar";

//Nextjs
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//MagicUI
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import NumberTicker from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";

//Icons
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  Copy,
  Users,
  Info,
} from "lucide-react";

//Helper functions
import {
  handleCopy,
  formatCurrency,
  calculateDaysRemaining,
} from "@/lib/helperFunctions";

export default function CampaignInfo() {
  const titles = [
    "EMISJON",
    "BLI MEDEIER",
    "INVESTER NÅ",
    "EN KNAPP FRA Å BLI INVESTOR",
  ];

  const { campaign, caplist } = useCampaign();
  const [isCopied, setIsCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReturning, setIsReturning] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showInvestDialog, setShowInvestDialog] = useState(false);

  const copyToClipboard = useCallback(async () => {
    const success = await handleCopy(urlToShare);
    if (success && isMounted) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 0) {
          setIsReturning(false);
          return 1;
        }
        if (prevIndex === titles.length - 1) {
          setIsReturning(true);
          return 0;
        }
        if (!isReturning) {
          return prevIndex + 1;
        }
        return 0;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isReturning]);

  if (!campaign || !caplist) return null;

  const urlToShare = "https://invest.folkekraft.no/emisjon";
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    urlToShare
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    urlToShare
  )}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      <motion.div
        className="flex-1"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.8,
          bounce: 0.3,
        }}
      >
        <div className="bg-gray-900 text-white rounded-lg mb-4 w-full h-full flex items-center justify-center">
          <div className="w-full h-[520px] relative overflow-hidden rounded-xl flex items-center justify-center">
            <HeroVideoDialog
              className="dark:hidden block"
              animationStyle="top-in-bottom-out"
              videoSrc="https://player.vimeo.com/video/1031063024?h=d2ec4538b5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              thumbnailSrc="https://utfs.io/f/1c66qeb7SCm5KnHIa9XpSEv3rPDqiJxksfXTgtVLwjMhWCn4"
              thumbnailAlt="Folkekraft"
            />
            <HeroVideoDialog
              className="hidden dark:block bg-black"
              animationStyle="top-in-bottom-out"
              videoSrc="https://player.vimeo.com/video/1031063024?h=d2ec4538b5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              thumbnailSrc="https://utfs.io/f/1c66qeb7SCm5KnHIa9XpSEv3rPDqiJxksfXTgtVLwjMhWCn4"
              thumbnailAlt="Folkekraft"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.8,
          bounce: 0.3,
          delay: 0.2,
        }}
      >
        <div className="relative bg-white p-8 rounded-xl mb-4 shadow-xl shadow-slate-300">
          <BorderBeam />
          <div className="flex items-center justify-between mb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={titles[currentIndex]}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="flex items-center gap-2 text-emerald-500 font-bold "
              >
                {currentIndex === 0 && <span>🚀</span>}
                {titles[currentIndex]}
              </motion.div>
            </AnimatePresence>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">More information</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] p-4" side="right">
                  <p className="text-sm leading-relaxed">
                    Verdsettelsen er pre-money og baserer seg på en nedprising
                    fra kr 12 til kr 8 per aksje i forbindelse med emisjonen.
                    Dette fører til en justering av verdien fra 32,5 millioner
                    kr til 21,7 mill. kr. Fremtidig verdsettelse vil bli
                    beregnet basert på multippelanalyse av både omsetning og
                    EBITDA, som reflekterer selskapets vekstpotensial og
                    lønnsomhet.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <h3 className="text-4xl font-bold my-4 ">
            <NumberTicker value={caplist.totalInvested} decimalPlaces={0} /> kr
          </h3>
          <p className="text-gray-600 mb-2">
            {(
              (caplist.totalInvested /
                campaign.investmentDetails.targetAmount) *
              100
            ).toFixed(0)}
            % samlet inn av maksbeløpet på{" "}
            {formatCurrency(campaign.investmentDetails.targetAmount, 0, false)}
          </p>
          <SmoothProgress
            current={caplist.totalInvested}
            target={campaign.investmentDetails.targetAmount}
          />

          <div className="grid grid-cols-2 gap-4 my-4 py-8 rounded-lg">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  {caplist.totalInvestments}
                </h4>
                <p className="text-gray-600">Antall investeringer</p>
              </motion.div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <h4 className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  {calculateDaysRemaining(
                    campaign.investmentDetails.closingDate as string
                  )}
                  {/* Only show "dager" if it's actually days */}
                  {Number(
                    calculateDaysRemaining(
                      campaign.investmentDetails.closingDate as string
                    )
                  ) > 1
                    ? " dager"
                    : ""}
                </h4>
                <p className="text-gray-600">igjen for å investere</p>
              </motion.div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4">
            <Link href="/folkekraft/invest">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 5.5,
                  },
                }}
              >
                <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-16 hidden md:flex">
                  <span>Invester i Folkekraft</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>

            <p className="text-center text-gray-600 hidden md:block">
              Minstetegning er{" "}
              <strong>
                {formatCurrency(
                  campaign.investmentDetails.minimumInvestment *
                    campaign.investmentDetails.sharePrice,
                  0,
                  false
                )}
              </strong>
            </p>

            <Link href="https://folkekraft-weborder.utilitycloud.app/?product=27bf03faa8524810856f558bca49bb34#/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-12 text-lg border-2 text-[#00263D]"
                >
                  Bli Folkekraft kunde
                </Button>
              </motion.div>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-8">
            <div className="w-full hidden">
              <Popover>
                <PopoverTrigger className="w-full text-white text-lg h-12">
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
      </motion.div>
    </div>
  );
}
