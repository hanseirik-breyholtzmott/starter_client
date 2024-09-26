"use client";

import React, { useState, useEffect } from "react";

//Components
import { Input } from "@/components/ui/input";

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

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { Lock, ChevronDown } from "lucide-react";

interface Perk {
  title: string;
  value: number;
  description: string;
}

interface InvestmentDetails {
  investmentMinimum: number;
  investmentMaximum: number;
  investmentRecommendation: number;
  investmentPurchaseRight: number;
}

type Props = {
  form: UseFormReturn<any>;
  shareNumber: string;
  onShareNumberChange: (value: string) => void;
  activePerks: Perk[];
  entityType: string;
  setEntityType: (value: string) => void;
  idNumber: string;
  setIdNumber: (value: string) => void;
  investmentDetails: InvestmentDetails;
};

export default function InvestmentAmount({
  form,
  shareNumber,
  onShareNumberChange,
  activePerks,
  entityType,
  setEntityType,
  idNumber,
  setIdNumber,
  investmentDetails,
}: Props) {
  const sharePrice = 8;
  const [error, setError] = React.useState("");

  useEffect(() => {
    const numValue = Number(shareNumber);
    if (numValue < 300) {
      setError("Antall aksjer kan ikke være mindre enn 300");
    } else if (numValue > 10000) {
      setError("Antall aksjer kan ikke være mer enn 10000");
    } else {
      setError("");
    }
  }, [shareNumber]);

  const handleShareNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    onShareNumberChange(value);
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

  const investmentAmount = shareNumber
    ? (Number(shareNumber) * sharePrice).toFixed(0)
    : "";

  return (
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
                      value={shareNumber}
                      onChange={(e) => {
                        field.onChange(e);
                        handleShareNumberChange(e);
                      }}
                      placeholder="Antall aksjer"
                      className={`mb-2 text-xl px-4 py-4 h-14 rounded-lg ${
                        shareNumber && error ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {shareNumber && error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
            {activePerks.length > 0 && (
              <p className="text-green-500 text-sm mt-1 hidden">
                Aktive perks: {activePerks.map((perk) => perk.title).join(", ")}
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
  );
}
