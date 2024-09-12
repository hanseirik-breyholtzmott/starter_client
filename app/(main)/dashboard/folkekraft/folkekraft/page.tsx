"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

//Icons
import { Star, Share2 } from "lucide-react";

type Props = {};

const Campaign = (props: Props) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 100); // Show button after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-[2000px] relative">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center font-bold rounded mr-2">
              F
            </div>
            <h1 className="text-3xl font-bold">Folkekraft AS</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <button
          className={`
          fixed bottom-6 bg-blue-500 px-6 py-4 rounded-xl text-white z-50
          transition-all duration-300 ease-in-out
          ${showButton ? "right-6" : "-right-full"}
        `}
        >
          Invester i Folkekraft
        </button>
        <p className="text-gray-600 mb-4">
          Empowering investors to grow wealth through alternative real estate
          investing
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {["MEDEIERSKAP", "B2C", "FINTECH", "EMISJON", "STRØM"].map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-900 text-white  rounded-lg mb-4 max-w-[650px] max-h-[520px] w-full h-full">
              {/* Video */}
              <Carousel className="max-w-[650px] max-h-[520px] w-full h-full">
                <CarouselContent className=" h-[520px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="p-1 h-full">
                        <Card className="h-full">
                          <CardContent className="flex items-center justify-center p-6 h-full">
                            <span className="text-6xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="" />
                <CarouselNext />
              </Carousel>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-sm hidden md:block"
            >
              <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-3xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="flex-1">
            <div className="bg-white p-8 rounded-lg shadow mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-500 font-bold">
                  &#128640; FUNDING
                </span>
                <Popover>
                  <PopoverTrigger>
                    <span className=" p-3 px-5 hover:bg-gray-300 bg-gray-100 rounded-lg">
                      i
                    </span>
                  </PopoverTrigger>
                  <PopoverContent>
                    Place content for the popover here.
                  </PopoverContent>
                </Popover>
              </div>
              <h3 className="text-4xl font-bold my-4 ">4 200 000 kr</h3>
              <p className="text-gray-600 mb-2">
                16 % samlet inn av maksbeløpet på 8 millioner
              </p>
              <Progress value={53} className="mb-4" />
              <div className="grid grid-cols-2 gap-4 my-4 py-8 rounded-lg">
                <div>
                  <h4 className="text-3xl font-bold">368</h4>
                  <p className="text-gray-600">Investors</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold">49 days</h4>
                  <p className="text-gray-600">igjen for å investere</p>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-16">
                Hjelp oss å styrke Medeierskap
              </Button>
              <p className="text-center text-gray-600 mt-2">
                Minstetegning er 2 400kr
              </p>
              <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-8">
                <div className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                    Bli Folkekraft kunde
                  </Button>
                </div>
                <div className="w-full">
                  <Popover>
                    <PopoverTrigger className="w-full  text-white text-lg h-12">
                      <div className="w-full text-semibold bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 rounded-md flex items-center justify-center">
                        Del Folkekraft
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <ul className="flex flex-col gap-2">
                        <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base">
                          Facebook
                        </li>
                        <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base">
                          LinkedIn
                        </li>
                        <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base">
                          Kopier lenke
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-10" />
      </div>
      <div className="container mx-auto px-4 py-8 flex relative">
        {/* Sticky hyperlinks column */}
        <div className="w-48 mr-8 sticky top-8 self-start">
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h2 className="font-bold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#problem"
                  className="text-primary hover:underline block py-1"
                >
                  Problem
                </Link>
              </li>
              <li>
                <Link
                  href="#solution"
                  className="text-primary hover:underline block py-1"
                >
                  Solution
                </Link>
              </li>
              {/* ... other list items ... */}
              <li>
                <Link
                  href="#summary"
                  className="text-primary hover:underline block py-1"
                >
                  Summary
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 id="problem" className="text-2xl font-bold mb-4">
              Konsept: strømkunde og medeier
            </h3>
            <p className="mb-4">
              In the wake of changes in securities law, technological advances,
              and instability in public markets,{" "}
              <strong>retail investors are allocating to alternatives</strong>.
            </p>
            <p className="mb-4">
              Among investors age 21-43,{" "}
              <strong>
                real estate is the most popular and attractive category
              </strong>{" "}
              among alternatives.
            </p>
            <p className="mb-6">
              Yet accessing this asset class through traditional means requires,
              for most investors, either a substantial investment of capital,
              effort, and risk, or an acceptance of REITs and funds served up by
              Wall Street, with their attendant fees, lockup periods, and
              opacity.
            </p>
            <div className="bg-blue-500 h-[800px] w-[800px] rounded-lg"></div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Bli Folkekraft kunde</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">
                  Du vil få i aksjer
                  <span className="text-2xl ml-2">1 000kr</span>
                </p>
                <Tabs defaultValue="how-it-works">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="how-it-works">
                      Se hvordan det fungerer
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="how-it-works">
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolore voluptas vitae incidunt.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Verv Folkekraft</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">
                  Du vil få i aksjer
                  <span className="text-2xl ml-2">300kr</span>
                </p>
                <Tabs defaultValue="how-it-works">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="how-it-works">
                      Se hvordan det fungerer
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="how-it-works">
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Dolore voluptas vitae incidunt.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Investor tilbud</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold mb-2">
                  Investerer du mer enn
                  <span className="text-2xl ml-2">10 000kr</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Vil du få en rabatt på strømavtalen
                </p>
                <Button variant="outline" className="w-full mb-4">
                  Form C SEC.gov
                </Button>
                <h3 className="font-semibold mb-2">Company documents</h3>
                <ul className="space-y-2">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Subscription Agreement
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Groundfloor Finance Form C.pdf
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Campaign;
