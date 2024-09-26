import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
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
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { HelpCircle, Zap, X } from "lucide-react";

//useMediaQuery
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

type Props = {
  form: UseFormReturn<any>;
  handleRefresh: (e: React.MouseEvent) => void;
};

export default function StepTwo({ form, handleRefresh }: Props) {
  //useRef
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const accordionRef = useRef<HTMLDivElement>(null);
  //useState
  const [open, setOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(
    undefined
  );
  //Functions
  const HourlyRateContent = () => (
    <div className="space-y-4">
      <p>
        Time spotpris er prisen du betaler for strøm time for time, basert på
        markedets tilbud og etterspørsel. Prisen kan variere gjennom dagen, ofte
        lavere om natten og høyere på dagtid. Med spotprisavtale betaler du den
        faktiske markedsprisen for hver time.
      </p>
    </div>
  );

  //useEffect
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

  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-between">
          <Link href="#" onClick={handleRefresh}>
            <X size={44} className="text-gray-400 cursor-pointer mr-4" />
          </Link>
          <Progress value={32} className="w-full bg-[#59C9B9]" />
        </div>
        <h1 className="text-4xl font-bold flex items-center justify-center pt-6">
          <Zap className="mr-2" /> Folkekraft
        </h1>
        <p className="text-gray-400">
          Opplev medeierskap med Folkekraft - mer enn bare strøm.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-white">
        <Card className="bg-[#00263D] p-4">
          <h2 className="font-semibold text-white">Folkekraft fee</h2>
          <p className="text-xl text-white">49 NOK/per month</p>
        </Card>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Card className="bg-[#00263D] p-4 cursor-pointer">
                <h2 className="font-semibold flex items-center text-white">
                  Timespotpris
                  <HelpCircle className="ml-2 h-4 w-4" />
                </h2>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-white text-[#00263D]">
              <DialogHeader>
                <DialogTitle>Timespotpris</DialogTitle>
              </DialogHeader>
              <HourlyRateContent />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Card className="bg-[#00263D] p-4 cursor-pointer">
                <h2 className="font-semibold flex items-center text-white">
                  Timespotpris <HelpCircle className="ml-2 h-4 w-4" />
                </h2>
              </Card>
            </DrawerTrigger>
            <DrawerContent className="bg-white text-[#00263D]">
              <DrawerHeader>
                <DrawerTitle>Time spotpris</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <HourlyRateContent />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

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
            <Card className="bg-[#00263D]">
              <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-16">
                <div className="flex items-center">
                  <Zap className="mr-2" /> Folkekraft aksjer 1 000kr
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                Vi er på samme lag. Både kunder og ansatte er medeiere. Du som
                kunde får 1 000kr i aksjer for hver målepunkt du har!
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="grid-rewards" className="border-b-0">
            <Card className="bg-[#00263D]">
              <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-16">
                <div className="flex items-center">
                  <Zap className="mr-2" /> Verving få opp til 1000kr i
                  aksjeverdi
                  <span className="ml-2 text-xs bg-[#59C9B9] text-white px-3 py-1 rounded-full">
                    Ny!
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                <p>
                  Vi øker vervepremien fra 300 kr til 1000 kr i aksjeverdi for
                  hver person du verver.
                </p>
                <br />
                <p>
                  Om du verver 5 personer får du strøm til vår kostpris i ett
                  helt år. Altså ingen påslag eller månedsavgift.
                </p>
                <br />
                <p>
                  Om du verver 10 kunder er du med i trekningen av hele 100.000
                  kr i aksjeverdi.
                </p>
                <br />
                <p>
                  Tilbudet gjelder bare ut oktober og det er maks 10 vervinger
                  på aksjonær.
                </p>
              </AccordionContent>
            </Card>
          </AccordionItem>
          <AccordionItem value="real-time-tracking" className="border-b-0">
            <Card className="bg-[#00263D]">
              <AccordionTrigger className="px-4 py-2 hover:no-underline text-white h-16">
                <div className="flex items-center">
                  <Zap className="mr-2" /> Folkekraft strøm app
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-2 text-gray-400 border-t-2 border-gray-700 p-4">
                Vi har Folkekraft strøm app. Der kan du se strømforbruk, faktura
                og snart vil aksjene dine komme der inne.
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
