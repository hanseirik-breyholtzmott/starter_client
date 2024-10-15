import React, { useState } from "react";

//Shadcn
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Perk {
  title: string;
  value: number;
  description: string;
}

type Props = {
  activePerks: Perk[];
};

export default function Addons({ activePerks }: Props) {
  const [isCustomer, setIsCustomer] = useState(
    activePerks.some((perk) => perk.value === 0)
  );
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-2">
        Bli Folkekraft kunde og få 1 000kr i aksjer
      </h2>

      <div className="flex flex-col gap-6 mt-4">
        <p className="text-gray-600">
          Vi oppfordrer alle investorer til å{" "}
          <a
            href={process.env.NEXT_PUBLIC_URL_BASE + "/bestill"}
            className="text-blue-600 hover:underline"
          >
            bli Folkekraft kunde
          </a>
          . Det koster kun 49kr i måneden og 3,9 øre i påslag, og du får 1000kr
          i aksjer uansett.
        </p>

        <div className="flex items-center gap-2">
          <Checkbox
            id="customer"
            className="w-4 h-4"
            checked={isCustomer}
            onCheckedChange={() => {
              setIsCustomer(!isCustomer);
            }}
          />
          <label
            htmlFor="customer"
            className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Jeg ønsker å bli Folkekraft kunde og få 1 000kr i aksjer
          </label>
        </div>

        <Card className="bg-gray-100">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">
              Må jeg bli Folkekraft kunde for å kunne investere?
            </h3>
            <p className="text-sm text-gray-600">
              Vi oppfordrer alle investorer til å{" "}
              <a
                href={process.env.NEXT_PUBLIC_URL_BASE + "/bestill"}
                className="text-blue-600 hover:underline"
              >
                kunder
              </a>{" "}
              for å oppleve endringer og kontinuerlig forbedringer vi
              tilbringer, men er ikke et krav for å investere.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
