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
    <div className="relative">
      <div className="h-[400px] w-full bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="grid grid-cols-12 gap-2 p-4 h-full opacity-20">
            {subsidiaries.map((name, i) => (
              <div key={i} className="h-4 bg-white/10 rounded" />
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-8 pt-16 relative z-10">
            <div className="flex gap-8 items-start">
              {/* Company Logo Grid */}
              <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="grid grid-cols-3 gap-4">
                  {subsidiaries.slice(0, 9).map((name, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center text-white/80 text-xs font-medium"
                    >
                      {name.charAt(0)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="flex-grow pt-4">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Folkekraft
                </h1>
                <p className="text-white/90 text-xl mb-8 max-w-3xl leading-relaxed">
                  Providing consumers, businesses and the wholesale market with
                  electricity, billing & rating services and electricity related
                  technology solutions.
                </p>
                <div className="flex gap-4 items-center">
                  <SubscribeDialog />
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link className="h-5 w-5 mr-2" />
                    Q3 2024 webcast
                  </Button>
                  <span className="text-white/90 text-sm">
                    7 November 08:00 CET
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
