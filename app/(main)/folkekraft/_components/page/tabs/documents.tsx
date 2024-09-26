import React from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

type Documents = {
  title: string;
  description: string;
  fileName: string;
  url: string;
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

interface DocumentProps {
  documents: Documents[];
  perks: Perk[];
}

export default function Documents({ documents, perks }: DocumentProps) {
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10 w-full">
          <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-[#00263D]">
                Dokumenter
              </h2>
              <span className="hidden">Dokumenter om Folkekraft</span>
              <Separator className="max-w-[200px] mx-auto h-[2px] bg-[#59C9B9] mt-4" />
            </div>
            <div className="flex flex-col space-y-6">
              {documents.map((doc, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                      <p className="font-semibold text-left">{doc.title}</p>
                      <p>{doc.description}</p>
                    </div>
                    <Link
                      href={doc.url}
                      className="cursor-pointer underline"
                      target="_blank"
                      download={doc.fileName}
                    >
                      Last ned
                    </Link>
                  </div>
                  {index < documents.length + 1 && <Separator />}
                </React.Fragment>
              ))}
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
