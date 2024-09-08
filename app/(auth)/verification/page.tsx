"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

//Auth
import { useAuthContext } from "@/app/hooks/AuthContext";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type Props = {};

const Verification = (props: Props) => {
  const { verifyEmail } = useAuthContext();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      console.log(decoded);
      verifyEmail(decoded.token as string);
    }
  }, [verifyEmail]);

  /*
  const handleResendToken = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!isResendDisabled) {
      setIsResendDisabled(true)
      setResendTimer(60) // Set a 60-second cooldown
      try {
        await resendVerificationToken() // Assuming this function exists in your AuthContext
        // You might want to show a success message here
      } catch (error) {
        // Handle any errors, maybe show an error message
        console.error("Failed to resend verification token:", error)
      }
    }
  }*/

  function onSubmit(data: z.infer<typeof FormSchema>) {
    verifyEmail(data.pin);
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
