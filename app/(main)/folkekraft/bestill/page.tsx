"use client";

import React, { useState, useEffect, useRef } from "react";

//Shadcn
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

//Icons
import { ChevronRight, HelpCircle, Zap } from "lucide-react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

type Props = {};

const Order = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
    undefined
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const accordionRef = useRef<HTMLDivElement>(null);

  const HourlyRateContent = () => (
    <div className="space-y-4">
      <p>Energy prices are updated hourly based on market rates.</p>
      <p>Current rate: 0.15 NOK/kWh</p>
      <p>Average rate (last 24h): 0.18 NOK/kWh</p>
    </div>
  );

  useEffect(() => {
    if (activeAccordion && accordionRef.current) {
      const accordionElement =
        accordionRef.current.querySelector(`[data-state="open"]`);
      if (accordionElement) {
        accordionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeAccordion]);

  const handleAccordionChange = (value: string | undefined) => {
    setActiveAccordion(value === activeAccordion ? undefined : value);
  };

  //Steps
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-2xl w-full space-y-6 ">
            <div className="w-full  space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold flex items-center justify-center">
                  <Zap className="mr-2" /> Folkekraft
                </h1>
                <p className="text-gray-400">
                  Opplev medeierskap med Folkekraft - mer enn bare strøm.
                </p>
              </div>

              <Progress value={20} className="w-full bg-cyan-400" />

              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  Hvordan ønsker du å bestille Folkekraft?
                </h2>
                <p className="text-gray-400">
                  Make sure this is the address on which your energy deal should
                  be signed.
                </p>
              </div>

              <RadioGroup defaultValue="current-address">
                <Card className="bg-blue-800 border-cyan-400 border-2">
                  <RadioGroupItem
                    value="current-address"
                    id="current-address"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="current-address"
                    className="flex flex-col space-y-1 p-4 cursor-pointer"
                  >
                    <span className="font-medium text-gray-400">Vipps</span>
                  </label>
                </Card>
                <Card className="bg-blue-800 border-cyan-400 border-2">
                  <RadioGroupItem
                    value="current-address"
                    id="current-address"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="current-address"
                    className="flex flex-col space-y-1 p-4 cursor-pointer"
                  >
                    <span className="font-medium">Epost</span>
                  </label>
                </Card>
              </RadioGroup>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="max-w-2xl w-full space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold flex items-center justify-center">
                <Zap className="mr-2" /> Folkekraft
              </h1>
              <p className="text-gray-400">
                Opplev medeierskap med Folkekraft - mer enn bare strøm.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-white">
              <Card className="bg-blue-600 p-4">
                <h2 className="font-semibold text-white">Folkekraft fee</h2>
                <p className="text-xl text-white">49 NOK/per month</p>
              </Card>
              {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Card className="bg-blue-600 p-4 cursor-pointer">
                      <h2 className="font-semibold flex items-center text-white">
                        Timespotpris
                        <HelpCircle className="ml-2 h-4 w-4" />
                      </h2>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 text-white">
                    <DialogHeader>
                      <DialogTitle>Energy Hourly Rate</DialogTitle>
                    </DialogHeader>
                    <HourlyRateContent />
                  </DialogContent>
                </Dialog>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Card className="bg-gray-800 p-4 cursor-pointer">
                      <h2 className="font-semibold flex items-center">
                        Energy Hourly rate{" "}
                        <HelpCircle className="ml-2 h-4 w-4" />
                      </h2>
                    </Card>
                  </DrawerTrigger>
                  <DrawerContent className="bg-gray-800 text-white">
                    <DrawerHeader>
                      <DrawerTitle>Energy Hourly Rate</DrawerTitle>
                    </DrawerHeader>
                    <div className="p-4">
                      <HourlyRateContent />
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </div>

            <Card className="bg-gray-800 p-4 items-center justify-between hidden">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 p-2 rounded-md">
                  <div className="w-8 h-12 bg-gray-500 rounded-sm" />
                </div>
                <div>
                  <h3 className="font-semibold">Add your discounted Pulse</h3>
                  <p className="text-gray-400">
                    895 NOK <span className="line-through">1395 NOK</span>
                  </p>
                </div>
              </div>
              <Switch />
            </Card>

            <div className="space-y-4">
              <h3 className="font-semibold">Folkekraft features</h3>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-2"
                value={activeAccordion}
                onValueChange={handleAccordionChange}
              >
                <AccordionItem value="smart-charging" className="border-b-0">
                  <Card className="bg-blue-600">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-24">
                      <div className="flex items-center">
                        <Zap className="mr-2" /> Folkekraft aksjer 1 000kr
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                      Smart Charging optimizes your electric vehicle charging
                      based on energy prices and your schedule.
                    </AccordionContent>
                  </Card>
                </AccordionItem>

                <AccordionItem value="grid-rewards" className="border-b-0">
                  <Card className="bg-blue-600">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-24">
                      <div className="flex items-center">
                        <Zap className="mr-2" /> Verving få 300kr
                        <span className="ml-2 text-xs bg-teal-500 text-black px-2 py-1 rounded-full">
                          New!
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                      Smart Charging optimizes your electric vehicle charging
                      based on energy prices and your schedule.
                    </AccordionContent>
                  </Card>
                </AccordionItem>
                <AccordionItem
                  value="real-time-tracking"
                  className="border-b-0"
                >
                  <Card className="bg-blue-600">
                    <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-24">
                      <div className="flex items-center">
                        <Zap className="mr-2" /> Folkekraft strøm app
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                      Smart Charging optimizes your electric vehicle charging
                      based on energy prices and your schedule.
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl w-full space-y-6 ">
            <div className="w-full  space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold flex items-center justify-center">
                  <Zap className="mr-2" /> Folkekraft
                </h1>
                <p className="text-gray-400">
                  Opplev medeierskap med Folkekraft - mer enn bare strøm.
                </p>
              </div>

              <Progress value={30} className="w-full bg-cyan-400" />

              <div className="space-y-4">
                <h2 className="text-4xl font-bold leading-tight">
                  Når vil du starte din strømavtalen med Folkekraft?
                </h2>
                <p className="text-gray-400">
                  Make sure this is the address on which your energy deal should
                  be signed.
                </p>
              </div>

              <RadioGroup defaultValue="current-address">
                <Card className="bg-blue-800 border-cyan-400 border-2">
                  <RadioGroupItem
                    value="current-address"
                    id="current-address"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="current-address"
                    className="flex flex-col space-y-1 p-4 cursor-pointer"
                  >
                    <span className="font-medium">Tidligst 1. juli 2024</span>
                    <span className="text-gray-400">5004 BERGEN</span>
                  </label>
                </Card>
                <Card className="bg-blue-800 border-cyan-400 border-2">
                  <RadioGroupItem
                    value="current-address"
                    id="current-address"
                    className="peer sr-only"
                  />
                  <label
                    htmlFor="current-address"
                    className="flex flex-col space-y-1 p-4 cursor-pointer"
                  >
                    <span className="font-medium">Annet adresse</span>
                  </label>
                </Card>
              </RadioGroup>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      {renderStep()}
      <div className="w-full fixed bottom-0 bg-red-400 flex items-center justify-center p-4 border-t-2 border-gray-400">
        <div className="container max-w-[930px] mx-auto flex justify-end w-full">
          <Button
            className="w-full max-w-[360px] bg-white text-black hover:bg-gray-200 text-lg h-16"
            size="lg"
            type="button"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;

/*

<Button
          variant="link"
          className="w-full justify-between text-white hidden"
        >
          Read more about the Pulse <ChevronRight />
        </Button>

        */
