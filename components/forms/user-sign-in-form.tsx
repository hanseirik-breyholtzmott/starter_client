"use client";

import React, { useState, useEffect } from "react";

//Nextjs
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

//Icons
import { Eye, EyeOff } from "lucide-react";

type Props = {};

const UserSignInForm = (props: Props) => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get URL parameters using the Web API
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (status) {
      let errorMessage = message || "An unexpected error occurred.";
      switch (status) {
        case "cancelled":
          errorMessage = "Login was cancelled. Please try again.";
          break;
        case "auth_failed":
          errorMessage = "Could not authenticate with Vipps. Please try again.";
          break;
        case "error":
          errorMessage = message || "An unexpected error occurred. Please try again.";
          break;
        default:
          errorMessage = message || errorMessage;
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("[SignInForm] Starting form submission");
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await signIn("email", values.email, values.password);
      console.log("[SignInForm] Sign in result:", {
        success: result?.success,
        hasUser: !!result?.user,
        status: result?.status,
      });

      if (!result?.success) {
        let errorMessage = "Please check your email and password";
        switch (result?.status) {
          case "cancelled":
            errorMessage = "Login was cancelled. Please try again.";
            break;
          case "auth_failed":
            errorMessage =
              "Could not authenticate with Vipps. Please try again.";
            break;
          case "error":
            errorMessage =
              result?.message ||
              "An unexpected error occurred. Please try again.";
            break;
          default:
            errorMessage = result?.message || errorMessage;
        }

        // Show error toast
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: errorMessage,
        });

        // Optionally set focus back to password field
        form.setFocus("password");
      }
    } catch (error: any) {
      console.error("[SignInForm] Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button
        className="mt-4 w-full h-12 text-lg bg-[#FF5B24] hover:bg-[#FF5B24] flex items-center justify-center"
        onClick={() => signIn("vipps")}
      >
        Logg inn med{" "}
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Show form-level errors */}
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}
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
                <FormLabel className="text-gray-600 mb-2  font-normal flex flex-row justify-between items-center">
                  <span className="text-lg font-normal">Passord</span>
                  <Link
                    href="/forgot-password"
                    className="underline underline-offset-4 hover:text-primary mb-2"
                  >
                    Glemt passord?
                  </Link>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="passord"
                      type={showPassword ? "text" : "password"}
                      {...field}
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
          <div></div>

          <Button
            className="mt-4 w-full h-12 text-lg bg-[#00263D]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logg inn..." : "Logg inn"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserSignInForm;
