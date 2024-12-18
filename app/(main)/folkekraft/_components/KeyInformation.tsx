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
  { label: "RAISED", value: "£775,670" },
  { label: "INVESTORS", value: 459 },
  { label: "TARGET", value: "£350,000" },
  {
    label: "TAX RELIEF",
    value: "EIS",
    tooltip: "Enterprise Investment Scheme tax relief information",
  },
  {
    label: "TAX REDUCTION",
    value: "30%",
    tooltip: "Tax reduction percentage details",
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
