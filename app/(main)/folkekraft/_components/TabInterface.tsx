"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  FileText,
  Mail,
  Lightbulb,
  LucideIcon,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCampaign } from "@/app/hooks/CampaignContext";
import { debounce } from "lodash";

// Components
import KeyInformation from "./KeyInformation";
import FundingAlert from "./FundingAlert";
import SidebarNavigation from "./SidebarNavigation";
import ContentSection from "./ContentSection";
import { Button } from "@/components/ui/button";

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface Section {
  id: string;
  title: string;
}

interface ContentSectionProps {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: string;
  delay?: number;
}

interface Document {
  title: string;
  description: string;
  downloadUrl?: string;
}

interface DocumentListProps {
  documents: Document[];
}

type Props = {};

export default function TabInterface({}: Props) {
  const [activeTab, setActiveTab] = useState("beskrivelse");
  const [activeSection, setActiveSection] = useState("");

  const { campaign } = useCampaign();

  const documents = campaign?.documents || [];

  const tabs: Tab[] = [
    { id: "beskrivelse", label: "Beskrivelse", icon: Lightbulb },
    { id: "team", label: "Team", icon: Users },
    { id: "dokumenter", label: "Dokumenter", icon: FileText },
  ];

  const sections: Section[] = [
    { id: "konsept", title: "Konsept: strømkunde og medeier" },
    { id: "utfordring", title: "Utfordring i strømbransjen" },
    { id: "markedsmulighet", title: "Markedsmulighet for Folkekraft" },
    { id: "stromavtale", title: "Strømavtalen i Folkekraft" },
    { id: "restrukturering", title: "Restrukturering av Folkekraft" },
    { id: "investorreise", title: "Potensiell investorreise" },
    { id: "emisjon", title: "Om pågående emisjon" },
  ];

  useEffect(() => {
    const handleScroll = debounce(() => {
      const sectionElements = sections
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean);
      let closestSection = null;
      let closestDistance = Infinity;

      sectionElements.forEach((element) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - 100);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = element.id;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const beskrivelseSections: ContentSectionProps[] = [
    {
      id: "konsept",
      title: "Konsept: strømkunde og medeier",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm5QWRyHngaDP3ZvkfVOIA1eXBT57EF8C0i2lSR",
      imageAlt: "Folkekraft konsept illustrasjon",
      content: `
        <p class="text-muted-foreground leading-relaxed mb-4">
          Alle kunder blir aksjonærer i Folkekraft. Vi gir også aksjepremie til kunder som verver andre. 
          Kundene får en enkel strømavtale basert på månedsavgift og påslag på strømmen.
        </p>
        <p class="text-muted-foreground leading-relaxed mb-4">
          Folkekraft minner om konseptet til store samvirkeforetak som Coop og Felleskjøpet, 
          men vi gir aktivt eierskap og exit-muligheter. Forretningsmodellen bidrar til 
          verdiskapning gjennom økt kundelojalitet og lavere markedsføringskostnader gjennom bl.a. verveordning.
        </p>
        <p class="text-muted-foreground leading-relaxed">
          Du kan også kjøpe aksjer i Folkekraft som investor. Folkekraft kjøper tilbake aksjer fra investorer for å gi dem til nye kunder mens vi vokser. Investorer vil dermed få flere exit-muligheter.
        </p>
      `,
    },
    {
      id: "utfordring",
      title: "Utfordring i strømbransjen",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm55ztQcz8IsH6QhErOLfBFyWA2lw7GkYTbRDg9",
      imageAlt: "Utfordringer i strømbransjen illustrasjon",
      content: `
        <p class="text-muted-foreground leading-relaxed mb-4">
          Forbrukerrådet mener at mange strømkunder blir lurt. Tilbud kompliseres for å skjule høye kostnader. Dette har ført til klagestorm mot strømleverandører. Vi bygger tillit ved at kundene er medeiere. I vårt første driftsår har vi sett at Folkekraft får lojale kunder som anskaffes til lav kostnad. Målet er at kundene skal bli største aksjonærgruppe.
        </p>
        <p class="text-muted-foreground leading-relaxed">
          Folkekraft tilbyr <a href="#" class="text-primary hover:underline">transparent prising</a> og 
          <a href="#" class="text-primary hover:underline"> enkel strømavtale</a> som er lett å forstå. 
          Vi tror på åpenhet og ærlighet i vår kommunikasjon med kundene.
        </p>
      `,
    },
    {
      id: "markedsmulighet",
      title: "Markedsmulighet for Folkekraft",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm5ou2bUNHsUAih2KdXyO5Sm7GvPcVxpR0YjQuC",
      imageAlt: "Investering i Folkekraft illustrasjon",
      content: `
        <p class="text-muted-foreground leading-relaxed mb-4">
          Det norske strømmarkedet er på ca. 2.6 mill. brukere. Vi har som mål å få 100.000 kunder. Altså en markedsandel på noe over 3 %. Det finnes 72 strømleverandører i Norge. Konkurransen om kundene er stor. Inntektsmarginene er små på strømsalg og produktet er relativt generisk. De fleste strømselskaper har store salg- og markedsføringsorganisasjoner som tilfører kunden lite utover høyere sluttkostnader.
        </p>
      `,
    },
    {
      id: "stromavtale",
      title: "Strømavtalen i Folkekraft",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm5GcwCvsw0asLcm8Djn3uxXCWtE5I7ypeVUrb4",
      imageAlt: "Folkekraft Spotpris + aksjer",
      content: `
        <p class="text-muted-foreground leading-relaxed mb-4">
          Aksjeverdi: Alt vi estimerer å tjene på kunden gis i aksjer første året. Det tilsvarer ca. 1000 kr i aksjeverdi.
        </p>
      `,
    },
    {
      id: "restrukturering",
      title: "Restrukturering av Folkekraft",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm5EqarMImKfVgdAmMa5tkqFhlrIi7SDGB9n6vj",
      imageAlt: "Restrukturering av Folkekraft",
      content: `
        <p class="text-muted-foreground leading-relaxed mb-4">
          Etter etablering og Folkefinansieringskampanje i 2023 har Folkekraft gjort betydelige endringer i organisasjonens struktur. Nye lederskap har bidratt til økt effektivitet og kostnadsreduksjon. Selskapet har også forbedret sine IT-systemer, som inkluderer en ny kundeapp og faktureringssystem, og har fjernet gamle systemer som hindret vekst.
        </p>
      `,
    },
    {
      id: "investorreise",
      title: "Potensiell investorreise",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm59T36gG1S5cBKeGsQfwyI0zTEinbLYqv3ZOrN",
      imageAlt: "Potensiell investorreise",
      content: `
        <p class="mb-4">
          Folkekraft tilbyr nå en emisjon til kr 8 per aksje, med flere
          planlagte muligheter for exit og verdiskaping for investorer:
        </p>
        <ol class="flex flex-col gap-4">
          <li>
            <strong>1. Oppkjøp i mars 2025</strong>
            <ul class="list-disc list-inside ml-8 mt-4">
              <li>
                <strong>Pris:</strong> Folkekraft Group AS planlegger å
                kjøpe aksjene i Folkekraft AS for
                <strong>kr 12 per aksje</strong>.
              </li>
              <li>
                <strong>Oppgjør:</strong> Oppgjøret vil skje i form av
                aksjer i morselskapet Folkekraft Group AS til
                <strong>kr 14 per aksje</strong>.
              </li>
              <li>
                <strong>Fordel:</strong> Dette gir investorene bredere
                eksponering gjennom eierskap i:
                <ul class="list-disc list-inside ml-8 mt-4">
                  <li>Folkekraft AS</li>
                  <li>Folkekraft Bedrift AS</li>
                  <li>GreenPowerHub AS</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>2. Notering på NOTC-listen i april 2025</strong>
            <ul class="list-disc list-inside ml-8 mt-4">
              <li>
                <strong>Notering:</strong> Folkekraft Group AS planlegger
                notering på <strong>NOTC-listen</strong>.
              </li>
              <li>
                <strong>Estimert verdi:</strong> Ved notering forventes
                aksjeverdien å være <strong>kr 16 per aksje</strong>, noe
                som representerer en verdiøkning på over
                <strong>70 %</strong> på mindre enn seks måneder, forutsatt
                at mål og vekstplaner nås.
              </li>
              <li>
                Se visuell fremstilling under for illustrasjon av
                investorreisen og verdiutviklingen.
              </li>
            </ul>
          </li>
          <li>
            <strong>3. Langsiktig potensial</strong>
            <ul class="list-disc list-inside ml-8 mt-4">
              <li>
                <strong>Vekst:</strong> Ved å oppnå selskapets mål og
                vekstambisjoner estimeres investeringen å kunne gi en
                avkastning på
                <strong>10–15 ganger kapitalen innen 2028</strong>.
              </li>
              <li>
                <strong>Fleksibilitet:</strong> Aksjene i Folkekraft Group
                AS vil kunne omsettes både:
                <ul class="list-disc list-inside ml-8 mt-4">
                  <li>På selskapets interne handelsplattform.</li>
                  <li>
                    På NOTC-listen, med tilgang til kapitalsterke investorer
                    og realiseringsmuligheter.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ol>
        <p class="mt-4">
          En gjennomgang, inkludert et praktisk eksempel på hvordan
          investering og oppkjøp vil fungere, finner du i videogjennomgangen
          på toppen av emisjonsplattformen.
        </p>
      `,
    },
    {
      id: "emisjon",
      title: "Om pågående emisjon",
      imageSrc:
        "https://utfs.io/f/1c66qeb7SCm5U0IyQUhK9DFI27TyPikVXGMclz50mNB6prEC",
      imageAlt: "Folkekraft emisjon",
      content: `
       
      `,
    },
  ];

  const teamSection: ContentSectionProps = {
    id: "team",
    title: "",
    imageSrc: "",
    imageAlt: "Folkekraft team",
    content: `
      <div class="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div class="h-full flex flex-col gap-10 w-full text-center">
          <div class="mb-8">
            <h2 class="text-3xl font-bold mb-2 text-[#00263D]">
              Team og Samarbeidspartnere
            </h2>
            <span>Dette faktiske team som driver Folkekraft</span>
            <hr class="max-w-[200px] mx-auto h-[2px] bg-[#59C9B9] mt-4" />
          </div>
          
          <div class="w-full flex lg:flex-row flex-col gap-10 justify-evenly">
            <div class="text-center flex flex-col items-center">
              <div class="h-[160px] w-[160px] rounded-lg bg-[#59C9B9] overflow-hidden">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5QSboY8gaDP3ZvkfVOIA1eXBT57EF8C0i2lSR"
                  alt="Geir Morten Folkestad"
                  width="160"
                  height="160"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Geir Morten</h2>
              <p class="text-gray-600">Daglig leder</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[160px] w-[160px] rounded-lg bg-[#59C9B9] overflow-hidden">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5WzMe6W7GXeyrAJp6MRFLHSIvDUfYTGm3kxq4"
                  alt="Hans-Eirik"
                  width="160"
                  height="160"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Hans-Eirik</h2>
              <p class="text-gray-600">Driftsansvarlig</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[160px] w-[160px] rounded-lg bg-[#59C9B9] overflow-hidden">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5WzkUiPGXeyrAJp6MRFLHSIvDUfYTGm3kxq41"
                  alt="Lasse"
                  width="160"
                  height="160"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Lasse</h2>
              <p class="text-gray-600">Salgsansvarlig</p>
            </div>
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5Y9cJPiDybcQKOgLiwrEyTUDXzp5sHV1kNR4d"
                  alt="Energi Salg Norge"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Energi Salg Norge</h2>
              <p class="text-gray-600">Nordens største strømleverandør</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5jSFlex4mqnaQXygZTwVGR8hDHBbxJ7Ao2ps5"
                  alt="UtilityCloud"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">UtilityCloud</h2>
              <p class="text-gray-600">KIS systemleverandør</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm563QR9KaDi46HWJYcyGSjUxI5lCVZFgepzduh"
                  alt="Fair"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Fair</h2>
              <p class="text-gray-600">Fakturadistribusjon</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm51STQOyb7SCm5D69PaJXv0Bd3zUofGxYQkn1I"
                  alt="Credo Revisjon"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Credo Revisjon</h2>
              <p class="text-gray-600">Revisor</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5KoDEiJXpSEv3rPDqiJxksfXTgtVLwjMhWCn4"
                  alt="Ecit Regnskap"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Ecit Regnskap</h2>
              <p class="text-gray-600">Regnskapsfører</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5NPS9njJdwjiMcG5DPegqJl0H9uatx8Y4AsU3"
                  alt="Bergen Synergy"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Bergen Synergy</h2>
              <p class="text-gray-600">Strømforvaltning</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5J9J76ET8lQqnjs7ozIEpK04O3mD6TY9xuAfZ"
                  alt="Nudge Media"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Nudge Media</h2>
              <p class="text-gray-600">Digital markedsføring</p>
            </div>

            <div class="text-center flex flex-col items-center">
              <div class="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                <img
                  src="https://utfs.io/f/1c66qeb7SCm5jGNsDcH4mqnaQXygZTwVGR8hDHBbxJ7Ao2ps"
                  alt="Harris Adcokatfirma"
                  width="80"
                  height="80"
                  class="rounded-md"
                />
              </div>
              <h2 class="text-xl font-semibold mt-2">Harris Adcokatfirma</h2>
              <p class="text-gray-600">Advokter</p>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  const dokumenterSection: ContentSectionProps = {
    id: "dokumenter",
    title: "Dokumenter",
    imageSrc: "",
    imageAlt: "",
    content: `
      <p class="text-muted-foreground mb-6">Viktige dokumenter om Folkekraft</p>
      <div class="grid gap-4">
        ${documents
          .map(
            (doc) => `
          <div class="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 class="font-semibold">${doc.title}</h3>
              <p class="text-sm text-muted-foreground">${doc.description}</p>
            </div>
            <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="hover:text-primary">
              <Download className="h-5 w-5" />
            </a>
          </div>
        `
          )
          .join("")}
      </div>
    `,
  };

  return (
    <div className="w-full container mx-auto">
      <div className="flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="h-auto p-0 bg-transparent flex flex-col lg:flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
            <div className="flex flex-col lg:flex-row gap-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                    activeTab === tab.id &&
                      "active:text-[#00263D] border-[#59C9B9]"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
            <Link
              href="mailto:lg@folkekraft.no"
              className="flex items-center text-xl text-gray-500 hover:text-gray-700"
            >
              <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
              Spørsmål?
            </Link>
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="w-full pt-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {tab.id === "beskrivelse" ? (
                  <>
                    <KeyInformation />
                    <FundingAlert />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="md:col-span-1 relative">
                        <div className="sticky top-[125px]">
                          <SidebarNavigation
                            sections={sections}
                            activeSection={activeSection}
                            scrollToSection={scrollToSection}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-8">
                        {beskrivelseSections.map((section, index) => (
                          <ContentSection
                            key={section.id}
                            {...section}
                            delay={index * 0.2}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : tab.id === "team" ? (
                  <ContentSection {...teamSection} />
                ) : tab.id === "dokumenter" ? (
                  <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Dokumenter</h2>
                      <div className="grid gap-4">
                        {documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <h3 className="font-semibold">{doc.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {doc.description}
                              </p>
                            </div>
                            <Link
                              href={doc.url}
                              target="_blank"
                              download={doc.fileName}
                              className="ml-4"
                            >
                              <Button
                                variant="outline"
                                className="flex items-center gap-2 hover:bg-[#59C9B9]/10"
                              >
                                <Download className="w-4 h-4" />
                                Last ned
                              </Button>
                            </Link>
                          </div>
                        ))}
                        {documents.length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            Ingen dokumenter tilgjengelig
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <ContentSection {...dokumenterSection} />
                )}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
