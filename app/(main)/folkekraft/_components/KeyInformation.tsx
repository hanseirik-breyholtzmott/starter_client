import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Building2,
  Linkedin,
  Twitter,
  Facebook,
  Info,
  Instagram,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KeyInformationItem {
  label: string;
  value: string | number;
  tooltip?: string;
}

const socialIcons = [
  { Icon: Globe, label: "Website", url: "https://www.folkekraft.no" },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/folkekraft",
  },
  {
    Icon: Instagram,
    label: "Instagram",
    url: "https://www.instagram.com/folkekraft",
  },
  {
    Icon: Facebook,
    label: "Facebook",
    url: "https://www.facebook.com/folkekraft",
  },
];

const keyInformationItems: KeyInformationItem[] = [
  { label: "KURS", value: "8,00 kr" },
  { label: "INVESTORER", value: 409 },
  { label: "MÅL", value: "8 000 000 kr" },
  {
    label: "NEDPRISING",
    value: "33%",
    tooltip:
      "Nedprising fra kr 12 til kr 8 per aksje i forbindelse med emisjonen",
  },
  {
    label: "POTENTIELT OPPKJØP",
    value: "12,00 kr",
    tooltip:
      "Folkekraft Group AS planlegger å kjøpe aksjene i Folkekraft AS for kr 12 per aksje",
  },
];

type Props = {};

export default function KeyInformation({}: Props) {
  return (
    <Card className="mb-8 transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Oversikt</h2>
          <div className="flex items-center gap-4">
            {socialIcons.map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 ease-in-out"
              >
                <Icon className="w-5 h-5" />
                <span className="sr-only">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {keyInformationItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="text-xl font-bold flex items-center gap-1">
                {item.value}
                {item.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
