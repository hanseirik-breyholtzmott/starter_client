"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthContext } from "@/app/hooks/AuthContext";
import { JwtPayload } from "jsonwebtoken";
import { Input } from "@/components/ui/input";

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

const FormSchema = z.object({
  email: z.string().min(5).email("This is not a valid email."),
});

type Props = {};

const ForgotPassword = (props: Props) => {
  const { forgotPassword } = useAuthContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    forgotPassword(values.email);
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
              name="email"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>Forgot password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your email to your account to reset your
                    password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Reset your Password</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPassword;
