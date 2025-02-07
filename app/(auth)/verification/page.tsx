"use client";

import React, { useEffect, useState } from "react";

//Nextjs
import Link from "next/link";
import { useRouter } from "next/navigation";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type Props = {};

const Verification = (props: Props) => {
  const { verifyEmail } = useAuth();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //verifyEmail(data.pin);
  }
  return (
    <section className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-[560px] mx-auto border p-4 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 flex flex-col mx-auto justify-center text-center space-y-8"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Verify Code</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Verification;

/*

<div className="text-sm">
              Didn't receive the code?{" "}
              <Link
                href="#"
                onClick={handleResendToken}
                className={`text-blue-600 hover:underline ${
                  isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend verification token
                {/*isResendDisabled
                  ? `Resend in ${resendTimer}s`
                  : "Resend verification token"}
                  </Link>
                  </div>
                  */
