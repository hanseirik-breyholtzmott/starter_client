"use client";

import React, { useEffect } from "react";
import { useInvestment } from "@/app/hooks/InvestContext";
import InvestmentBody from "./InvestBody";

interface BankDetails {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
}

interface CompanyDetails {
  name: string;
  ceo: string;
  address: string;
  orgNumber: string;
  bankDetails: BankDetails;
}

interface InvestmentDetails {
  sharePrice: number;
  shareClassId: string;
  availableShares: number;
  investmentMinimum: number;
  investmentMaximum: number;
}

interface InvestmentData {
  companyName: string;
  description: string;
  ceo: string;
  investmentDetails: InvestmentDetails;
  companyDetails: CompanyDetails;
  perks: Array<{
    button: { text: string; link: string };
    title: string;
    actionText: string;
    description: string;
    _id: string;
  }>;
  terms: Array<{
    id: number;
    text: string;
  }>;
}

type Props = {
  investmentData: InvestmentData;
};

export default function InvestPageLayout({ investmentData }: Props) {
  const { setCompanyData } = useInvestment();

  useEffect(() => {
    setCompanyData(investmentData);
  }, [investmentData, setCompanyData]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      <InvestmentBody />
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {JSON.stringify(investmentData, null, 2)}
      </pre>
    </div>
  );
}
