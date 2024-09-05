"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "@/app/hooks/AuthContext";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface DecodedToken extends JwtPayload {
  token?: string;
}

//Shadn
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, "Your password has to be atleast 8 characters long."),
  passwordConfirm: z
    .string()
    .min(8, "Your password has to be atleast 8 characters long."),
});

type Props = {};

const ResetPassword = (props: Props) => {
  const { resetPassword } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use useEffect to handle redirection
  useEffect(() => {
    if (!searchParams.get("token")) {
      router.push("/sign-in");
    }
  }, [router, searchParams]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (values.password === values.passwordConfirm) {
      const token = searchParams.get("token") as string;
      resetPassword(values.password, token);
    } else {
      toast({
        variant: "destructive",
        title: "Passwords dont match",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    }
  }
  return (
    <section className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-[560px] mx-auto border p-4 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 flex flex-col mx-auto justify-center text-center space-y-8"
          >
            <h2 className="text-xl font-semibold">Reset password</h2>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>Create new password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm new password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create new password</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ResetPassword;
