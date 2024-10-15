import React, { useState } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Icons
import { Info } from "lucide-react";

//Helper functions
import { formatCurrency, formatValue, handleCopy } from "@/lib/helperFunctions";

interface PortfolioSummary {
  investorSharesValue: number; // Total value of investor-acquired shares
  customerSharesValue: number; // Total value of customer-owned shares
  referralSharesValue: number; // Total value of shares acquired from referrals
  accountDetails: any[]; // Array of account data for further details
}
interface ShareDetails {
  total: number;
  shares: number; // Total number of shares
  value: number; // Current value of the shares
}

interface CurrentValue {
  totalAmount: number; // Total current value of all shares
  percentageChange: number; // Percentage change in value from initial investment
}

interface Investments {
  totalShares: number; // Total number of shares acquired from investments
  totalValue: number; // Total current value of those shares
  customerShares: ShareDetails; // Details of customer-owned shares
  referralShares: ShareDetails; // Details of referral-acquired shares
}

interface PortfolioSummary {
  investorSharesValue: number; // Total value of investor-acquired shares
  customerSharesValue: number; // Total value of customer-owned shares
  referralSharesValue: number; // Total value of shares acquired from referrals
  accountDetails: any[]; // Array of account data for further details
}

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  // Add more fields as necessary based on your transaction structure
}

// Main data structure interface
interface Data {
  totalInvested: number; // Total amount invested by the user
  totalShares: number; // Total number of shares owned by the user
  currentValue: CurrentValue; // Current value of the shares and percentage change
  investments: Investments; // Investment details including shares and values
  portfolioSummary: PortfolioSummary; // Summary of the user's portfolio
  transactions: Transaction[]; // Array of user transaction details
  referralLink: string; // Referral link for the user
}

interface Props {
  portfolioData: Data;
}

export default function Investments({ portfolioData }: Props) {
  //Constants
  const {
    totalInvested,
    totalShares,
    currentValue,
    investments,
    portfolioSummary,
    transactions,
    referralLink,
  } = portfolioData;

  //useState
  const [isCopied, setIsCopied] = useState(false);

  //Functions
  const copyToClipboard = async () => {
    console.log("copying to clipboard");
    const success = await handleCopy(referralLink);
    if (success) {
      console.log("copied to clipboard");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };
  return <div className="container mx-auto p-4 my-12"></div>;
}
