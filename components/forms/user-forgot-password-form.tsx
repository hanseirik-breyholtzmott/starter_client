"use client";

import React, { useState } from "react";

//Auth
import { auth } from "@/app/hooks/AuthContext";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Shadcn
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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type Props = {};

export default function ForgotPasswordForm({}: Props) {
  const { forgotPassword } = auth();
  //useState
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await forgotPassword(data.email);
    } catch (error) {
      console.error("Error in forgot password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600 mb-2 text-lg font-normal">
                Epost
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="din@epost.no"
                  {...field}
                  className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="mt-4 w-full h-12 text-lg bg-[#00263D]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logg inn..." : "Logg inn"}
        </Button>
      </form>
    </Form>
  );
}
