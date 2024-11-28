"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Type Definitions
interface Button {
  text: string;
  link: string;
}

interface Perk {
  button: Button;
  title: string;
  actionText: string;
  description: string;
  _id: string;
}

interface Term {
  id: number;
  text: string;
}

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

interface CompanyData {
  companyName: string;
  description: string;
  ceo: string;
  investmentDetails: InvestmentDetails;
  companyDetails: CompanyDetails;
  perks: Perk[];
  terms: Term[];
}

interface InvestmentContextType {
  shareAmount: number;
  setShareAmount: (amount: number) => void;
  entityType: string;
  setEntityType: (type: string) => void;
  idNumber: string;
  setIdNumber: (id: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  activePerks: Perk[];
  setActivePerks: (perks: Perk[]) => void;
  clearInvestmentData: () => void;
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
}

// Context Creation
const InvestmentContext = createContext<InvestmentContextType | null>(null);

// Custom Hook for using the Investment Context
export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error("useInvestment must be used within an InvestmentProvider");
  }
  return context;
};

// Investment Provider Component
export const InvestmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State Management
  const [shareAmount, setShareAmount] = useState(0);
  const [entityType, setEntityType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activePerks, setActivePerks] = useState<Perk[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);

  // Load saved investment data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("investmentData");
    if (storedData) {
      const data = JSON.parse(storedData);
      // Check if data is less than 24 hours old (86400000 ms)
      if (Date.now() - data.timestamp < 86400000) {
        setShareAmount(data.shareAmount);
        setEntityType(data.entityType);
        setIdNumber(data.idNumber);
        setTermsAccepted(data.termsAccepted);
        setActivePerks(data.activePerks);
        setCompanyData(data.companyData);
      } else {
        console.log("Investment data expired");
        localStorage.removeItem("investmentData");
      }
    }
  }, []);

  // Save investment data to localStorage whenever state changes
  useEffect(() => {
    const investmentData = {
      shareAmount,
      entityType,
      idNumber,
      termsAccepted,
      activePerks,
      companyData,
      timestamp: Date.now(),
    };
    localStorage.setItem("investmentData", JSON.stringify(investmentData));
  }, [
    shareAmount,
    entityType,
    idNumber,
    termsAccepted,
    activePerks,
    companyData,
  ]);

  // Utility function to clear all investment data
  const clearInvestmentData = () => {
    localStorage.removeItem("investmentData");
    setShareAmount(0);
    setEntityType("");
    setIdNumber("");
    setTermsAccepted(false);
    setActivePerks([]);
    setCompanyData(null);
  };

  // Provide context values to children
  return (
    <InvestmentContext.Provider
      value={{
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
        clearInvestmentData,
        companyData,
        setCompanyData,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
