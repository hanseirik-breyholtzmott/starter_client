"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatCurrency } from "@/lib/helperFunctions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthContext } from "@/app/hooks/AuthContext";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  investor: z
    .string()
    .min(9, { message: "Du må skrive enten fødselnr eller orgnr" })
    .max(11, {
      message: "Du må skrive enten fødselnr eller orgnr",
    }),
  numberOfShares: z
    .number()
    .min(25, { message: "Number of shares must be greater than 24" })
    .max(10000, { message: "Number of shares must be no more than 10,000" }),
  terms: z.boolean().default(false).optional(),
  risks: z.boolean().default(false).optional(),
});

type Props = {};

interface StepProps {
  number: number;
  label: string;
  active: boolean;
}

const OnboardingMultistep = (props: Props) => {
  const { user } = useAuthContext();
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      investor: "",
      terms: false,
      risks: false,
    },
  });

  const submitButton = form.watch("terms") && form.watch("risks");

  const onSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/purchaseshares", {
        userId: user?.id,
        numberOfShares: form.watch("numberOfShares"),
        purchasePrice: form.watch("numberOfShares") * 8,
        ssn: form.watch("investor"),
      });

      const { success, message } = response.data;

      if (!success) {
        toast({
          title: "En fail har skjedd.",
          description: "Ta kontakt med lg@folkekraft.no",
        });
        return;
      }

      toast({
        title: "Du har fått kjøpt akjser i Folkekraft",
        description: message,
      });
      handleNext();
      return;
    } catch (error) {
      console.log("Error with pruchasing shares", error);
    }
  };

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        const numberOfSharesValid = form.watch("numberOfShares") > 24;
        const investor = form.watch("investor");

        const investorValid = /^.{9}$|^.{11}$/.test(investor);

        return numberOfSharesValid && investorValid;
      case 2:
        return submitButton && form.watch("numberOfShares") > 24;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto md:min-h-[560px]">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-4">Folkekraft AS</h1>
              <h2 className="text-xl font-semibold mb-4">Kjøp Aksjer</h2>
              <p className="mb-4">
                Før du bekrefter din tegning bør du forsikre deg om at du
                forstår risikoen dette innebærer. Ikke invester mer enn det du
                har råd til å tape.
              </p>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="investor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2">
                        Tegn på vegne av (påkrevd)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Fødselnr eller orgnr" />
                      </FormControl>
                      <FormDescription>
                        Skriv inn fødselnr eller orgnr.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Pris per aksje</label>
                <Input defaultValue="8,00 kr" readOnly />
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="numberOfShares"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block mb-2">
                          Antall aksjer
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormItem>
                    <FormLabel className="block mb-2">Beløp</FormLabel>
                    <FormControl>
                      <Input
                        value={`${(form.watch("numberOfShares") || 0) * 8} kr`}
                        readOnly
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => form.setValue("numberOfShares", Number(100))}
                  type="button"
                >
                  Minimum
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    form.setValue(
                      "numberOfShares",
                      Number(form.watch("numberOfShares")) + 125
                    )
                  }
                  type="button"
                >
                  + 1 000 kr
                </Button>
              </div>
            </div>
            <Card className="flex-1 p-6 bg-blue-50">
              <h3 className="text-xl font-semibold mb-4">Risiko</h3>
              <p className="mb-4">
                Investering i unoterte aksjer innebærer høy risiko. Det er
                viktig at du som investor leser investeringstilbudet nøye og
                gjør deg din egen formening om hvilken risiko den eventuelle
                investeringen innebærer for deg. Ikke invester mer enn det du
                har råd til å tape.
              </p>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="mx-auto p-4 md:min-h-[560px]">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="flex-1 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Din tegning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emisjon:</span>
                      <span className="font-medium">Folkekraft AS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Antall aksjer:</span>
                      <span className="font-medium">
                        {form.watch("numberOfShares")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris per aksje:</span>
                      <span className="font-medium">8,00 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tegnet av:</span>
                      <span className="font-medium">
                        {form.watch("investor")}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-600">Totalbeløp:</span>
                        <span className="text-xl font-bold">{` ${formatCurrency(
                          form.watch("numberOfShares") * 8
                        )}`}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="mt-4 p-0 h-auto text-blue-600"
                    onClick={() => setStep(1)}
                    type="button"
                  >
                    Endre beløp
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Bekreftelse
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms">
                        Jeg gir med dette min fullmakt til styreleder i utsteder
                        til å tegne aksjer på mine vegne under fremsatte vilkår
                        i forbindelse med vedtak om kapitalutvidelse i
                        selskapets generalforsamling
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FormField
                      control={form.control}
                      name="risks"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="risks">
                        Jeg bekrefter at jeg har satt meg inn i
                        investeringstilbudet, og aksepterer risikoen denne
                        investeringen innebærer.
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="mx-auto p-4 md:min-h-[560px]">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="flex-1 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-700">
                    Betaling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aspernatur laborum omnis amet iure maiores sapiente atque
                      possimus.
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Banknr:</span>
                      <span className="font-medium">3208 27 99299</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Melding:</span>
                      <span className="font-medium">
                        Emisjon {form.watch("investor").slice(-5)}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Button className="mt-6" type="button">
                        Last ned Bekreftelse
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Emisjon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Selskap:</span>
                      <span className="font-medium">Folkekraft AS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Organisasjonsnr:</span>
                      <span className="font-medium">830 068 112</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adresse:</span>
                      <span className="font-medium">C. Sundts gate 55</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Antall aksjer:</span>
                      <span className="font-medium">
                        {form.watch("numberOfShares")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris per aksje:</span>
                      <span className="font-medium">8,00 kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Navn:</span>
                      <span className="font-medium">
                        Hans-Eirik Breyholtz-Mott
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tegnet av:</span>
                      <span className="font-medium">
                        {form.watch("investor")}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-600">Totalbeløp:</span>
                        <span className="text-xl font-bold">{` ${formatCurrency(
                          form.watch("numberOfShares") * 8
                        )}`}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return <>En fail har skjedd</>;
    }
  };

  const Step: React.FC<StepProps> = ({ number, label, active }) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
          active ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
        }`}
      >
        {number}
      </div>
      <span
        className={`text-sm ${
          active ? "text-blue-500 font-semibold" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <section className="w-full max-w-4xl mx-auto">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-start">
          <Step
            number={1}
            label="Kjøp aksjer"
            active={step == 1 ? true : false}
          />
          <div className="flex-grow border-t-2 border-gray-300 mt-4 mx-4"></div>
          <Step
            number={2}
            label="Bekreftelse"
            active={step == 2 ? true : false}
          />
          <div className="flex-grow border-t-2 border-gray-300 mt-4 mx-4"></div>
          <Step
            number={3}
            label="Kvittering"
            active={step == 3 ? true : false}
          />
        </div>
      </div>
      <Form {...form}>
        <form>
          {renderStep()}
          <div className="w-full flex space-x-5 justify-center">
            {step !== 3 ? (
              <>
                <Button
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="w-[100px]"
                  type="button"
                >
                  Previous
                </Button>

                {step < totalSteps - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="w-[100px]"
                    type="button"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={onSubmit}
                    disabled={!isStepValid()}
                    className="w-[100px]"
                    type="button"
                  >
                    Bekreft
                  </Button>
                )}
              </>
            ) : (
              // New button for step 3
              <Button
                onClick={() => router.push("/dashboard/transactions")}
                className="w-[180px]"
                type="button"
              >
                View transactions
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default OnboardingMultistep;
