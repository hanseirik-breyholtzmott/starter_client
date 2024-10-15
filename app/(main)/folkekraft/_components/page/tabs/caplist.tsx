import React from "react";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

//Table
import { DataTable } from "../../data-table";
import { columns } from "../../columns";

type Investor = {
  userId: string;
  totalShares: number;
  name: string;
  email: string;
  percentageOwnership: number;
};

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

type Caplist = Investor[];

interface CaplistProps {
  caplist: Caplist;
  perks: Perk[];
}

export default function CapList({ caplist, perks }: CaplistProps) {
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10 w-full">
          <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-[#00263D]">
                Aksjeeiebok
              </h2>
              <span>Aksjonærlisten fra Folkekraft 2023</span>
              <Separator className="max-w-[200px] mx-auto h-[2px] bg-[#59C9B9] mt-4" />
            </div>

            <DataTable columns={columns} data={caplist} />
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
