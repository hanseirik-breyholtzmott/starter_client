"use client";

import React, { useState, useEffect } from "react";
import { useCampaign } from "@/app/hooks/CampaignContext";
import { motion } from "framer-motion";

//Nextjs
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";

//Icons
import { ArrowRight, ChevronRight, Clock, Copy, Users } from "lucide-react";
import { formatCurrency } from "@/lib/helperFunctions";

type Props = {};

export default function InvestButton({}: Props) {
  const { campaign } = useCampaign();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 600); // Show button after scrolling 600px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!campaign) return null;

  const minimumInvestment =
    campaign.investmentDetails.minimumInvestment *
    campaign.investmentDetails.sharePrice;

  return (
    <>
      {/* Mobile button */}
      <Link href="/folkekraft/invest">
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white p-2 border-t border-gray-200 md:hidden block"
          animate={{
            scale: [1, 1.02, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 5.5,
            },
          }}
        >
          <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-12">
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

          <p className="text-center text-gray-600 m-2 text-sm">
            Minstetegning er{" "}
            <strong>{formatCurrency(minimumInvestment, 0, false)}</strong>
          </p>
        </motion.div>
      </Link>

      {/* Desktop button */}
      <Link href="/folkekraft/invest">
        <motion.div
          className={`fixed bottom-6 z-50 hidden md:block transition-all duration-300 ease-in-out ${
            showButton ? "right-6" : "-right-full"
          }`}
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
          <Button className="bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-16 px-8 rounded-xl">
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
    </>
  );
}
