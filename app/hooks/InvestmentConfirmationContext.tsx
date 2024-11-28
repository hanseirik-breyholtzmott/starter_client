"use client";

import React, { createContext, useContext, useState } from "react";

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
  purchasedShares: number;
  pricePerShare: number;
  totalInvestment: number;
  investorName: string;
  email: string;
  purchaseDate: string;
  dueDate: string;
  companyDetails: CompanyDetails;
}

interface InvestmentConfirmationContextType {
  investmentDetails: InvestmentDetails | null;
  setInvestmentDetails: (details: InvestmentDetails) => void;
}

const InvestmentConfirmationContext =
  createContext<InvestmentConfirmationContextType | null>(null);

export const InvestmentConfirmationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [investmentDetails, setInvestmentDetails] =
    useState<InvestmentDetails | null>(null);

  return (
    <InvestmentConfirmationContext.Provider
      value={{
        investmentDetails,
        setInvestmentDetails,
      }}
    >
      {children}
    </InvestmentConfirmationContext.Provider>
  );
};

export const useInvestmentConfirmation = () => {
  const context = useContext(InvestmentConfirmationContext);
  if (!context) {
    throw new Error(
      "useInvestmentConfirmation must be used within an InvestmentConfirmationProvider"
    );
  }
  return context;
};
