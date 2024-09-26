import React from "react";

//Components
import PortfolioLayout from "./_components/page/portfolioLayout";

//Cookies
import { getCookieValue } from "@/lib/cookies";

//Crypto
import { decrypt } from "@/lib/auth";

//Axios
import axiosInstance from "@/lib/axiosInstance";

interface ShareDetails {
  total: number; // Total number of shares
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

interface TransactionMetadata {
  campaignId: string;
  shareNumber: string;
  ssn: string;
}

interface Transaction {
  _id: string; // Unique identifier for the transaction
  userId: string; // User ID associated with the transaction
  stripePaymentId: string; // Payment ID used in Stripe or other payment systems
  transactionType: "shares" | "other"; // Type of transaction (add other types as needed)
  paymentMethod: "bank_transfer" | "credit_card" | "paypal"; // Payment method used
  amount: number; // Transaction amount
  currency: string; // Currency of the transaction (e.g., 'NOK')
  status: "pending" | "completed" | "failed"; // Status of the transaction
  taxAmount: number; // Amount of tax applied to the transaction
  taxRate: number; // Tax rate applied
  discount: number; // Discount applied to the transaction
  metadata: TransactionMetadata; // Additional metadata related to the transaction
  transactionDate: string; // Date and time of the transaction (ISO string)
  products: any[]; // Array of products associated with the transaction
  createdAt: string; // Date and time when the transaction was created (ISO string)
  updatedAt: string; // Date and time when the transaction was last updated (ISO string)
  __v: number; // Version key used by Mongoose for document versioning
}

// Main data structure interface
interface Data {
  totalInvested: number; // Total amount invested by the user
  totalShares: number; // Total number of shares owned by the user
  currentValue: CurrentValue; // Current value of the shares and percentage change
  investments: Investments; // Investment details including shares and values
  portfolioSummary: PortfolioSummary; // Summary of the user's portfolio
  transactions: Transaction[]; // Array of user transaction details
}

interface DecryptedSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

type Props = {};

const getPortfolioData = async () => {
  try {
    const session = await getCookieValue("session");

    const decryptedSession = decrypt(session as string);

    const response = await axiosInstance.get(
      "/api/portfolio/" + (decryptedSession as DecryptedSession).id
    );

    if (response.status != 200) {
      console.log("Failed to fetch data");
      throw new Error("Failed to fetch data");
    } else {
      console.log("Data fetched successfully");
    }

    const data = response.data.data;

    return {
      portfolio: data,
      portfolioSummary: data.portfolioSummary,
      transactions: data.transactions,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function PortfolioPage({}: Props) {
  const portfolioData = await getPortfolioData();

  if (!portfolioData) {
    return <div>Error loading portfolio data</div>;
  }

  const { portfolio, portfolioSummary, transactions } = portfolioData;

  return (
    <PortfolioLayout
      portfolioData={portfolio}
      portfolioSummary={portfolioSummary}
      transactions={transactions} // Ensure this is passed
    />
  );
}
