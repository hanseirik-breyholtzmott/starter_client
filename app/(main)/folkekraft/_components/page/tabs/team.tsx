"use client";

import React from "react";
import { useCampaign } from "@/app/hooks/CampaignContext";

//Nextjs
import Image from "next/image";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

//Data
const cardData = [
  {
    id: 1,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5Y9cJPiDybcQKOgLiwrEyTUDXzp5sHV1kNR4d",
    altText: "Energi Salg Norge",
    title: "Energi Salg Norge",
    role: "Nordens største strømleverandør",
  },
  {
    id: 2,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5jSFlex4mqnaQXygZTwVGR8hDHBbxJ7Ao2ps5",
    altText: "UtilityCloud",
    title: "UtilityCloud",
    role: "KIS systemleverandør",
  },
  {
    id: 3,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm563QR9KaDi46HWJYcyGSjUxI5lCVZFgepzduh",
    altText: "Fair",
    title: "Fair",
    role: "Fakturadistribusjon",
  },
  {
    id: 4,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm51STQOyb7SCm5D69PaJXv0Bd3zUofGxYQkn1I",
    altText: "Credo Revisjon",
    title: "Credo Revisjon",
    role: "Revisor",
  },
  {
    id: 5,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5KoDEiJXpSEv3rPDqiJxksfXTgtVLwjMhWCn4",
    altText: "Ecit Regnskap",
    title: "Ecit Regnskap",
    role: "Regnskapsfører",
  },
  {
    id: 6,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5NPS9njJdwjiMcG5DPegqJl0H9uatx8Y4AsU3",
    altText: "Bergen Synergy",
    title: "Bergen Synergy",
    role: "Strømforvaltning",
  },
  {
    id: 7,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5J9J76ET8lQqnjs7ozIEpK04O3mD6TY9xuAfZ",
    altText: "Nudge Media",
    title: "Nudge Media",
    role: "Digital markedsføring",
  },
  {
    id: 8,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm5jGNsDcH4mqnaQXygZTwVGR8hDHBbxJ7Ao2ps",
    altText: "Harris Adcokatfirma",
    title: "Harris Adcokatfirma",
    role: "Advokter",
  },
];

export default function Team() {
  const { campaign } = useCampaign();

  if (!campaign) return null;

  return (
    <div className="py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10 w-full text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-[#00263D]">
              Team og Samarbeidspartnere
            </h2>
            <span>Dette faktiske team som driver Folkekraft</span>
            <Separator className="max-w-[200px] mx-auto h-[2px] bg-[#59C9B9] mt-4" />
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-10 justify-evenly">
            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/1c66qeb7SCm5QSboY8gaDP3ZvkfVOIA1eXBT57EF8C0i2lSR"
                  }
                  alt="Geir Morten Folkestad"
                  width={160}
                  height={160}
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">Geir Morten</h2>
              <p className="text-gray-600">Daglig leder</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-[#59C9B9] overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/1c66qeb7SCm5WzMe6W7GXeyrAJp6MRFLHSIvDUfYTGm3kxq4"
                  }
                  alt="Hans-Eirik"
                  width={160}
                  height={160}
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">Hans-Eirik</h2>
              <p className="text-gray-600">Driftsansvarlig</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-[#59C9B9] overflow-hidden">
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
            {cardData.map((card) => (
              <div
                key={card.id}
                className="text-center flex flex-col items-center"
              >
                <div className="h-[90px] w-[90px] rounded-lg bg-[#59C9B9] border-2 border-[#59C9B9] flex items-center justify-center">
                  <Image
                    src={card.imageSrc}
                    alt={card.altText}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{card.title}</h2>
                <p className="text-gray-600">{card.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
