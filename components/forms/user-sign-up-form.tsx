"use client";

import React, { useState } from "react";

//Nextjs
import Image from "next/image";

//Form
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

//Shadn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

//Icons
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
});

type Props = {};

const UserSignUpForm = (props: Props) => {
  const { toast } = useToast();
  const { signUp } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("[SignUpForm] Starting form submission");
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await signUp(
        "email",
        values.firstname,
        values.lastname,
        values.email,
        values.password
      );

      console.log("[SignUpForm] Sign up result:", {
        success: result?.success,
        status: result?.status,
      });

      if (!result?.success) {
        // Show error toast
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description:
            result?.message ||
            "Could not create your account. Please try again.",
        });

        // If it's an email-in-use error, focus the email field
        if (result?.message?.toLowerCase().includes("email")) {
          form.setFocus("email");
        }
      }
    } catch (error: any) {
      console.error("[SignUpForm] Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      console.log("[SignUpForm] Form submission completed");
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button
        className="mt-4 w-full h-12 text-lg bg-[#FF5B24] hover:bg-[#FF5B24] flex items-center justify-center"
        onClick={() => signUp("vipps")}
      >
        Opprett konto med{" "}
        <Image
          src="https://utfs.io/f/1c66qeb7SCm5Y0UTGtybcQKOgLiwrEyTUDXzp5sHV1kNR4d9"
          alt="Vipps"
          width={80}
          height={80}
        />
      </Button>
      <div className="flex items-center justify-center text-gray-600 text-sm">
        eller
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full relative space-y-4">
            <div className="flex flex-row gap-4 ">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                      Fornavn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Fornavn"
                        type="text"
                        className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                      Etternavn
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Etternavn"
                        type="text"
                        className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Epost
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="din@epost.com"
                      type="email"
                      className="mb-2 text-lg px-4 py-4 h-12 rounded-lg w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                    Passord
                  </FormLabel>
                  <FormControl>
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
              {isSubmitting ? "Oppretter konto..." : "Opprett konto"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserSignUpForm;
