"use client";

import React, { useState, useEffect } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";

type Props = {};

export default function InvestButton({}: Props) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 600); // Show button after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Link href="/folkekraft-group/invest">
        {/* Mobile button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white p-2 border-t border-gray-200 md:hidden block">
          <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-xl h-12">
            Invester i Folkekraft Group
          </Button>
          <p className="text-center text-gray-600 m-2 text-sm">
            Minstetegning er <strong>25 000kr</strong>
          </p>
        </div>
        {/* Desktop button */}
        <Button
          className={`
    fixed bottom-6 bg-[#00263D] hover:bg-[#00263D]/80 px-8 h-16 rounded-xl text-xl text-[#59C9B9] z-50 hidden md:block
    transition-all duration-300 ease-in-out
    ${showButton ? "right-6" : "-right-full"}
  `}
        >
          Invester i Folkekraft Group
        </Button>
      </Link>
    </>
  );
}
