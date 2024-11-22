"use client";

import React, { createContext, useContext, useState } from "react";

//Define the interface for investment details
interface InvestmentDetails {
  purchasedShares: number;
  pricePerShare: number;
  totalInvestment: number;
  investorName: string;
  email: string;
  companyName: string;
  companyCeo: string;
}

//Create the context
interface InvestmentConfirmationContextType {
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;
  investmentDetails: InvestmentDetails;
  setInvestmentDetails: (details: InvestmentDetails) => void;
}

// Create the context with default values
const InvestmentConfirmationContext =
  createContext<InvestmentConfirmationContextType>({
    showConfirmDialog: false,
    setShowConfirmDialog: () => {},
    investmentDetails: {
      purchasedShares: 0,
      pricePerShare: 0,
      totalInvestment: 0,
      investorName: "",
      email: "",
      companyName: "",
      companyCeo: "",
    },
    setInvestmentDetails: () => {},
  });

// Create the provider
export const InvestmentConfirmationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails>(
    {
      purchasedShares: 0,
      pricePerShare: 0,
      totalInvestment: 0,
      investorName: "",
      email: "",
      companyName: "",
      companyCeo: "",
    }
  );

  return (
    <InvestmentConfirmationContext.Provider
      value={{
        showConfirmDialog,
        setShowConfirmDialog,
        investmentDetails,
        setInvestmentDetails,
      }}
    >
      {children}
    </InvestmentConfirmationContext.Provider>
  );
};

// Create the hook
export const useInvestmentConfirmation = () => {
  return useContext(
    InvestmentConfirmationContext
  ) as InvestmentConfirmationContextType;
};
