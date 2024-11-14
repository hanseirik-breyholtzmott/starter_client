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
                href="#om-folkekraft-group-as"
                className="text-primary hover:underline block py-1"
              >
                Om Folkekraft Group AS
              </Link>
            </li>
            <li>
              <Link
                href="#formålet-med-emisjonen"
                className="text-primary hover:underline block py-1"
              >
                Formålet med Emisjonen
              </Link>
            </li>
            {/* ... other list items ... */}
            <li>
              <Link
                href="#porteføljen"
                className="text-primary hover:underline block py-1"
              >
                Porteføljen
              </Link>
            </li>
            <li>
              <Link
                href="#økonomisk-verdi-og-emisjonsdetaljer"
                className="text-primary hover:underline block py-1"
              >
                Økonomisk Verdi og Emisjonsdetaljer
              </Link>
            </li>
            <li>
              <Link
                href="#mulighet-for-investorer"
                className="text-primary hover:underline block py-1"
              >
                Mulighet for Investorer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10">
          <div>
            <h3 id="om-folkekraft-group-as" className="text-2xl font-bold mb-4">
              Om Folkekraft Group AS
            </h3>
            <p className="mb-6">
              Folkekraft Group AS ble grunnlagt i 2016 av seriegründer Geir
              Morten Folkestad. Selskapet har fokus på tidligfase selskaper
              innen kraft og fornybar energi, med et mål om å knytte disse til
              industrielle investorer etter skalering. Folkekraft Group er
              medgründer i selskaper som GreenPowerHub, The Ship, H2 Marine,
              Folkekraft og Folkekraft Bedrift. Siden oppstart har selskapet
              hatt en gjennomsnittlig avkastning på 58 % per år på
              aksjekapitalen og har utbetalt totalt 12 millioner kroner i
              utbytte. Det er planlagt en notering på NOTC-listen, eid av Oslo
              Børs, i april 2025.
            </p>
          </div>
          <div>
            <h3 id="formålet-med-emisjonen" className="text-2xl font-bold mb-4">
              Formålet med Emisjonen
            </h3>
            <p className="mb-6">
              Emisjonen har som mål å sikre videre vekst og styrke Folkekraft
              Groups posisjon som en ledende aktør innen bærekraftig energi.
              Folkekraft AS og Folkekraft Bedrift AS henter henholdsvis 8
              millioner og 3 millioner kroner i emisjonskapital. Det forventes
              lønnsomhet for både privat- og bedriftsmarkedet innen 2025. Ved
              notering på NOTC-listen er aksjeverdien estimert til å være 16
              kroner per aksje.
            </p>
          </div>
          <div>
            <h3 id="porteføljen" className="text-2xl font-bold mb-4">
              Porteføljen
            </h3>
            <p className="mb-6">
              Folkekraft Group AS har en spennende portefølje som inkluderer
              følgende selskaper:
            </p>
            <ul className="list-disc list-inside mb-6">
              <li>
                Folkekraft AS, som fokuserer på privatmarkedet, har allerede 700
                kunder og planlegger å hente 500 nye kunder hver måned.
              </li>
              <li>
                Folkekraft Bedrift AS, som tilbyr strømavtaler til SMB-markedet,
                gir bedriftskundene aksjeinsentiver i form av eierskap i
                Folkekraft Group AS.
              </li>
              <li>
                GreenPowerHub, en global plattform for handel med grønne
                sertifikater, har store kunder som Fortum og Axpo.
              </li>
            </ul>
            <p className="mb-4">
              Selskapet har også utviklet banebrytende teknologi, som blant
              annet inkluderer digitale aksjeeierbøker, handelsplattformer og en
              app med skreddersydde løsninger for medeierskapsmodellen.
            </p>
          </div>
          <div>
            <h3
              id="økonomisk-verdi-og-emisjonsdetaljer"
              className="text-2xl font-bold mb-4"
            >
              Økonomisk Verdi og Emisjonsdetaljer
            </h3>
            <p className="mb-4">
              Verdien av Folkekraft Group AS før emisjonen er estimert til 16
              millioner kroner, fordelt på én million aksjer. Målet med
              emisjonen er å hente inntil 12 millioner kroner, med en
              emisjonspris på 12 kroner per aksje. Investorer får dermed en
              rabatt i forhold til den estimerte aksjeverdien på 16 kroner ved
              notering. Ved oppnåelse av vekstmålene kan investorer oppnå mellom
              10 og 15 ganger investert kapital innen tre til fem år.
            </p>
          </div>

          <div>
            <h3
              id="mulighet-for-investorer"
              className="text-2xl font-bold mb-4"
            >
              Mulighet for Investorer
            </h3>
            <p className="mb-4">
              Denne emisjonen gir investorer en unik mulighet til å bli med på
              Folkekraft Groups reise mot å skape en mer bærekraftig
              energifremtid. Ved å investere nå kan man bli del av en spennende
              veksthistorie i en sektor som er i rask utvikling.
            </p>
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
