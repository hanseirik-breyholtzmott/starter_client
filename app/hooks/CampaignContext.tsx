"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

// Type Definitions
interface CampaignInfo {
  name: string;
  description: string;
  tags: string[];
}

interface InvestmentDetails {
  minimumInvestment: number;
  maximumInvestment: number;
  shareClassId: string;
  sharePrice: number;
  startDate: string;
  closingDate: string | null;
  status: string;
  startAmount: number;
  targetAmount: number;
  availableShares: number;
  _id: string;
}

interface Perk {
  name: string;
  actionText: string;
  boldText: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
}

interface DisplayImage {
  image: string;
  alt: string;
}

interface Document {
  title: string;
  description: string;
  fileName: string;
  url: string;
}

interface Campaign {
  _id: string;
  companyId: string;
  campaignInfo: CampaignInfo;
  investmentDetails: InvestmentDetails;
  perks: Perk[];
  displayImages: DisplayImage[];
  documents: Document[];
}

interface CapList {
  totalInvestments: number;
  totalInvested: number;
  investors: any[]; // Define more specific type if needed
}

interface CampaignContextType {
  campaign: Campaign | null;
  caplist: CapList | null;
  loading: boolean;
  error: string | null;
  setCampaign: (campaign: Campaign) => void;
  setCaplist: (caplist: CapList) => void;
  refreshCampaign: () => Promise<void>;
  lastUpdated: Date | null;
}

// Context Creation
const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

// Provider Component
export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [caplist, setCaplist] = useState<CapList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCampaignData = async (skipLoading = false) => {
    try {
      if (!skipLoading) setLoading(true);
      const response = await axiosInstance.get(
        `/api/campaign/670edfb1a444b509203c7cd7`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch campaign data");
      }

      const data = response.data;
      setCampaign(data.campaign);
      setCaplist(data.caplist);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Failed to fetch campaign data:", err);
    } finally {
      if (!skipLoading) setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCampaignData();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Manual refresh function
  const refreshCampaign = async () => {
    await fetchCampaignData(true); // Skip loading state on refresh
  };

  return (
    <CampaignContext.Provider
      value={{
        campaign,
        caplist,
        loading,
        error,
        setCampaign,
        setCaplist,
        refreshCampaign,
        lastUpdated,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

// Custom Hook
export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
