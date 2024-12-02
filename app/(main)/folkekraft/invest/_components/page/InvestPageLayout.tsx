"use client";

import React, { useEffect, useState } from "react";
import { useInvestment } from "@/app/hooks/InvestContext";
import InvestmentBody from "./InvestBody";
import InvestSidebar from "./InvestSidebar";

interface ApiPerk {
  title: string;
  value: number;
  description: string;
}

interface InvestmentLimits {
  investmentMinimum: number;
  investmentMaximum: number;
  investmentRecommendation: number;
  investmentPurchaseRight: number;
}

interface ApiResponse {
  companyName: string;
  description: string;
  ceo: string;
  investmentDetails: {
    sharePrice: number;
    shareClassId: string;
    availableShares: number;
    minSharePurchase: number;
    maxSharePurchase: number;
  };
  bankAccount: {
    accountNumber: string;
    bankName: string;
    accountHolderName: string;
  };
  perks: {
    button: {
      text: string;
      link: string;
    };
    title: string;
    actionText: string;
    description: string;
    _id: string;
  }[];
}

interface Props {
  investmentData: ApiResponse;
}

export default function InvestPageLayout({
  investmentData,
}: Props): JSX.Element {
  const {
    numberOfShares,
    entityType,
    idNumber,
    termsAccepted,
    activePerks,
    setActivePerks,
    companyData,
    setCompanyData,
    minSharePurchase,
    maxSharePurchase,
    investmentDetails,
  } = useInvestment();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (investmentData) {
      try {
        console.log("Received investmentData:", investmentData);

        if (!investmentData.bankAccount) {
          console.error("Missing bankAccount data");
          setIsLoading(false);
          return;
        }

        const transformedData = {
          description: investmentData.description || "",
          companyName: investmentData.companyName || "",
          companyDetails: {
            ceo: investmentData.ceo || "",
            address: "",
            vatNumber: "",
            bankDetails: {
              accountNumber: investmentData.bankAccount?.accountNumber || "",
              bankName: investmentData.bankAccount?.bankName || "",
              accountHolder:
                investmentData.bankAccount?.accountHolderName || "",
            },
          },
          investmentDetails: {
            sharePrice: investmentData.investmentDetails?.sharePrice || 0,
            shareClassId: investmentData.investmentDetails?.shareClassId || "",
            availableShares:
              investmentData.investmentDetails?.availableShares || 0,
            minSharePurchase:
              investmentData.investmentDetails?.minSharePurchase || 0,
            maxSharePurchase:
              investmentData.investmentDetails?.maxSharePurchase || 0,
          },
          perks: (investmentData.perks || []).map((perk) => ({
            button: {
              text: perk.button?.text || "",
              link: perk.button?.link || "",
            },
            title: perk.title || "",
            actionText: perk.actionText || "",
            description: perk.description || "",
            _id: perk._id || perk.title || "",
          })),
        };

        console.log("Transformed data:", transformedData);
        setCompanyData(transformedData);
      } catch (error) {
        console.error("Error transforming data:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No investment data received");
      setIsLoading(false);
    }
  }, [investmentData, setCompanyData]);

  if (isLoading || !companyData) {
    return <div>Loading investment data...</div>;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      <InvestmentBody />
      <div className="w-full md:w-1/3 hidden">
        <InvestSidebar />
      </div>

      {/* Debug Data (Commented Out)
      <div className="w-full md:w-1/3 space-y-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">API Response</h2>
          <pre className="bg-gray-50 p-4 rounded overflow-auto">
            {JSON.stringify(investmentData, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">InvestContext Data</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Investment Form Data</h3>
              <p>Number of Shares: {numberOfShares}</p>
              <p>Entity Type: {entityType || "Not selected"}</p>
              <p>ID Number: {idNumber || "Not provided"}</p>
              <p>Terms Accepted: {termsAccepted ? "Yes" : "No"}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Share Purchase Limits</h3>
              <p>Min Share Purchase: {minSharePurchase}</p>
              <p>Max Share Purchase: {maxSharePurchase}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Company Data</h3>
              <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(companyData, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Active Perks</h3>
              <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(activePerks, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Investment Details</h3>
              <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(investmentDetails, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
