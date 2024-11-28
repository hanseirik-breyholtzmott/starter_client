"use client";

import React, { createContext, useContext, useState } from "react";

interface BankDetails {
  accountNumber: string;
  bankName: string;
  accountHolder: string;
}

interface CompanyData {
  name: string;
  ceo: string;
  address: string;
  orgNumber: string;
  bankDetails: BankDetails;
}

interface CompanyDataContextType {
  companyData: CompanyData | null;
  setCompanyData: (data: CompanyData) => void;
}

const CompanyDataContext = createContext<CompanyDataContextType | null>(null);

export const CompanyDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [companyData, setCompanyData] = useState<CompanyData | null>({
    name: "FOLKEKRAFT AS",
    ceo: "Ola Nordmann",
    address: "Kanalveien 107, 5058 BERGEN",
    orgNumber: "830068112",
    bankDetails: {
      accountNumber: "32082799299",
      bankName: "SpareBank 1 Sør-Norge",
      accountHolder: "Folkekraft AS",
    },
  });

  return (
    <CompanyDataContext.Provider value={{ companyData, setCompanyData }}>
      {children}
    </CompanyDataContext.Provider>
  );
};

export const useCompanyData = () => {
  const context = useContext(CompanyDataContext);
  if (!context) {
    throw new Error("useCompanyData must be used within a CompanyDataProvider");
  }
  return context;
};
