"use client";

import React, { useState, useMemo } from "react";

//Auth
import { useAuthContext } from "@/app/hooks/AuthContext";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

//Shadcn
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

//Components
import InvestmentBody from "./investmentBody";
import InvestmentSidebar from "./investmentSidebar";

//Form
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

// Interface for individual perk
interface Perk {
  title: string;
  value: number;
  description: string;
}

// Interface for investment details
interface InvestmentDetails {
  investmentMinimum: number;
  investmentMaximum: number;
  investmentRecommendation: number;
  investmentPurchaseRight: number;
}

// Interface for individual term
interface Term {
  id: number;
  text: string;
  link: string | null;
  url: string | null;
}

// Main interface for the API response
interface InvestmentData {
  title: string;
  icon: string;
  description: string;
  investmentDetails: InvestmentDetails;
  perks: Perk[];
  terms: Term[];
}

interface InvestmentLayoutProps {
  investmentData: InvestmentData;
}

export default function InvestmentLayout({
  investmentData,
}: InvestmentLayoutProps) {
  //Auth
  const { user } = useAuthContext();

  //Toast
  const { toast } = useToast();

  //useState
  const [shareNumber, setShareNumber] = useState("");
  const [activePerks, setActivePerks] = useState<Perk[]>([]);
  const [entityType, setEntityType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  //const
  const { investmentDetails, perks } = investmentData;

  //Form
  const formSchema = z.object({
    shareNumber: z
      .string()
      .min(
        investmentDetails.investmentMinimum - 1,
        `Minste antall aksjer er ${investmentDetails.investmentMinimum}.`
      )
      .max(
        investmentDetails.investmentMaximum,
        `Maksimal antall aksjer er ${investmentDetails.investmentMaximum}.`
      ),
    entityType: z.string().min(1, "Legg til hvem du investerer som."),
    idNumber: z.string().min(9).max(11),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shareNumber: "",
      entityType: "",
      idNumber: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async () => {
    const data = {
      userId: user?.id,
      ssn: Number(idNumber),
      shareNumber: Number(shareNumber),
      termsAccepted: termsAccepted,
    };

    try {
      const response = await axiosInstance.post(
        "/api/campaign/1/purchase-shares",
        data
      );

      if (response.status === 200) {
        toast({
          title: "Takk for din investering!",
          description:
            "Vi setter stor pris på at du har investert i Folkekraft.",
        });
      } else {
        toast({
          title: "Det har skjedd en feil!",
          variant: "destructive",
          description: "Ta kontakt med oss for å få hjelp.",
          action: (
            <Link href="mailto:lg@folkekraft.no">
              <ToastAction altText="Ta kontakt">Ta kontakt</ToastAction>
            </Link>
          ),
        });
      }
      form.reset();
    } catch (error) {
      console.log(error);

      // TODO: Add an error toast notification here
    }

    //TODO: Add toast notification here

    //TODO: Add Vipps payment here
  };

  const updatePerksBasedOnShares = (numShares: number) => {
    const newActivePerks = perks.filter((perk) => numShares >= perk.value);
    setActivePerks(newActivePerks);
  };

  const handleShareNumberChange = (value: string) => {
    setShareNumber(value);
    form.setValue("shareNumber", value);
    updatePerksBasedOnShares(Number(value));
  };

  const handlePerkChange = (selectedPerk: Perk) => {
    const value = selectedPerk.value.toString();
    setShareNumber(value);
    form.setValue("shareNumber", value);
    updatePerksBasedOnShares(selectedPerk.value);
  };

  const isFormValid = useMemo(() => {
    const numShares = Number(shareNumber);

    return (
      shareNumber !== "" &&
      entityType !== "" &&
      ((entityType === "private" && idNumber.length === 11) ||
        (entityType === "entity" && idNumber.length === 9)) &&
      numShares >= investmentDetails.investmentMinimum &&
      numShares <= investmentDetails.investmentMaximum &&
      termsAccepted
    );
  }, [shareNumber, entityType, idNumber, termsAccepted, investmentDetails]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between container mx-auto px-4 py-8 min-h-screen gap-6">
      <InvestmentBody
        form={form}
        shareNumber={shareNumber}
        onShareNumberChange={handleShareNumberChange}
        activePerks={activePerks}
        entityType={entityType}
        setEntityType={(value) => {
          setEntityType(value);
          form.setValue("entityType", value);
        }}
        idNumber={idNumber}
        setIdNumber={(value) => {
          setIdNumber(value);
          form.setValue("idNumber", value);
        }}
        termsAccepted={termsAccepted}
        setTermsAccepted={(value) => {
          setTermsAccepted(value);
          form.setValue("termsAccepted", value);
        }}
        isFormValid={isFormValid}
        onSubmit={onSubmit}
        investmentDetails={investmentDetails}
      />
      <InvestmentSidebar
        activePerks={activePerks}
        onPerkChange={handlePerkChange}
        perks={perks}
      />
    </div>
  );
}
