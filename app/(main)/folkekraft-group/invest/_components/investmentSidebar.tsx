"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronDown } from "lucide-react";

interface Perk {
  title: string;
  value: number;
  description: string;
}

type Props = {
  activePerks: Perk[];
  onPerkChange: (perk: Perk) => void;
  perks: Perk[];
};

export default function InvestmentSidebar({
  activePerks,
  onPerkChange,
  perks,
}: Props) {
  const [hoveredPerk, setHoveredPerk] = useState<Perk | null>(null);

  const renderOption = (perk: Perk, isDisabled: boolean = false) => (
    <div
      key={perk.title}
      className={`space-y-2 p-3 rounded-md transition-all duration-300 ${
        isDisabled ? "" : "cursor-pointer"
      }
        ${
          activePerks.some((activePerk) => activePerk.title === perk.title)
            ? "border-2 border-[#59C9B9]"
            : "border-2 border-transparent"
        }
        ${hoveredPerk === perk && !isDisabled ? "bg-gray-50" : ""}`}
      onMouseEnter={() => !isDisabled && setHoveredPerk(perk)}
      onMouseLeave={() => !isDisabled && setHoveredPerk(null)}
      onClick={() => !isDisabled && onPerkChange(perk)}
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">{perk.title}</span>
        {activePerks.some((activePerk) => activePerk.title === perk.title) && (
          <CheckCircle2 className="w-5 h-5 text-[#59C9B9]" />
        )}
      </div>
      <p className="text-sm text-gray-500">{perk.description}</p>
    </div>
  );

  return (
    <div className="w-[320px] md:sticky block top-8 self-start">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Tilbud</h2>
        <p className="text-gray-600 mb-4">
          Ved å investere mer vil du få unike tilbud.
        </p>
        {/* Perks Card */}
        <div className="flex flex-col gap-6">
          <Card className="max-w-sm mx-auto">
            <CardContent className="p-6 space-y-4">
              {perks.map((perk) => renderOption(perk, perk.title === "free"))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8 hidden">
        <h2 className="text-2xl font-semibold mb-2">Documents</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2"></div>
            <a href="#" className="text-blue-600 hover:underline">
              Groundfloor Finance Form C.pdf
            </a>
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 mr-2"></div>
            <a href="#" className="text-blue-600 hover:underline">
              Groundfloor Series B-3 Preferred Stock shares
            </a>
          </li>
        </ul>
      </div>

      <div className="hidden">
        <h2 className="text-2xl font-semibold mb-2">How it works</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <ChevronDown className="w-4 h-4 mr-2" />
            <a href="#" className="text-blue-600 hover:underline">
              When will I be charged?
            </a>
          </li>
          <li className="flex items-center">
            <ChevronDown className="w-4 h-4 mr-2" />
            <a href="#" className="text-blue-600 hover:underline">
              So I&apos;m only charged if funding succeeds?
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
