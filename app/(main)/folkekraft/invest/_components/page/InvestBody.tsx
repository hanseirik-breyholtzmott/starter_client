import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import confetti from "canvas-confetti";
import { Form } from "@/components/ui/form";
import { useInvestment } from "@/app/hooks/InvestContext";
import { useInvestmentConfirmation } from "@/app/hooks/InvestmentConfirmationContext";
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
import { useAuth } from "@/app/hooks/AuthContext";

export default function InvestmentBody() {
  const router = useRouter();
  const { setInvestmentDetails } = useInvestmentConfirmation();
  const {
    shareAmount,
    setShareAmount,
    entityType,
    setEntityType,
    idNumber,
    setIdNumber,
    termsAccepted,
    setTermsAccepted,
    activePerks,
    companyData,
  } = useInvestment();

  const form = useForm();
  const [error, setError] = React.useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { user } = useAuth();

  // Memoize the validation thresholds
  const minShares = React.useMemo(() => {
    if (!companyData) return 0;
    return Math.ceil(
      companyData.investmentDetails.investmentMinimum /
        companyData.investmentDetails.sharePrice
    );
  }, [companyData]);

  const maxShares = React.useMemo(() => {
    if (!companyData) return 0;
    return Math.floor(
      companyData.investmentDetails.investmentMaximum /
        companyData.investmentDetails.sharePrice
    );
  }, [companyData]);

  useEffect(() => {
    if (!companyData) return;

    const numValue = shareAmount;
    if (numValue < minShares) {
      setError(
        `Antall aksjer kan ikke være mindre enn ${minShares.toFixed(0)}`
      );
    } else if (numValue > maxShares) {
      setError(`Antall aksjer kan ikke være mer enn ${maxShares.toFixed(0)}`);
    } else {
      setError("");
    }
  }, [shareAmount, minShares, maxShares, companyData]);

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

  const handleConfirmInvestment = () => {
    setShowConfirmDialog(false);

    const purchaseDate = new Date().toLocaleDateString("no-NO");
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    setInvestmentDetails({
      purchasedShares: shareAmount,
      pricePerShare: companyData?.investmentDetails.sharePrice || 0,
      totalInvestment:
        shareAmount * (companyData?.investmentDetails.sharePrice || 0),
      investorName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.email || "",
      purchaseDate,
      dueDate: dueDate.toLocaleDateString("no-NO"),
      companyDetails: {
        name: companyData?.companyName || "",
        ceo: companyData?.ceo || "",
        address: "Kanalveien 107, 5058 BERGEN",
        orgNumber: "830068112",
        bankDetails: {
          accountNumber:
            companyData?.companyDetails?.bankDetails.accountNumber ||
            "32082799299",
          bankName:
            companyData?.companyDetails?.bankDetails.bankName ||
            "SpareBank 1 Sør-Norge",
          accountHolder:
            companyData?.companyDetails?.bankDetails.accountHolder ||
            "Folkekraft AS",
        },
      },
    });

    handleConfetti();
    router.push("/folkekraft/investment-confirmation");
  };

  const handleShareNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const number = parseInt(value) || 0;
    setShareAmount(number);
  };

  const handleIdNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    const maxLength = entityType === "private" ? 11 : 9;
    setIdNumber(value.slice(0, maxLength));
  };

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
      shareAmount > 0 &&
      entityType &&
      isIdNumberValid() &&
      termsAccepted
    );
  }, [error, shareAmount, entityType, idNumber, termsAccepted]);

  const investmentAmount =
    shareAmount && companyData
      ? (shareAmount * companyData.investmentDetails.sharePrice).toFixed(0)
      : "";

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
                            value={shareAmount}
                            onChange={(e) => {
                              field.onChange(e);
                              handleShareNumberChange(e);
                            }}
                            placeholder="Antall aksjer"
                            className={`mb-2 text-xl px-4 py-4 h-14 rounded-lg ${
                              shareAmount && error ? "border-red-500" : ""
                            }`}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {shareAmount > 0 && error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                  {activePerks.length > 0 && (
                    <p className="text-green-500 text-sm mt-1 hidden">
                      Aktive perks:{" "}
                      {activePerks.map((perk) => perk.title).join(", ")}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 mb-4">Investeringsbeløp</p>
                  <Input
                    type="text"
                    placeholder="Beregnet beløp"
                    value={investmentAmount ? `${investmentAmount} kr` : ""}
                    disabled
                    className="mb-2 text-xl px-4 py-4 h-14 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Terms section */}
          <div className="">
            <h2 className="text-3xl font-bold mb-2">Vilkår</h2>
            <Card className="mt-8 rounded-xl">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {companyData?.terms.map((term) => (
                    <li key={term.id} className="text-sm p-2 rounded-lg">
                      {term.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <CardFooter className="bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-start">
                  <div className="flex items-center pt-6">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              id="terms"
                              checked={termsAccepted}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                setTermsAccepted(checked as boolean);
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <label htmlFor="terms">
                              Jeg aksepterer vilkårene
                            </label>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardFooter>
              </label>
            </Card>
            <div>
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
                      Du er i ferd med å investere {shareAmount} aksjer for{" "}
                      {investmentAmount
                        ? `${parseInt(investmentAmount).toLocaleString(
                            "no-NO"
                          )}`
                        : "0"}{" "}
                      kr. Er du sikker på at du vil fortsette?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmDialog(false)}
                    >
                      Avbryt
                    </Button>
                    <Button
                      onClick={handleConfirmInvestment}
                      className="bg-[#59C9B9] hover:bg-[#4BA89B]"
                    >
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
