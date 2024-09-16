"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

//Shadcn
import { cn } from "@/lib/utils";
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

//Components

//Helper functions
import { handleCopy } from "@/lib/helperFunctions";

//Icons
import { Star, Share2, Copy, Mail } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

//Data
const tabsData = [
  { id: "about", label: "Beskrivelse", count: null },
  { id: "caplist", label: "Aksjeeiebok", count: null },
  { id: "team", label: "Team", count: null },
  { id: "documents", label: "Dokumenter", count: null },
];

type Props = {};

const Campaign = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/folkekraft");
  }, [router]);
  //UseStates
  const [showButton, setShowButton] = useState(false);
  const [amount, setAmount] = useState("0");
  const [btcAmount, setBtcAmount] = useState("0");
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  //Contants
  const urlToShare = "https://invest.folkekraft.no/emisjon"; // The URL you want to share
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    urlToShare
  )}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    urlToShare
  )}`;

  //Functions
  const copyToClipboard = async () => {
    console.log("copying to clipboard");
    const success = await handleCopy(urlToShare);
    if (success) {
      console.log("copied to clipboard");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowButton(scrollPosition > 600); // Show button after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-[2000px] relative">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
        {/* Mobile button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-white p-2 border-t border-gray-200 md:hidden block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-12">
            Invester i Folkekraft
          </Button>
          <p className="text-center text-gray-600 m-2 text-sm">
            Minstetegning er <strong>2 400kr</strong>
          </p>
        </div>
        {/* Desktop button */}
        <Button
          className={`
          fixed bottom-6 bg-blue-600 hover:bg-blue-700 px-8 h-16 rounded-xl text-xl text-white z-50 hidden md:block
          transition-all duration-300 ease-in-out
          ${showButton ? "right-6" : "-right-full"}
        `}
        >
          Invester i Folkekraft
        </Button>

        {/* Header Description */}
        <p className="text-gray-600 mb-4">
          Empowering investors to grow wealth through alternative real estate
          investing
        </p>
        {/* Tags */}
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
        {/* Main arousel */}
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
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
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
          {/* CAMPAGN INFO */}
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

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl h-16 hidden md:block">
                Hjelp oss å styrke Medeierskap
              </Button>
              <p className="text-center text-gray-600 mt-2 hidden md:block">
                Minstetegning er <strong>2 400kr</strong>
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
                        <a
                          href={facebookShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base flex flex-row items-center gap-2">
                            <FaFacebook className="text-blue-600 text-xl" />
                            Facebook
                          </li>
                        </a>
                        <a
                          href={linkedInShareUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <li className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base flex flex-row items-center gap-2">
                            <FaLinkedin className="text-blue-800 text-xl" />
                            LinkedIn
                          </li>
                        </a>
                        <li className="w-full">
                          <button
                            className="hover:bg-slate-100 p-4 cursor-pointer rounded-md text-base w-full text-left flex flex-row items-center gap-2"
                            onClick={copyToClipboard}
                            type="button"
                          >
                            <Copy className="text-blue-600 text-xl" />
                            {isCopied ? "Kopiert!" : "Kopier lenke"}
                          </button>
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full container mx-auto">
          <div className="flex flex-col">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList className="h-auto p-0 bg-transparent flex flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
                <div className="flex flex-row gap-8">
                  {tabsData.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={cn(
                        "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                        activeTab === tab.id &&
                          "active:text-blue-600 border-blue-600"
                      )}
                    >
                      {tab.label}
                      {tab.count !== null && (
                        <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                          {tab.count}
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </div>
                <a
                  href="mailto:lg@folkekraft.no"
                  className="flex items-center text-xl text-gray-500 hover:text-gray-700"
                >
                  <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
                  Spørsmål?
                </a>
              </TabsList>
              <TabsContent value="about">
                <div className=" py-8 mt-6 flex">
                  {/* Sticky hyperlinks column */}
                  <div
                    className={`
          w-48 mr-8 fixed top-64 self-start hidden 
          transition-all duration-300 ease-in-out
          ${showButton ? "left-44" : "-left-full"}
        `}
                  >
                    <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                      <h2 className="font-bold mb-4">Meny</h2>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="#konsept"
                            className="text-primary hover:underline block py-1"
                          >
                            Konsept
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#utfordring"
                            className="text-primary hover:underline block py-1"
                          >
                            Utfordring
                          </Link>
                        </li>
                        {/* ... other list items ... */}
                        <li>
                          <Link
                            href="#markedsmulighet"
                            className="text-primary hover:underline block py-1"
                          >
                            Markedsmulighet
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#strømavtalen"
                            className="text-primary hover:underline block py-1"
                          >
                            Strømavtalen
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#restrukturering"
                            className="text-primary hover:underline block py-1"
                          >
                            Restrukturering
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#kapital"
                            className="text-primary hover:underline block py-1"
                          >
                            Kapital
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#emisjon"
                            className="text-primary hover:underline block py-1"
                          >
                            Emisjon
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Main content area */}
                  <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse">
                    <div className="h-full flex flex-col gap-10">
                      <div>
                        <h3 id="konsept" className="text-2xl font-bold mb-4">
                          Konsept: strømkunde og medeier
                        </h3>
                        <p className="mb-6">
                          Alle kunder blir aksjonærer i Folkekraft. Vi gir også
                          aksjepremie til kunder som verver andre. Kundene får
                          en enkel strømavtale basert på månedsavgift og påslag
                          på strømmen.
                        </p>
                        <p className="mb-6">
                          Folkekraft minner om konseptet til store
                          samvirkeforetak som Coop og Felleskjøpet, men vi gir
                          aktivt eierskap og exit-muligheter.
                          Forretningsmodellen bidrar til verdiskapning gjennom
                          økt kundelojalitet og lavere markedsføringskostnader
                          gjennom bl.a. verveordning.
                        </p>
                        <p className="mb-6">
                          Du kan også kjøpe aksjer i Folkekraft som investor.
                          Folkekraft kjøper tilbake aksjer fra investorer for å
                          gi dem til nye kunder mens vi vokser. Investorer vil
                          dermed få flere exit-muligheter.
                        </p>
                      </div>
                      <div>
                        <h3 id="utfordring" className="text-2xl font-bold mb-4">
                          Utfordring i strømbransjen
                        </h3>
                        <p className="mb-4">
                          Forbrukerrådet mener at mange{" "}
                          <a href="https://e24.no/energi-og-klima/i/1BV4GK/forbrukerraadet-mener-stroemkundene-blir-lurt">
                            strømkunder blir lurt
                          </a>
                          . Tilbud kompliseres for å skjule høye kostnader.
                          Dette har ført til{" "}
                          <a href="https://www.bytt.no/strom/stromleverandorer/zbgv/misfornoyde-stromkunder-med-klagestorm">
                            klagestorm mot strømleverandører
                          </a>
                          . Vi bygger tillit ved at kundene er medeiere. I vårt
                          første driftsår har vi sett at Folkekraft får lojale
                          kunder som anskaffes til lav kostnad. Målet er at
                          kundene skal bli største aksjonærgruppe.
                        </p>
                      </div>
                      <div>
                        <h3
                          id="markedsmulighet"
                          className="text-2xl font-bold mb-4"
                        >
                          Markedsmulighet for Folkekraft
                        </h3>
                        <p className="mb-4">
                          Det norske strømmarkedet er på ca. 3.2 mill. brukere.
                          Vi har som mål å få 100.000 kunder. Altså en
                          markedsandel på noe over 3 %. Det finnes ca. 80
                          strømleverandører i Norge. Konkurransen om kundene er
                          stor. Inntektsmarginene er små på strømsalg og
                          produktet er relativt generisk. De fleste
                          strømselskaper har store salg- og
                          markedsføringsorganisasjoner som tilfører kunden lite
                          utover høyere sluttkostnader.
                        </p>
                      </div>
                      <div>
                        <h3 id="utfordring" className="text-2xl font-bold mb-4">
                          Strømavtalen i Folkekraft
                        </h3>
                        <p className="mb-4">
                          Aksjeverdi: Alt vi estimerer å tjene på kunden gis i
                          aksjer første året. Det tilsvarer ca. 1000 kr i
                          aksjeverdi.
                        </p>
                      </div>
                      <div>
                        <h3 id="utfordring" className="text-2xl font-bold mb-4">
                          Restrukturering av Folkekraft
                        </h3>
                        <p className="mb-4">
                          Etter etablering og Folkefinansieringskampanje i 2023
                          har Folkekraft gjort betydelige endringer i
                          organisasjonens struktur. Nye lederskap har bidratt
                          til økt effektivitet og kostnadsreduksjon. Selskapet
                          har også forbedret sine IT-systemer, som inkluderer en
                          ny kundeapp og faktureringssystem, og har fjernet
                          gamle systemer som hindret vekst.
                        </p>
                      </div>
                      <div>
                        <h3 id="utfordring" className="text-2xl font-bold mb-4">
                          Kapital og exit
                        </h3>
                        <p className="mb-4">
                          Selskapet planlegger tre emisjoner fremover, med sikte
                          på å hente kapital fra både profesjonelle investorer
                          og kunder. Allerede ved ca. 8.000–9.000 kunder vil
                          selskapet være selvfinansiert frem mot 100.000 kunder.
                          Inntektsgrunnlaget vil primært komme fra
                          strømleveranser, men også mersalgsprodukter.
                          Investorer i Folkekraft får flere muligheter til å
                          realisere gevinst før børsnoteringen. Selskapet
                          estimerer en aksjekurs på 57 kroner og en
                          selskapsverdi på 330 millioner kroner innen 2028.
                          Deltagelse i denne emisjonen vil i så tilfelle gi 7
                          ganger tilbake på investert beløp.
                        </p>
                      </div>
                      <div>
                        <h3 id="utfordring" className="text-2xl font-bold mb-4">
                          Om pågående emisjon
                        </h3>
                        <div className="bg-blue-500 max-h-[800px] max-w-[800px] w-full h-full rounded-lg">
                          f
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 min-w-[320px]">
                      <Card>
                        <CardHeader>
                          <CardTitle>Bli Folkekraft kunde</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">1 000kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Bli Folkekraft kunde
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Verv Folkekraft</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">300kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Kopier verve lenke
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
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
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Investere 10 000kr
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="caplist">
                <div className=" py-8 mt-6 flex">
                  {/* Main content area */}
                  <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
                    <div className="h-full flex flex-col gap-10 w-full">
                      <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold mb-2">
                            Dokumenter
                          </h2>
                          <span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit.
                          </span>
                          <Separator className="max-w-[200px] mx-auto h-[2px] bg-blue-600 mt-4" />
                        </div>

                        <div className="flex flex-col space-y-6">
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Folkekraft Emisjon 2024
                              </p>
                              <p>Folkekraft emisjonspresentasjon</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/13ccf2e2-4eb3-44c0-bc0d-93de7e633b5d-oymfrz.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"folkekraft_emisjonpresentasjon.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Financial model Folkekraft
                              </p>
                              <p>Finansiell prognosemodell</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/e76d4dbf-b22f-4e26-88aa-a70df1fe5c56-ry0du0.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"finansiell_prognosemodell.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Verdsettelsesmodell
                              </p>
                              <p>Fremtidig verdsettelsesmodell</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/4a34c5b0-da63-4db8-9bab-f34c69466acd-n1l38s.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"verdsettelse.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Folkekraft AS Årsrapport
                              </p>
                              <p>Folkekraft AS_årsrapport 2023</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/19ee23c6-c325-4b78-ad47-f8c45945f640-991f3d.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"folkekraft_as_årsrapport_2023.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Notat disput med Props
                              </p>
                              <p>Notat om disput med IT-leverandør</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/b049b0f0-9886-4eb9-8a93-db4a93bc7c78-m39y0.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"notat_disput_med_props.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Reklamasjon Havskraft
                              </p>
                              <p>Reklamasjon Havskraft</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/7b70d7ae-2b3b-4edc-bd53-cb262ad5d0d2-zc0vpm.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"reklamasjon_havskraft.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 min-w-[320px]">
                      <Card>
                        <CardHeader>
                          <CardTitle>Bli Folkekraft kunde</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">1 000kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Bli Folkekraft kunde
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Verv Folkekraft</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">300kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Kopier verve lenke
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
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
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Investere 10 000kr
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="team">
                <div className=" py-8 mt-6 flex">
                  {/* Main content area */}
                  <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
                    <div className="h-full flex flex-col gap-10 w-full text-center">
                      <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Team</h2>
                        <span>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit.
                        </span>
                        <Separator className="max-w-[200px] mx-auto h-[2px] bg-blue-600 mt-4" />
                      </div>
                      <div className="w-full flex lg:flex-row flex-col gap-10 justify-evenly">
                        <div className="text-center flex flex-col items-center">
                          <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                            <Image
                              src={
                                "https://utfs.io/f/1c66qeb7SCm5DEQjjbqgux84eWln59LNpt0zoXOyqZTfrQsb"
                              }
                              alt="Krishan"
                              width={160}
                              height={160}
                            />
                          </div>
                          <h2 className="text-xl font-semibold mt-2">
                            Krishan
                          </h2>
                          <p className="text-gray-600">Interim Daglig leder</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                            <Image
                              src={
                                "https://utfs.io/f/1c66qeb7SCm5WzMe6W7GXeyrAJp6MRFLHSIvDUfYTGm3kxq4"
                              }
                              alt="Hans-Eirik"
                              width={160}
                              height={160}
                            />
                          </div>

                          <h2 className="text-xl font-semibold mt-2">
                            Hans-Eirik
                          </h2>
                          <p className="text-gray-600">Driftsansvarlig</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                            <Image
                              src={
                                "https://utfs.io/f/1c66qeb7SCm5WzkUiPGXeyrAJp6MRFLHSIvDUfYTGm3kxq41"
                              }
                              alt="Lasse"
                              width={160}
                              height={160}
                            />
                          </div>

                          <h2 className="text-xl font-semibold mt-2">Lasse</h2>
                          <p className="text-gray-600">Salgsansvarlig</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>

                        <div className="text-center flex flex-col items-center">
                          <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

                          <h2 className="text-xl font-semibold mt-2">Name</h2>
                          <p className="text-gray-600">role</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 min-w-[320px]">
                      <Card>
                        <CardHeader>
                          <CardTitle>Bli Folkekraft kunde</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">1 000kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Bli Folkekraft kunde
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Verv Folkekraft</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">300kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Kopier verve lenke
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
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
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Investere 10 000kr
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className=" py-8 mt-6 flex">
                  {/* Main content area */}
                  <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
                    <div className="h-full flex flex-col gap-10 w-full">
                      <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
                        <div className="mb-8">
                          <h2 className="text-3xl font-bold mb-2">
                            Dokumenter
                          </h2>
                          <span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit.
                          </span>
                          <Separator className="max-w-[200px] mx-auto h-[2px] bg-blue-600 mt-4" />
                        </div>

                        <div className="flex flex-col space-y-6">
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Folkekraft Emisjon 2024
                              </p>
                              <p>Folkekraft emisjonspresentasjon</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/13ccf2e2-4eb3-44c0-bc0d-93de7e633b5d-oymfrz.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"folkekraft_emisjonpresentasjon.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Financial model Folkekraft
                              </p>
                              <p>Finansiell prognosemodell</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/e76d4dbf-b22f-4e26-88aa-a70df1fe5c56-ry0du0.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"finansiell_prognosemodell.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Verdsettelsesmodell
                              </p>
                              <p>Fremtidig verdsettelsesmodell</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/4a34c5b0-da63-4db8-9bab-f34c69466acd-n1l38s.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"verdsettelse.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Folkekraft AS Årsrapport
                              </p>
                              <p>Folkekraft AS_årsrapport 2023</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/19ee23c6-c325-4b78-ad47-f8c45945f640-991f3d.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"folkekraft_as_årsrapport_2023.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Notat disput med Props
                              </p>
                              <p>Notat om disput med IT-leverandør</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/b049b0f0-9886-4eb9-8a93-db4a93bc7c78-m39y0.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"notat_disput_med_props.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <p className="font-semibold text-left">
                                Reklamasjon Havskraft
                              </p>
                              <p>Reklamasjon Havskraft</p>
                            </div>
                            <Link
                              href={
                                "https://utfs.io/f/7b70d7ae-2b3b-4edc-bd53-cb262ad5d0d2-zc0vpm.pdf"
                              }
                              className="cursor-pointer underline"
                              target="_blank"
                              download={"reklamasjon_havskraft.pdf"}
                            >
                              Last ned
                            </Link>
                          </div>
                          <Separator />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 min-w-[320px]">
                      <Card>
                        <CardHeader>
                          <CardTitle>Bli Folkekraft kunde</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">1 000kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Bli Folkekraft kunde
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Verv Folkekraft</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg font-semibold mb-2">
                            Du vil få i aksjer
                            <span className="text-2xl ml-2">300kr</span>
                          </p>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Kopier verve lenke
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="">
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
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12 my-4">
                            Investere 10 000kr
                          </Button>
                          <p className="text-sm text-gray-600 mt-4 mb-4">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Campaign;
