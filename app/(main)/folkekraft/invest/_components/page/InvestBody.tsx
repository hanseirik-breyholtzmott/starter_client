"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import { Form } from "@/components/ui/form";
import { useInvestment, InvestmentDetails } from "@/app/hooks/InvestContext";
import { useAuth } from "@/app/hooks/AuthContext";
import { formatCurrency } from "@/lib/helperFunctions";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

const INVESTMENT_TERMS = [
  {
    id: 1,
    text: "Investering i unoterte aksjer innebærer høy risiko. Det er viktig at jeg som investor leser investeringstilbudet nøye og gjør meg egen formening om hvilken risiko den eventuelle investeringen innebærer for meg.",
  },
  {
    id: 2,
    text: "Jeg gir med dette min fullmakt til styreleder i utsteder til å tegne aksjer på mine vegne under fremsatte vilkår i forbindelse med vedtak om kapitalutvidelse i selskapets generalforsamling.",
  },
  {
    id: 3,
    text: "Jeg bekrefter at jeg har satt meg inn i investeringstilbudet, og aksepterer risikoen denne investeringen innebærer.",
  },
  {
    id: 4,
    text: "Alle økonomiske bidrag må overholde gjeldende lover, inkludert regler om hvitvasking av penger. Midler fra ulovlige aktiviteter vil bli avvist. Vi forbeholder oss retten til å returnere midler som mistenkes for å bryte disse reglene.",
  },
];

