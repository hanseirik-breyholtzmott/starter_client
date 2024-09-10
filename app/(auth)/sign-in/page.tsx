"use client";

import Link from "next/link";

//Form
import { z } from "zod";
import UserSignInForm from "@/components/forms/user-sign-in-form";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Velkommen til Folkekraft sin egenutviklede emisjonsportal.
              Bygget fra grunnen av for en sømløs og effektiv prosess, vil denne
              portalen bli en del av Folkekrafts produktportefølje. Vi er stolte
              av å tilby en skreddersydd løsning for våre aksjonærer.&rdquo;
            </p>
            <footer className="text-sm">Hans-Eirik Breyholtz-Mott</footer>
          </blockquote>
        </div>
      </div>
      <section className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to sign in
            </p>
          </div>

          <UserSignInForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/forgot-password"
              className="underline underline-offset-4 hover:text-primary mb-2"
            >
              Forget your password?
            </Link>
            <br />
          </p>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&#39;t have an account yet?{" "}
            <Link
              href="/sign-up"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign up here
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
