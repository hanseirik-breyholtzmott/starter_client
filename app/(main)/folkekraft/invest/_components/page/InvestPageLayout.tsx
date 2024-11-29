"use client";

import React, { useEffect } from "react";
import { useInvestment } from "@/app/hooks/InvestContext";
import InvestmentBody from "./InvestBody";

interface BankAccount {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
}

interface InvestmentDetails {
  sharePrice: number;
  shareClassId: string;
  availableShares: number;
  minSharePurchase: number;
  maxSharePurchase: number;
}

interface Perk {
  button: {
    text: string;
    link: string;
  };
  title: string;
  actionText: string;
  description: string;
  _id: string;
}

interface CompanyData {
  companyName: string;
  description: string;
  ceo: string;
  investmentDetails: InvestmentDetails;
  bankAccount: BankAccount;
  perks: Perk[];
}

interface Props {
  investmentData: CompanyData;
}

export default function InvestPageLayout({ investmentData }: Props) {
  const { setCompanyData } = useInvestment();

  useEffect(() => {
    if (!investmentData) {
      console.warn("No investment data provided");
      return;
    }

    try {
      const transformedData = {
        ...investmentData,
        companyDetails: {
          ceo: investmentData.ceo ?? "",
          address: "",
          vatNumber: "",
          bankDetails: {
            accountNumber: investmentData.bankAccount?.accountNumber ?? "",
            bankName: investmentData.bankAccount?.bankName ?? "",
            accountHolder: investmentData.bankAccount?.accountHolderName ?? "",
          },
        },
      };

      console.log("Setting company data:", transformedData);
      setCompanyData(transformedData);
    } catch (error) {
      console.error("Error transforming investment data:", error);
    }
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
