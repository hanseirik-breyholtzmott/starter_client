"use client";

import React from "react";

//Context
import { useInvestment } from "@/app/hooks/InvestContext";

//Components

import InvestmentBody from "./InvestBody";

type Props = {
  investmentData: any;
};

export default function InvestPageLayout({ investmentData }: Props) {
  const {
    shareAmount,
    setShareAmount,
    entityType,
    setEntityType,
    idNumber,
    setIdNumber,
    termsAccepted,
    setTermsAccepted,
    activePerks,
    setActivePerks,
  } = useInvestment();

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      {/* Investment form */}
      <InvestmentBody />
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {JSON.stringify(investmentData, null, 2)}
      </pre>

      {/* Investment sidebar */}
    </div>
  );
}
