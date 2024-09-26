import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
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

export default function StepThree({ form, handleRefresh }: Props) {
  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="w-full  space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <Link href="#" onClick={handleRefresh}>
              <X size={44} className="text-gray-400 cursor-pointer mr-4" />
            </Link>
            <Progress value={48} className="w-full bg-[#59C9B9]" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Hvem er vår ny medeier?
          </h2>
          <p className="text-gray-400">
            Vet du at du får <strong>1 000kr</strong> i aksje til Folkekraft?
          </p>
        </div>

        {/* Form */}
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Fornavn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fornavn . . ."
                      {...field}
                      className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredValue = value.replace(
                          /[^a-zA-ZæøåÆØÅ\s-]/g,
                          ""
                        );
                        field.onChange(filteredValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Etternavn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Etternavn . . ."
                      {...field}
                      className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredValue = value.replace(
                          /[^a-zA-ZæøåÆØÅ\s-]/g,
                          ""
                        );
                        field.onChange(filteredValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Telefonnummer
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Telefonnummer . . ."
                      {...field}
                      value={field.value || "+47"}
                      className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                      onChange={(e) => {
                        let value = e.target.value;
                        if (!value.startsWith("+47")) {
                          value = "+47";
                        }
                        value = value.replace(/[^+\d]/g, "");
                        if (value.length > 11) {
                          value = value.slice(0, 11);
                        }
                        field.onChange(value);
                      }}
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Backspace" || e.key === "Delete") &&
                          e.currentTarget.selectionStart !== null &&
                          e.currentTarget.selectionStart <= 3
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Personnummer
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2007 . . ."
                      {...field}
                      className="mb-2 text-xl px-4 py-4 h-14 rounded-lg"
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^0-9]/g, "");

                        if (value.length > 11) {
                          value = value.slice(0, 11);
                        }

                        field.onChange(value);
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
  );
}
