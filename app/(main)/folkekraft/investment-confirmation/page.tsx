"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInvestmentConfirmation } from "@/app/hooks/InvestmentConfirmationContext";
import {
  Download,
  Mail,
  PieChart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InvestmentPDF from "@/components/react-pdf/sharePDF";
import { BlobProvider } from "@react-pdf/renderer";
import type { InvestmentDetails } from "@/app/hooks/InvestmentConfirmationContext";

const getCompanyName = (details: InvestmentDetails | null) => {
  return details?.companyDetails?.name || "";
};

export default function SharePurchaseSuccess() {
  const router = useRouter();
  const { investmentDetails } = useInvestmentConfirmation();
  const [currentStep, setCurrentStep] = useState(1);

  // Redirect if no investment details
  useEffect(() => {
    if (!investmentDetails) {
      router.push("/folkekraft/invest");
      return;
    }
  }, [investmentDetails, router]);

  if (!investmentDetails) return null;

  const renderPDFDownload = () => {
    const pdfData = {
      name: investmentDetails.investorName,
      shares: investmentDetails.purchasedShares,
      amount: investmentDetails.totalInvestment,
      date: investmentDetails.purchaseDate,
      dueDate: investmentDetails.dueDate,
      companyDetails: investmentDetails.companyDetails,
    };

    return (
      <BlobProvider document={<InvestmentPDF {...pdfData} />}>
        {({ url, loading }) => (
          <Button
            onClick={() => {
              if (url) {
                const link = document.createElement("a");
                link.href = url;
                link.download = `Folkekraft-Investering-${
                  new Date().toISOString().split("T")[0]
                }.pdf`;
                link.click();
              }
            }}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Genererer PDF..." : "Last ned kjøpsdetaljer (PDF)"}
          </Button>
        )}
      </BlobProvider>
    );
  };

  const renderStep = () => {
    return (
      <div className="h-[250px] overflow-y-auto">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Steg 1: Last ned kjøpsdetaljer
            </h3>
            <p>Last ned kjøpsdetaljer for dine arkiver.</p>
            {renderPDFDownload()}
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Steg 2: Overfør beløp
            </h3>
            <p>
              Vennligst fullfør investeringen din ved å overføre totalbeløpet
              til følgende konto:
            </p>
            <div className="bg-white p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p>
                    <strong>Betalingsmåte:</strong> Bank Transfer
                  </p>
                  <p>
                    <strong>Kontoinnehaver:</strong>{" "}
                    {investmentDetails?.companyDetails?.bankDetails
                      ?.accountHolder || ""}
                  </p>
                  <p>
                    <strong>Bank:</strong>{" "}
                    {investmentDetails?.companyDetails?.bankDetails?.bankName ||
                      ""}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Kontonummer:</strong>{" "}
                    {investmentDetails?.companyDetails?.bankDetails
                      ?.accountNumber || ""}
                  </p>
                  <p>
                    <strong>Beløp å overføre:</strong>{" "}
                    {investmentDetails.totalInvestment.toLocaleString("no-NO")}{" "}
                    kr
                  </p>
                  <p>
                    <strong>Melding:</strong> {investmentDetails.investorName} -{" "}
                    {investmentDetails.purchasedShares}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Steg 3: Melding fra CEO
            </h3>
            <div className="bg-white p-4 rounded-lg italic">
              <p>
                &ldquo;Kjære {investmentDetails?.investorName || ""}, Takk for
                din investering i {getCompanyName(investmentDetails)}. Vi er
                glade for å ha deg med på laget som aksjonær. Din støtte er
                avgjørende for vår vekst, og vi ser frem til å dele vår suksess
                med deg. Hvis du har spørsmål, ikke nøl med å ta kontakt. Med
                vennlig hilsen, {investmentDetails?.companyDetails?.ceo || ""},
                CEO, {getCompanyName(investmentDetails)}&rdquo;
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
            Gratulerer!
          </CardTitle>
          <CardDescription className="text-xl">
            Du har tegnet aksjer i {getCompanyName(investmentDetails)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 bg-green-100 p-4 rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Aksjer tegnet</h3>
              <p className="text-2xl font-bold">
                {investmentDetails.purchasedShares.toLocaleString("no-NO")}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Pris per aksje</h3>
              <p className="text-2xl font-bold">
                {investmentDetails.pricePerShare.toLocaleString("no-NO")} kr
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Total investering</h3>
              <p className="text-2xl font-bold">
                {investmentDetails.totalInvestment.toLocaleString("no-NO")} kr
              </p>
            </div>
          </div>

          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {currentStep === 2 ? "Last ned detaljer" : "Overfør beløp"}
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep((prev) => Math.min(3, prev + 1))}
              className={currentStep === 1 ? "ml-auto" : ""}
            >
              {currentStep === 1 ? "Overfør beløp" : "Melding fra CEO"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/folkekraft/portfolio")}
              className="w-full sm:w-auto ml-auto"
            >
              <PieChart className="mr-2 h-4 w-4" /> Se portefølje
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
