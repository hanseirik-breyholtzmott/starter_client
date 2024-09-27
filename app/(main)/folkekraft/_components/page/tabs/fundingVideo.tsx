import React, { useState } from "react";

//Nextjs
import Link from "next/link";

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
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10 w-full">
          <h3 id="konsept" className="text-2xl font-bold mb-4">
            Casegjennomgang: Hva har skjedd siden forrige emisjon?
          </h3>

          <div className="w-full relative overflow-hidden rounded-xl text-center h-[400px]">
            <iframe
              src="https://player.vimeo.com/video/1010022518?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              style={{ border: "none" }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Vi har ikke vært gode nok"
              className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
            ></iframe>
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
