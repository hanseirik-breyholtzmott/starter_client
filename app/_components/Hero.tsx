"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

//MagicUI
import HyperText from "@/components/ui/hyper-text";

import { AnimatedBeamDemo } from "@/app/_components/AnimatedBeam";

export default function InvestmentHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 min-h-[90vh]">
        {/* Left section */}
        <div className="flex flex-col justify-center px-4 lg:px-6 py-12 space-y-8">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Invester i{" "}
              <span className="py-4">
                <HyperText
                  className="text-8xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  text="medeierskap"
                />
              </span>
              noe du kan{" "}
              <span className="border-b-4 border-green-500">stole på</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Fremtidens investeringsplattform for unoterte selskaper
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#investeringsmuligheter">
              <Button
                size="lg"
                className="bg-zinc-900 text-white hover:bg-zinc-800"
              >
                Se investeringsmuligheter
              </Button>
            </Link>
          </div>
        </div>

        {/* Right section */}
        <div className="relative bg-[#1e2c3c] text-white">
          <div className="relative h-full flex items-center p-4 lg:p-6">
            <Card className="w-full bg-transparent text-white border-none">
              <CardHeader>
                <p className="text-sm font-medium px-3 py-1 bg-white/10 w-fit rounded-md">
                  AKTUELL KAPITALUTVIDELSE
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Invester i fremtidens teknologi
                </h2>
                <p className="text-xl">
                  Vi driver utviklingen av neste generasjons strømteknologi i
                  Norge
                </p>
                <AnimatedBeamDemo />
              </CardContent>
            </Card>
          </div>
          {/* Dots/pagination indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className={`w-8 h-1 rounded ${
                  currentImageIndex === index ? "bg-white" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
