import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { HelpCircle, Zap, X } from "lucide-react";

type Props = {
  form: UseFormReturn<any>;
  handleRefresh: (e: React.MouseEvent) => void;
};

export default function StepFour({ form, handleRefresh }: Props) {
  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="w-full  space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <Link href="#" onClick={handleRefresh}>
              <X size={44} className="text-gray-400 cursor-pointer mr-4" />
            </Link>
            <Progress value={64} className="w-full bg-[#59C9B9]" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">Hvor bor du?</h2>
          <p className="text-gray-400">
            Om du har flere målepunkter, får det flere aksjer.
          </p>
        </div>

        {/* Form */}
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Adresse
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adresse . . ."
                      {...field}
                      className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^a-zA-ZæøåÆØÅ\s\-0-9]/g, "");
                        if (value.length > 50) {
                          value = value.slice(0, 50);
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                      Postnummer
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Postnummer . . ."
                        {...field}
                        className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                        onChange={(e) => {
                          let value = e.target.value;

                          // Allow only digits and limit to 4 characters
                          value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

                          if (value.length > 4) {
                            value = value.slice(0, 4); // Limit to 4 digits
                          }

                          field.onChange(value); // Update the field value with the processed value
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                      Poststed
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adresse . . ."
                        {...field}
                        className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                        onChange={(e) => {
                          let value = e.target.value;

                          // Allow only Norwegian characters, spaces, and some common address characters like hyphens and numbers
                          value = value.replace(/[^a-zA-ZæøåÆØÅ\s\-0-9]/g, "");

                          // Limit to 50 characters
                          if (value.length > 50) {
                            value = value.slice(0, 50);
                          }

                          field.onChange(value); // Update the field value with the processed value
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