export default function InvestmentBody() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    numberOfShares,
    setNumberOfShares,
    entityType,
    setEntityType,
    idNumber,
    setIdNumber,
    termsAccepted,
    setTermsAccepted,
    activePerks,
    companyData,
    minSharePurchase,
    maxSharePurchase,
    setInvestmentDetails,
  } = useInvestment();

  console.log("companyData", companyData);
  console.log("numberOfShares", numberOfShares);
  console.log("entityType", entityType);
  console.log("idNumber", idNumber);
  console.log("termsAccepted", termsAccepted);
  console.log("minSharePurchase", minSharePurchase);

  const form = useForm();
  const [error, setError] = React.useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Memoize the validation thresholds
  const minShares = React.useMemo(() => {
    if (!companyData) return 0;
    return companyData.investmentDetails.minSharePurchase;
  }, [companyData]);

  const maxShares = React.useMemo(() => {
    if (!companyData) return 0;
    return companyData.investmentDetails.maxSharePurchase;
  }, [companyData]);

  const isIdNumberValid = () => {
    if (entityType === "private") {
      return idNumber.length === 11;
    } else if (entityType === "entity") {
      return idNumber.length === 9;
    }
    return false;
  };

  const isFormValid = React.useMemo(() => {
    return (
      !error &&
      numberOfShares >= 300 &&
      entityType &&
      isIdNumberValid() &&
      termsAccepted
    );
  }, [error, numberOfShares, entityType, idNumber, termsAccepted]);

  // Authentication check effect
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("postLoginRedirect", "/folkekraft/invest");
      router.push("/sign-in");
    }
  }, [isAuthenticated, router]);

  // Share amount validation effect
  useEffect(() => {
    if (!companyData) return;

    if (numberOfShares < minShares) {
      setError(
        `Antall aksjer kan ikke være mindre enn ${minShares.toFixed(0)}`
      );
    } else if (numberOfShares > maxShares) {
      setError(`Antall aksjer kan ikke være mer enn ${maxShares.toFixed(0)}`);
    } else {
      setError("");
    }
  }, [numberOfShares, minShares, maxShares, companyData]);

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = (values: any) => {
    console.log("InvestmentBody handleSubmit called");
    console.log(values.terms);
  };

  const handleConfirmInvestment = async () => {
    try {
      setShowConfirmDialog(false);

      if (
        !companyData?.companyDetails?.bankDetails ||
        !user ||
        !numberOfShares
      ) {
        console.error("Missing required data");
        return;
      }

      const totalAmount =
        numberOfShares * (companyData.investmentDetails.sharePrice || 0);

      const investmentDetails: InvestmentDetails = {
        investorName: "Hans-Eirik",
        purchasedShares: numberOfShares,
        pricePerShare: companyData.investmentDetails.sharePrice,
        totalInvestment: totalAmount,
        purchaseDate: new Date().toISOString(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        companyDetails: {
          name: companyData.companyName || "Folkekraft AS",
          ceo: companyData.companyDetails.ceo || "",
          bankDetails: {
            accountNumber:
              companyData.companyDetails.bankDetails.accountNumber || "",
            bankName: companyData.companyDetails.bankDetails.bankName || "",
            accountHolder:
              companyData.companyDetails.bankDetails.accountHolder || "",
          },
        },
      };

      setInvestmentDetails(investmentDetails);
      handleConfetti();
    } catch (error) {
      console.error("Error in handleConfirmInvestment:", error);
    }
  };

  const handleShareNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const number = parseInt(value) || 0;
    console.log("New number of shares:", number); // Debug log
    setNumberOfShares(number);
  };

  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const maxLength = entityType === "private" ? 11 : 9;
    setIdNumber(value.slice(0, maxLength));
  };

  const getInvestmentAmount = React.useMemo(() => {
    if (!companyData) return formatCurrency(0, 0, false);

    const sharePrice = companyData.investmentDetails.sharePrice;
    const amount = numberOfShares * sharePrice;

    console.log("Investment calculation:", {
      shares: numberOfShares,
      price: sharePrice,
      total: amount,
    }); // Debug log

    return formatCurrency(amount, 0, false);
  }, [numberOfShares, companyData]);

  // Rest of your component remains the same until the terms section
  return (
    <div className="w-full md:w-2/3 mb-40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-44"
        >
          {/* Investment amount section */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Investeringsbeløp</h2>
            <div className="flex flex-col gap-6">
              <div className="my-4">
                <FormField
                  control={form.control}
                  name="entityType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                        Investeringstype
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setEntityType(value);
                        }}
                        value={entityType}
                      >
                        <FormControl>
                          <SelectTrigger className="mb-2 text-xl px-4 py-4 h-14 rounded-lg">
                            <SelectValue placeholder="Velg investeringstype" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="private">
                            Megselv / privatperson
                          </SelectItem>
                          <SelectItem value="entity">Selskap</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ID Number section */}
              <div>
                <FormField
                  control={form.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                        {entityType === null || entityType === ""
                          ? "Skriv inn fødselsnummer eller organisasjonsnummer"
                          : entityType === "private"
                          ? "Skriv inn fødselsnummer"
                          : "Skriv inn organisasjonsnummer"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={idNumber}
                          onChange={(e) => {
                            field.onChange(e);
                            handleIdNumberChange(e);
                          }}
                          placeholder={
                            entityType === "entity"
                              ? "Organisasjonsnummer (9 siffer)"
                              : "Fødselsnummer (11 siffer)"
                          }
                          className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                        />
                      </FormControl>
                      {entityType && !isIdNumberValid() && (
                        <p className="text-red-500 text-sm mt-1">
                          {entityType === "private"
                            ? "Fødselsnummer må være 11 siffer."
                            : "Organisasjonsnummer må være 9 siffer."}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Share number input */}
              <div className="grid grid-cols-2 gap-4">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="shareNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                          Antall aksjer
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={numberOfShares}
                            onChange={(e) => {
                              field.onChange(e);
                              handleShareNumberChange(e);
                            }}
                            placeholder="Antall aksjer"
                            className={`mb-2 text-xl px-4 py-4 h-14 rounded-lg ${
                              numberOfShares && error ? "border-red-500" : ""
                            }`}
                          />
                        </FormControl>
                        {numberOfShares > 0 && error && (
                          <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                {/* Investment amount section */}
                <div>
                  <p className="text-gray-600 mb-4">Investeringsbeløp</p>
                  <Input
                    type="text"
                    value={getInvestmentAmount}
                    disabled
                    className="mb-2 text-xl px-4 py-4 h-14 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms section */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Vilkår</h2>
            <Card className="mt-8 rounded-xl">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {INVESTMENT_TERMS.map((term) => (
                    <li key={term.id} className="text-sm p-2 rounded-lg">
                      {term.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all ease-in-out duration-300">
                <FormField
                  control={form.control}
                  name="termsAccepted"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={termsAccepted}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            setTermsAccepted(checked as boolean);
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Jeg aksepterer vilkårene</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </CardFooter>
            </Card>
            <div>
              {/* Confirm button and dialog */}
              <Button
                type="button"
                disabled={!isFormValid}
                className="w-full py-6 text-xl mt-6"
                onClick={() => setShowConfirmDialog(true)}
              >
                Bekreft investeringen
              </Button>

              <Dialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bekreft din investering</DialogTitle>
                    <DialogDescription>
                      Du er i ferd med å investere {numberOfShares} aksjer for{" "}
                      {getInvestmentAmount}. Er du sikker på at du vil
                      fortsette?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmDialog(false)}
                    >
                      Avbryt
                    </Button>
                    <Button onClick={handleConfirmInvestment}>
                      Bekreft investering
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
