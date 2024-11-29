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
  companyDetails: {
    ceo: string;
    address: string;
    vatNumber: string;
    bankDetails: {
      accountNumber: string;
      bankName: string;
      accountHolder: string;
    };
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
        companyName: investmentData.companyName || '',
        description: investmentData.description || '',
        ceo: investmentData.ceo || '',
        investmentDetails: {
          sharePrice: investmentData.investmentDetails?.sharePrice || 0,
          shareClassId: investmentData.investmentDetails?.shareClassId || '',
          availableShares: investmentData.investmentDetails?.availableShares || 0,
          minSharePurchase: investmentData.investmentDetails?.minSharePurchase || 0,
          maxSharePurchase: investmentData.investmentDetails?.maxSharePurchase || 0,
        },
        companyDetails: {
          ceo: investmentData.companyDetails?.ceo || '',
          address: investmentData.companyDetails?.address || '',
          vatNumber: investmentData.companyDetails?.vatNumber || '',
          bankDetails: {
            accountNumber: investmentData.companyDetails?.bankDetails?.accountNumber || '',
            bankName: investmentData.companyDetails?.bankDetails?.bankName || '',
            accountHolder: investmentData.companyDetails?.bankDetails?.accountHolder || '',
          },
        },
        bankAccount: {
          accountNumber: investmentData.bankAccount?.accountNumber || '',
          bankName: investmentData.bankAccount?.bankName || '',
          accountHolderName: investmentData.bankAccount?.accountHolderName || '',
        },
        perks: Array.isArray(investmentData.perks) ? investmentData.perks : []
      };

      setCompanyData(transformedData);
    }
  }, [investmentData, setCompanyData]);

  if (!investmentData) {
    return <div>Loading investment data...</div>;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      <InvestmentBody />
      <div className="w-full md:w-1/3">
        <pre>{JSON.stringify(investmentData, null, 2)}</pre>
      </div>
    </div>
  );
}
