"use client";

import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

export interface BankDetails {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
}

export interface CompanyDetails {
  name: string;
  ceo: string;
  address: string;
  orgNumber: string;
  bankDetails: BankDetails;
}

export interface InvestmentDetails {
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
  setInvestmentDetails: (details: Partial<InvestmentDetails>) => void;
  clearInvestmentDetails: () => void;
}

const InvestmentConfirmationContext =
  createContext<InvestmentConfirmationContextType | null>(null);

const defaultCompanyDetails: CompanyDetails = {
  name: "Folkekraft AS",
  ceo: "Ola Nordmann",
  address: "Kanalveien 107, 5058 BERGEN",
  orgNumber: "830068112",
  bankDetails: {
    accountNumber: "32082799299",
    bankName: "SpareBank 1 Sør-Norge",
    accountHolder: "Folkekraft AS",
  },
};

export const InvestmentConfirmationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [investmentDetails, setInvestmentDetailsState] =
    useState<InvestmentDetails | null>(null);
  const { user } = useAuth();

  const setInvestmentDetails = (details: Partial<InvestmentDetails>) => {
    setInvestmentDetailsState((prev) => {
      if (!prev) {
        const purchaseDate = new Date().toLocaleDateString("no-NO");
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);

        return {
          purchasedShares: 0,
          pricePerShare: 0,
          totalInvestment: 0,
          investorName: user ? `${user.firstName} ${user.lastName}` : "",
          email: user?.email || "",
          purchaseDate,
          dueDate: dueDate.toLocaleDateString("no-NO"),
          companyDetails: defaultCompanyDetails,
          ...details,
        };
      }

      return { ...prev, ...details };
    });
  };

  const clearInvestmentDetails = () => {
    setInvestmentDetailsState(null);
  };

  return (
    <InvestmentConfirmationContext.Provider
      value={{
        investmentDetails,
        setInvestmentDetails,
        clearInvestmentDetails,
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
