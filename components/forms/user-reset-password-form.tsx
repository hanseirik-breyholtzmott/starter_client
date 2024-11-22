"use client";

import React, { useState } from "react";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

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

//Icons
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Props = {};

export default function ForgotPasswordForm({}: Props) {
  const { resetPassword } = useAuth();
  //useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token") || "";
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await resetPassword(data.password, token as string);
    } catch (error) {
      console.log("Error in forgot password:");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600 mb-2 text-lg font-normal">
                Nytt passord
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Passord"
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600 mb-2 text-lg font-normal">
                Bekreft passord
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Gjenta passord"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
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
          {isSubmitting ? "Endre passord..." : "Endre passord"}
        </Button>
      </form>
    </Form>
  );
}

/*

<div className="relative">
                      <Input
                        placeholder="passord"
                        type={showPassword ? "text" : "password"}
                        className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>*/
