//Nextjs
import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

//Uploadthing
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

//Shadn
import { Toaster } from "@/components/ui/toaster";

//Provider
import { AuthWrapper } from "./hooks/AuthContext";

//Analytics
import StarterAnalytics from "@/analytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

//Public
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SEO_TITLE,
  icons: {
    icon: process.env.NEXT_PUBLIC_SEO_ICON,
    shortcut: process.env.NEXT_PUBLIC_SEO_SHORTCUT_ICON,
    apple: process.env.NEXT_PUBLIC_SEO_APPLE_ICON,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  keywords: process.env.NEXT_PUBLIC_SEO_KEYWORDS,
  description:
    "The code kit to help you quickly setup an online store and sell your digital assets without a middleman skipping off the top of your profits.",
  openGraph: {
    url: process.env.NEXT_PUBLIC_URL_BASE + "/bestill",
    type: "website",
    title: process.env.NEXT_PUBLIC_SEO_TITLE,
    description: process.env.NEXT_PUBLIC_SEO_DESCRIPTION,
    images: [
      {
        url: "https://www.yourwebsite.com/image.jpg", //LinkedIn page image
        width: 1200,
        height: 627,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Page Title for LinkedIn",
    description: "This is a premade description for LinkedIn.",
    images: ["https://www.yourwebsite.com/image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StarterAnalytics />
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
          {/* Vercel Speed Insights */}
          <SpeedInsights />
          {/* Vercel Analytics */}
          <Analytics />
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
