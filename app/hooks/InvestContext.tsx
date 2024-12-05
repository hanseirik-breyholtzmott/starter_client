"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Type Definitions

interface ApiPerk {
  title: string;
  value: number;
  description: string;
}

interface BankDetails {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
}

interface CompanyDetails {
  ceo: string;
  address: string;
  vatNumber: string;
  bankDetails: BankDetails;
}

interface ShareDetails {
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
  description: string;
  companyName: string;
  companyDetails: CompanyDetails;
  investmentDetails: ShareDetails;
  perks: Perk[];
}

export interface InvestmentDetails {
  email: string;
  investorName: string;
  purchasedShares: number;
  pricePerShare: number;
  totalInvestment: number;
  purchaseDate: string;
  dueDate: string;
  idNumber: string;
  companyDetails: {
    name: string;
    ceo: string;
    bankDetails: BankDetails;
  };
}

interface InvestmentContextType {
  numberOfShares: number;
  setNumberOfShares: (amount: number) => void;
  entityType: string;
  setEntityType: (type: string) => void;
  idNumber: string;
  setIdNumber: (id: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  activePerks: ApiPerk[];
  setActivePerks: (perks: ApiPerk[]) => void;
  clearInvestmentData: () => void;
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
  minSharePurchase: number;
  maxSharePurchase: number;
  investmentDetails: InvestmentDetails | null;
  setInvestmentDetails: (details: InvestmentDetails | null) => void;
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
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [entityType, setEntityType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activePerks, setActivePerks] = useState<ApiPerk[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [minSharePurchase, setMinSharePurchase] = useState(0);
  const [maxSharePurchase, setMaxSharePurchase] = useState(0);
  const [investmentDetails, setInvestmentDetails] =
    useState<InvestmentDetails | null>(null);

  // Update min/max share purchase when companyData changes
  useEffect(() => {
    if (companyData) {
      setMinSharePurchase(companyData.investmentDetails.minSharePurchase);
      setMaxSharePurchase(companyData.investmentDetails.maxSharePurchase);
    }
  }, [companyData]);

  // Add this helper function at the top
  const STORAGE_EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

  const isStorageExpired = (timestamp: number) => {
    return Date.now() - timestamp > STORAGE_EXPIRY_TIME;
  };

  // Update the useEffect that loads data
  useEffect(() => {
    const storedData = localStorage.getItem("investmentData");
    if (storedData) {
      const data = JSON.parse(storedData);
      if (!isStorageExpired(data.timestamp)) {
        setNumberOfShares(data.numberOfShares);
        setEntityType(data.entityType);
        setIdNumber(data.idNumber);
        setTermsAccepted(data.termsAccepted);
        setActivePerks(data.activePerks);
        setCompanyData(data.companyData);
        if (data.companyData) {
          setMinSharePurchase(
            data.companyData.investmentDetails.minSharePurchase
          );
          setMaxSharePurchase(
            data.companyData.investmentDetails.maxSharePurchase
          );
        }
      } else {
        localStorage.removeItem("investmentData");
        clearInvestmentData(); // Clear all state
      }
    }
  }, []);

  // Update the useEffect that saves data
  useEffect(() => {
    const investmentData = {
      numberOfShares,
      entityType,
      idNumber,
      termsAccepted,
      activePerks,
      companyData,
      minSharePurchase,
      maxSharePurchase,
      timestamp: Date.now(),
    };
    localStorage.setItem("investmentData", JSON.stringify(investmentData));
  }, [
    numberOfShares,
    entityType,
    idNumber,
    termsAccepted,
    activePerks,
    companyData,
    minSharePurchase,
    maxSharePurchase,
  ]);

  // Utility function to clear all investment data
  const clearInvestmentData = () => {
    localStorage.removeItem("investmentData");
    setNumberOfShares(0);
    setEntityType("");
    setIdNumber("");
    setTermsAccepted(false);
    setActivePerks([]);
    setCompanyData(null);
    setMinSharePurchase(0);
    setMaxSharePurchase(0);
  };

  // Provide context values to children
  return (
    <InvestmentContext.Provider
      value={{
        numberOfShares,
        setNumberOfShares,
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
        minSharePurchase,
        maxSharePurchase,
        investmentDetails,
        setInvestmentDetails,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
