"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

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
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left section */}
        <div className="flex flex-col justify-center px-4 lg:px-6 py-12 space-y-8">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Invester i det{" "}
              <span className="relative">
                du tror på
                <div className="absolute bottom-2 -z-10 left-0 right-0 h-3 bg-green-200/60" />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Plattform for kjøp av aksjer i unoterte selskap
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-zinc-900 text-white hover:bg-zinc-800"
            >
              Se investeringsmuligheter
            </Button>
            <Button size="lg" variant="outline">
              Mitt selskap søker egenkapital
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="relative bg-[#1e2c3c] text-white">
          <div className="absolute inset-0">
            {[
              "/placeholder.svg?height=600&width=800",
              "/placeholder.svg?height=600&width=800&text=Image+2",
              "/placeholder.svg?height=600&width=800&text=Image+3",
            ].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Background ${index + 1}`}
                className={`h-full w-full object-cover opacity-20 transition-opacity duration-1000 absolute inset-0 ${
                  currentImageIndex === index ? "opacity-20" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <div className="relative h-full flex items-center p-4 lg:p-6">
            <Card className="w-full bg-transparent text-white border-none">
              <CardHeader>
                <p className="text-sm font-medium px-3 py-1 bg-white/10 w-fit rounded-md">
                  AKTUELL KAPITALUTVIDELSE
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Invester i grønn teknologi
                </h2>
                <p className="text-xl">
                  Enua utvikler innovativ ladestasjonsteknologi.
                </p>
                <Button
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Les mer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
