"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
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

export default function SharePurchaseSuccess() {
  const router = useRouter();
  const { investmentDetails } = useInvestmentConfirmation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Redirect if no investment details
  useEffect(() => {
    if (!investmentDetails) {
      router.push("/folkekraft/invest");
      return;
    }
  }, [investmentDetails, router]);

  // Return null while checking investment details
  if (!investmentDetails) {
    return null;
  }

  const purchaseDetails = {
    shareCount: investmentDetails.purchasedShares,
    pricePerShare: investmentDetails.pricePerShare,
    totalInvestment: investmentDetails.totalInvestment,
    purchaseDate: new Date().toLocaleDateString("no-NO"),
    paymentMethod: "Bank Transfer",
    accountNumber: "32082799299",
    accountHolderName: "Folkekraft AS",
    bankName: "SpareBank 1 Sør-Norge",
    email: investmentDetails.email,
    name: investmentDetails.investorName,
    phone: "", // You might want to add this to context if needed
    address: "", // You might want to add this to context if needed
    companyName: investmentDetails.companyDetails.name,
    founderName: investmentDetails.companyDetails.ceo,
  };

  const downloadPDF = () => {
    // This function is no longer needed as PDFDownloadLink handles the download
    return null;
  };

  const renderPDFDownload = () => {
    if (!investmentDetails) return null;

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
        {({ blob, url, loading }) => (
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

  const viewPortfolio = () => {
    router.push("/folkekraft/portfolio");
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
                    <strong>Betalingsmåte:</strong>{" "}
                    {purchaseDetails.paymentMethod}
                  </p>
                  <p>
                    <strong>Kontoinnehaver:</strong>{" "}
                    {purchaseDetails.accountHolderName}
                  </p>
                  <p>
                    <strong>Bank:</strong> {purchaseDetails.bankName}
                  </p>
                </div>

                <div className="space-y-2">
                  <p>
                    <strong>Kontonummer:</strong>{" "}
                    {purchaseDetails.accountNumber}
                  </p>
                  <p>
                    <strong>Beløp å overføre:</strong>{" "}
                    {purchaseDetails.totalInvestment.toLocaleString("no-NO")} kr
                  </p>
                  <p>
                    <strong>Melding:</strong> {purchaseDetails.name} -{" "}
                    {purchaseDetails.shareCount}
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
                &ldquo;Kjære {purchaseDetails.name}, Takk for din investering i{" "}
                {purchaseDetails.companyName}. Vi er glade for å ha deg med på
                laget som aksjonær. Din støtte er avgjørende for vår vekst, og
                vi ser frem til å dele vår suksess med deg. Hvis du har
                spørsmål, ikke nøl med å ta kontakt. Med vennlig hilsen,{" "}
                {purchaseDetails.founderName}, CEO,{" "}
                {purchaseDetails.companyName}&rdquo;
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
            Du har tegnet aksjer i {purchaseDetails.companyName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 bg-green-100 p-4 rounded-lg">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Aksjer tegnet</h3>
              <p className="text-2xl font-bold">{purchaseDetails.shareCount}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Pris per aksje</h3>
              <p className="text-2xl font-bold">
                {purchaseDetails.pricePerShare} kr
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">Total investering</h3>
              <p className="text-2xl font-bold">
                {purchaseDetails.totalInvestment.toLocaleString("no-NO")} kr
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-700">
              Investeringsdetaljer
            </h3>
            <div className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Investor:</strong> {purchaseDetails.name}
                </p>
                <p>
                  <strong>E-post:</strong> {purchaseDetails.email}
                </p>
              </div>
              <div>
                <p>
                  <strong>Selskap:</strong> {purchaseDetails.companyName}
                </p>
                <p>
                  <strong>CEO:</strong> {purchaseDetails.founderName}
                </p>
              </div>
            </div>
          </div>

          {renderStep()}

          <div className="flex items-center space-x-2 text-green-700">
            <Mail className="h-5 w-5" />
            <p>
              En investeringsbekreftelse er sendt til {purchaseDetails.email}
            </p>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Kjøpsdato: {purchaseDetails.purchaseDate}</p>
          </div>
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
              onClick={viewPortfolio}
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
