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
  return (
    <div className="container mx-auto p-4 my-12">
      <Card className="w-full mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-700">
            Aksje oversikt
          </CardTitle>
        </CardHeader>
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>
                Folkekraft aksjer{" "}
                <Info className="inline-block w-4 h-4 text-gray-400" />
              </TableHead>
              <TableHead className="text-center">Antall</TableHead>
              <TableHead className="text-center">Dine aksjer</TableHead>
              <TableHead className="text-center">
                Estimert verdi{" "}
                <Info className="inline-block w-4 h-4 text-gray-400" />
              </TableHead>
              <TableHead className="text-center">Lenker</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#00263D] rounded-lg flex justify-center items-center text-[#59C9B9] text-xl">
                    IN
                  </div>

                  <div className="text-left">
                    <div>Folkekraft</div>
                    <div className="text-sm text-gray-500">Investor</div>
                  </div>
                </div>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                {formatValue(investments.totalShares, 0, false)}
              </TableCell>
              <TableCell>
                {formatCurrency(investments.totalValue, 0, false)}
              </TableCell>
              <TableCell>
                <Link href="/folkekraft/invest">
                  <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-white text-lg h-12">
                    Kjøp Folkekraft aksjer
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="text-center">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#00263D] rounded-lg flex justify-center items-center text-[#59C9B9] text-xl">
                    K
                  </div>
                  <div className="text-left">
                    <div>Folkekraft</div>
                    <div className="text-sm text-gray-500">Kunde</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {formatValue(investments.customerShares.total, 0, false)}
              </TableCell>
              <TableCell>
                {formatValue(investments.customerShares.shares, 0, false)}
              </TableCell>
              <TableCell>
                {formatCurrency(investments.customerShares.value, 0, false)}
              </TableCell>
              <TableCell>
                <Link href="/bestill">
                  <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-white text-lg h-12">
                    Bli Folkekraft kunde
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
            <TableRow className="text-center">
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-[#00263D] rounded-lg flex justify-center items-center text-[#59C9B9] text-xl">
                    V
                  </div>
                  <div className="text-left">
                    <div>Folkekraft</div>
                    <div className="text-sm text-gray-500">Verving</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {formatValue(investments.referralShares.total, 0, false)}
              </TableCell>
              <TableCell>
                {formatValue(investments.referralShares.shares, 0, false)}
              </TableCell>
              <TableCell>
                {formatCurrency(investments.referralShares.value, 0, false)}
              </TableCell>
              <TableCell>
                <Button
                  onClick={copyToClipboard}
                  className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-white text-lg h-12"
                >
                  {isCopied ? "Kopiert!" : "Kopier verve lenke"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
