"use client";

import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { SubscribeDialog } from "./SubscribeDialog";

const subsidiaries = [
  "Fjordkraft",
  "Gudbrandsdal",
  "TrondelagKraft",
  "Nordic Green",
  "Steddi",
  "Fjordkraft Mobil",
  "KraftAlliansen",
  "AllRate",
  "Metzum",
];

export function CompanyHeader() {
  return (
    <div className="relative w-full bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 overflow-hidden">
      <div className="w-full relative overflow-hidden py-8 sm:py-12 md:py-16">
        {/* Background Pattern */}

        {/* Content Container */}
        <div className="relative z-10 flex min-h-[250px] sm:min-h-[350px] md:min-h-[400px] items-center">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
              {/* Company Logo */}

              <div className="flex-shrink-0 w-32 h-32 sm:w-44 sm:h-44 bg-white/10 backdrop-blur-sm rounded-lg mb-6 md:mb-0 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Logo</span>
              </div>

              {/* Company Info */}
              <div className="flex-grow text-center md:text-left space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  Folkekraft
                </h1>
                <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
                  Folkekraft gir forbrukere og bedrifter tilgang til strøm og
                  teknologiske tjenester, samtidig som de får muligheten til å
                  bli medeiere og forme fremtidens energiløsninger.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                  <SubscribeDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
