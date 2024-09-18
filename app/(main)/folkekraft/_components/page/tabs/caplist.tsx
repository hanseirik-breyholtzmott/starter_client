import React from "react";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

//Table
import { DataTable } from "../../data-table";
import { Payment, columns } from "../../columns";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

type Props = {};

export default function CapList({}: Props) {
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
        <div className="h-full flex flex-col gap-10 w-full">
          <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Aksjeeiebok</h2>
              <span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </span>
              <Separator className="max-w-[200px] mx-auto h-[2px] bg-blue-600 mt-4" />
            </div>

            <DataTable columns={columns} data={data} />
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
