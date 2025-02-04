"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const personalInfoSchema = z.object({
  name: z.string(),
  birthDate: z.string(),
  streetAddress: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(4, "Postal code must be 4 digits"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  phoneNumber: z.string().min(8, "Phone number is required"),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

const defaultValues: Partial<PersonalInfoValues> = {
  name: "Breyholtz-Mott, Hans-Eirik",
  birthDate: "20.07.2000",
  streetAddress: "Vardesvingen 76B",
  postalCode: "5141",
  city: "FYLLINGSDALEN",
  country: "Norge",
  phoneNumber: "40 22 33 94",
};

export function PersonalInfoForm() {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  function onSubmit(data: PersonalInfoValues) {
    console.log(data);
  }

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Navn</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>Hentet automatisk fra BankID</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fødselsdato</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>Hentet automatisk fra BankID</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Gatenavn og nummer
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter your street address</p>
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <FormLabel>Postnummer</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Poststed</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Land</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg land" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Norge">Norge</SelectItem>
                    <SelectItem value="Sverige">Sverige</SelectItem>
                    <SelectItem value="Danmark">Danmark</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefonnummer</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center px-3 border rounded-l-md bg-muted">
                      <span className="text-sm">🇳🇴 +47</span>
                    </div>
                    <Input {...field} className="rounded-l-none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Lagre endringer</Button>
        </form>
      </Form>
    </TooltipProvider>
  );
}
