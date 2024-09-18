import React from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

type Props = {};

export default function Documents({}: Props) {
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
        <div className="h-full flex flex-col gap-10 w-full">
          <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Dokumenter</h2>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
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
                  <p className="font-semibold text-left">Verdsettelsesmodell</p>
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
        <div className="flex flex-col gap-6 max-w-[320px]">
          <PerksCard
            title="Bli Folkekraft kunde"
            actionText="Du vil få i aksjer"
            boldText="1 000kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Bli kunde", link: "#" }}
          />
          <PerksCard
            title="Verv Folkekraft"
            actionText="Du vil få i aksjer"
            boldText="300kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Kopier verve lenke", link: "#" }}
          />
          <PerksCard
            title="Investor tilbud"
            actionText="Investerer du mer enn"
            boldText="10.000kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Kopier verve lenke", link: "#" }}
          />
        </div>
      </div>
    </div>
  );
}
