"use client";

import React from "react";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Auth hook
import { useAuthContext } from "@/app/hooks/AuthContext";

//Shadn
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
import { Button } from "@/components/ui/button";

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
  
  return (
    <section className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-[560px] mx-auto border p-4 rounded-lg">
        <Form {...form}>
          <form
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
            <Button onClick={()=> forgotPassword(form.watch("email"))} type="button">Reset your Password</Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPassword;
