//Nextjs
import Link from "next/link";
import Image from "next/image";

//Shadcn
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

//Form
import UserSignUpForm from "@/components/forms/user-sign-up-form";

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/sign-in"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-[#00263D]" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="https://utfs.io/f/1c66qeb7SCm5GckaVSl0asLcm8Djn3uxXCWtE5I7ypeVUrb4"
            alt="Folkekraft Logo"
            width={300}
            height={300}
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Velkommen til Folkekraft emisjonsportal. Bygget fra grunnen
              av for en sømløs og effektiv prosess. Folkekraft er stolte av å
              tilby en skreddersydd løsning for våre aksjonærer.&rdquo;
            </p>
            <footer className="text-sm">Hans-Eirik Breyholtz-Mott</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Lag en konto</h1>
            <p className="text-sm text-muted-foreground">
              Opprett en konto med e-post og passord
            </p>
          </div>

          <UserSignUpForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            Ved å opprette en konto, godtar du våre{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Bruksvilkår
            </Link>{" "}
            og{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Personvern
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
