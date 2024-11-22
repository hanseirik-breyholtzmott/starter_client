"use client";

import React, { useState, useEffect } from "react";

//Nextjs
import { useRouter } from "next/navigation";

//Context
import { useInvestmentConfirmation } from "@/app/hooks/InvestmentConfirmationContext";

//Lucide
import {
  Download,
  Mail,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PurchaseDetails {
  shareCount: number;
  pricePerShare: number;
  totalInvestment: number;
  purchaseDate: string;
  paymentMethod: string;
  accountNumber: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  companyName: string;
  founderName: string;
}

export default function SharePurchaseSuccess() {
  const router = useRouter();
  const { investmentDetails } = useInvestmentConfirmation();

  const [currentStep, setCurrentStep] = useState(1);

  // Replace the static useState with context data
  const [purchaseDetails] = useState<PurchaseDetails>({
    shareCount: investmentDetails.purchasedShares,
    pricePerShare: investmentDetails.pricePerShare,
    totalInvestment: investmentDetails.totalInvestment,
    purchaseDate: new Date().toLocaleDateString(),
    paymentMethod: "Bank Transfer",
    accountNumber: "XXXXXXXX1234",
    email: investmentDetails.email,
    name: investmentDetails.investorName,
    phone: "+1 (555) 123-4567", // You might want to add this to context if needed
    address: "123 Investment St, Moneyville, CA 90210", // You might want to add this to context if needed
    companyName: investmentDetails.companyName,
    founderName: investmentDetails.companyCeo,
  });

  //Add a check for missing data
  useEffect(() => {
    if (investmentDetails.purchasedShares === 0) {
      router.push("/folkekraft/invest"); // Redirect if no investment details
    }
  }, [investmentDetails, router]);

  const downloadPDF = () => {
    alert("Downloading PDF... (This is a placeholder action)");
  };

  const viewPortfolio = () => {
    alert("Viewing portfolio... (This is a placeholder action)");
  };

  const renderStep = () => {
    return (
      <div className="h-[250px] overflow-y-auto">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Step 1: Download Purchase Details
            </h3>
            <p>Please download your purchase details for your records.</p>
            <Button onClick={downloadPDF} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" /> Download Purchase Details
              (PDF)
            </Button>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Step 2: Transfer Funds
            </h3>
            <p>
              Please complete your investment by transferring the total amount
              to the following account:
            </p>
            <div className="bg-white p-4 rounded-lg">
              <p>
                <strong>Payment Method:</strong> {purchaseDetails.paymentMethod}
              </p>
              <p>
                <strong>Account Number:</strong> {purchaseDetails.accountNumber}
              </p>
              <p>
                <strong>Amount to Transfer:</strong> $
                {purchaseDetails.totalInvestment.toFixed(2)}
              </p>
              <p>
                <strong>Reference:</strong> SHARE-{purchaseDetails.shareCount}
              </p>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Step 3: Founder&apos;s Message
            </h3>
            <div className="bg-white p-4 rounded-lg italic">
              <p>
                &ldquo;Dear {purchaseDetails.name}, Thank you for your
                investment in {purchaseDetails.companyName}. We&apos;re thrilled
                to have you on board as a shareholder. Your support is crucial
                for our growth, and we look forward to sharing our success with
                you. If you have any questions, please don&apos;t hesitate to
                reach out. Best regards, {purchaseDetails.founderName},
                Co-founder, {purchaseDetails.companyName}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-700">
            Congratulations!
          </CardTitle>
          <CardDescription className="text-xl">
            You've successfully reserved shares in {purchaseDetails.companyName}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 bg-green-100 p-4 rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Shares Reserved</h3>
              <p className="text-2xl font-bold">{purchaseDetails.shareCount}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Price per Share</h3>
              <p className="text-2xl font-bold">
                ${purchaseDetails.pricePerShare.toFixed(2)}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Total Investment</h3>
              <p className="text-2xl font-bold">
                ${purchaseDetails.totalInvestment.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Investment Details
            </h3>
            <div className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>
                <strong>Investor:</strong> {purchaseDetails.name}
              </p>
              <p>
                <strong>Email:</strong> {purchaseDetails.email}
              </p>
              <p>
                <strong>Phone:</strong> {purchaseDetails.phone}
              </p>
              <p>
                <strong>Address:</strong> {purchaseDetails.address}
              </p>
              <p>
                <strong>Company:</strong> {purchaseDetails.companyName}
              </p>
              <p>
                <strong>Founder:</strong> {purchaseDetails.founderName}
              </p>
            </div>
          </div>

          {renderStep()}

          <div className="flex items-center space-x-2 text-green-700">
            <Mail className="h-5 w-5" />
            <p>
              An investment confirmation has been sent to{" "}
              {purchaseDetails.email}
            </p>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Purchase Date: {purchaseDetails.purchaseDate}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {currentStep === 2 ? "Download Details" : "Transfer Funds"}
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
              className={currentStep === 1 ? "ml-auto" : ""}
            >
              {currentStep === 1 ? "Transfer Funds" : "Founder&apos;s Message"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={viewPortfolio}
              className="w-full sm:w-auto ml-auto"
            >
              <PieChart className="mr-2 h-4 w-4" /> View Portfolio
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
