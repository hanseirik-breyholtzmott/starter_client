import React from "react";
import Link from "next/link";
import Image from "next/image";

//Shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-col gap-4 justify-center">
            <div
              className={cn(
                "w-fit group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Investor relations</span>
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Interessert i å investere i Folkekraft?
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-[600px]">
              Vi hjelper deg med å finne riktig investeringsmulighet.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Ta kontakt
            </Button>
            <Button size="lg" className="w-full sm:w-auto">
              Investeringsmuligheter
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative mt-8 lg:mt-0">
          <div className="overflow-hidden rounded-tl-[100px] rounded-tr-[10px] rounded-br-[100px] rounded-bl-[10px] bg-slate-500">
            <Image
              src="/placeholder.svg"
              alt="Team collaborating in a modern office"
              width={800}
              height={600}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
