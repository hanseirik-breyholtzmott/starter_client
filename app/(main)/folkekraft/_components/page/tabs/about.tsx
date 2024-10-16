import React, { useState } from "react";

//Nextjs
import Link from "next/link";
import Image from "next/image";

//Shadcn
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//Components
import PerksCard from "../perksCard";

type Perk = {
  title: string;
  actionText: string;
  boldText: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
};

interface PerkProps {
  perks: Perk[];
}

export default function About({ perks }: PerkProps) {
  const [showButton, setShowButton] = useState(true);

  return (
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
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10">
          <div>
            <h3 id="konsept" className="text-2xl font-bold mb-4">
              Konsept: strømkunde og medeier
            </h3>
            <p className="mb-6">
              Alle kunder blir aksjonærer i Folkekraft. Vi gir også aksjepremie
              til kunder som verver andre. Kundene får en enkel strømavtale
              basert på månedsavgift og påslag på strømmen.
            </p>
            <p className="mb-6">
              Folkekraft minner om konseptet til store samvirkeforetak som Coop
              og Felleskjøpet, men vi gir aktivt eierskap og exit-muligheter.
              Forretningsmodellen bidrar til verdiskapning gjennom økt
              kundelojalitet og lavere markedsføringskostnader gjennom bl.a.
              verveordning.
            </p>
            <p className="mb-6">
              Du kan også kjøpe aksjer i Folkekraft som investor. Folkekraft
              kjøper tilbake aksjer fra investorer for å gi dem til nye kunder
              mens vi vokser. Investorer vil dermed få flere exit-muligheter.
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
              . Tilbud kompliseres for å skjule høye kostnader. Dette har ført
              til{" "}
              <a href="https://www.bytt.no/strom/stromleverandorer/zbgv/misfornoyde-stromkunder-med-klagestorm">
                klagestorm mot strømleverandører
              </a>
              . Vi bygger tillit ved at kundene er medeiere. I vårt første
              driftsår har vi sett at Folkekraft får lojale kunder som anskaffes
              til lav kostnad. Målet er at kundene skal bli største
              aksjonærgruppe.
            </p>
          </div>
          <div>
            <h3 id="markedsmulighet" className="text-2xl font-bold mb-4">
              Markedsmulighet for Folkekraft
            </h3>
            <p className="mb-4">
              Det norske strømmarkedet er på ca. 3.2 mill. brukere. Vi har som
              mål å få 100.000 kunder. Altså en markedsandel på noe over 3 %.
              Det finnes ca. 80 strømleverandører i Norge. Konkurransen om
              kundene er stor. Inntektsmarginene er små på strømsalg og
              produktet er relativt generisk. De fleste strømselskaper har store
              salg- og markedsføringsorganisasjoner som tilfører kunden lite
              utover høyere sluttkostnader.
            </p>
          </div>
          <div className="">
            <h3 id="utfordring" className="text-2xl font-bold mb-4">
              Strømavtalen i Folkekraft
            </h3>
            <p className="mb-6">
              Aksjeverdi: Alt vi estimerer å tjene på kunden gis i aksjer første
              året. Det tilsvarer ca. 1000 kr i aksjeverdi.
            </p>
            <div className="max-w-[800px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5GcwCvsw0asLcm8Djn3uxXCWtE5I7ypeVUrb4"
                alt="Strømavtalen"
                layout="responsive" // Use layout responsive instead of fill
                width={800} // Width in pixels for responsive layout
                height={500} // Height in pixels for responsive layout
                objectFit="contain" // Ensure the image is contained without overflow
                sizes="(max-width: 800px) 100vw, 800px"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div>
            <h3 id="utfordring" className="text-2xl font-bold mb-4">
              Restrukturering av Folkekraft
            </h3>
            <p className="mb-4">
              Etter etablering og Folkefinansieringskampanje i 2023 har
              Folkekraft gjort betydelige endringer i organisasjonens struktur.
              Nye lederskap har bidratt til økt effektivitet og
              kostnadsreduksjon. Selskapet har også forbedret sine IT-systemer,
              som inkluderer en ny kundeapp og faktureringssystem, og har
              fjernet gamle systemer som hindret vekst.
            </p>
          </div>
          <div>
            <h3 id="utfordring" className="text-2xl font-bold mb-4">
              Kapital og exit
            </h3>
            <p className="mb-4">
              Selskapet planlegger tre emisjoner fremover, med sikte på å hente
              kapital fra både profesjonelle investorer og kunder. Allerede ved
              ca. 8.000–9.000 kunder vil selskapet være selvfinansiert frem mot
              100.000 kunder. Inntektsgrunnlaget vil primært komme fra
              strømleveranser, men også mersalgsprodukter. Investorer i
              Folkekraft får flere muligheter til å realisere gevinst før
              børsnoteringen. Selskapet estimerer en aksjekurs på 57 kroner og
              en selskapsverdi på 330 millioner kroner innen 2028. Deltagelse i
              denne emisjonen vil i så tilfelle gi 7 ganger tilbake på investert
              beløp.
            </p>
            <div className="max-w-[800px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5h9wXxADo8VErKxMCa7GPDNRYc0W49Ln1QFpe"
                alt="Strømavtalen"
                layout="responsive" // Use layout responsive instead of fill
                width={800} // Width in pixels for responsive layout
                height={500} // Height in pixels for responsive layout
                objectFit="contain" // Ensure the image is contained without overflow
                sizes="(max-width: 800px) 100vw, 800px"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div>
            <h3 id="utfordring" className="text-2xl font-bold mb-4">
              Om pågående emisjon
            </h3>
            <div className="max-w-[800px] mx-auto rounded-lg overflow-hidden">
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5U0IyQUhK9DFI27TyPikVXGMclz50mNB6prEC"
                alt="Strømavtalen"
                layout="responsive" // Use layout responsive instead of fill
                width={800} // Width in pixels for responsive layout
                height={500} // Height in pixels for responsive layout
                objectFit="contain" // Ensure the image is contained without overflow
                sizes="(max-width: 800px) 100vw, 800px"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 max-w-[320px]">
          {perks.map((perk, index) => (
            <PerksCard key={index} {...perk} />
          ))}
        </div>
      </div>
    </div>
  );
}
