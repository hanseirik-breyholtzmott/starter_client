import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

//config
import { applicationName, appConfig } from "@/config";

//Shadn
import { Toaster } from "@/components/ui/toaster";

//Provider
import { AuthWrapper } from "./hooks/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: applicationName,
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords:
    "next.js, starter kit, saas, ecommerce, digital products, saas code kit, indie hacking, indie hacker kit, micro saas, entrepreneurship, Code Starter Kit, SaaS Product Launch, Code Documentation Tutorial, Beginner Coding Kit, Start-up SaaS Kit, Coding Guides and Resources, Video Tutorials for Coding, Beginner SaaS Guide, Launch your First SaaS, Step-by-step Coding Kit, SaaS Launch Kit, Software as a Service Starter, Easy Code Launch Kit, Coding Skills for SaaS, Starter Kit for SaaS, Code, Document, Launch, Comprehensive Coding Starter Kit, Master SaaS Product Launch, SaaS Documentation Tutorial, First-Time Coders Kit, SaaS coding course, Initiate SaaS Journey, Seamless SaaS Launch Guide, First SaaS Product Guidance, Bootstrap SaaS Tutorial, Ultimate SaaS Starter Pack, Learning Guide for SaaS, DIY SaaS Kit, Code your SaaS Product, All-in-one Coding Starter Kit",
  description:
    "The code kit to help you quickly setup an online store and sell your digital assets without a middleman skipping off the top of your profits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}