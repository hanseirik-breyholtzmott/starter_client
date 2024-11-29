"use client";

import React, { useEffect } from "react";
import { useInvestment } from "@/app/hooks/InvestContext";
import InvestmentBody from "./InvestBody";

interface BankAccount {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
}

interface CompanyData {
  companyName: string;
  description: string;
  ceo: string;
  investmentDetails: {
    sharePrice: number;
    shareClassId: string;
    availableShares: number;
    minSharePurchase: number;
    maxSharePurchase: number;
  };
  bankAccount: BankAccount;
  perks: Array<{
    button: {
      text: string;
      link: string;
    };
    title: string;
    actionText: string;
    description: string;
    _id: string;
  }>;
}

interface Props {
  investmentData: CompanyData;
}

export default function InvestPageLayout({
  investmentData,
}: Props): JSX.Element {
  const { setCompanyData } = useInvestment();

  useEffect(() => {
    if (investmentData) {
      const transformedData = {
        ...investmentData,
        companyDetails: {
          ceo: investmentData.ceo,
          address: "",
          vatNumber: "",
          bankDetails: {
            accountNumber: investmentData.bankAccount?.accountNumber ?? "",
            bankName: investmentData.bankAccount?.bankName ?? "",
            accountHolder: investmentData.bankAccount?.accountHolderName ?? "",
          },
        },
      };

      setCompanyData(transformedData);
    }
  }, [investmentData, setCompanyData]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      <InvestmentBody />
      <div className="w-full md:w-1/3">
        <pre>{JSON.stringify(investmentData, null, 2)}</pre>
      </div>
    </div>
  );
}
