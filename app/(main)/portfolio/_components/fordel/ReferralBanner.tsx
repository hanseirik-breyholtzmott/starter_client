"use client";

import { Card } from "@/components/ui/card";
import { ReferralDialog } from "./ReferralDialog";
import { Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReferralBanner() {
  return (
    <Card className="mt-6 bg-gradient-to-r bg-white">
      <div className="p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2 text-center md:text-left mb-4 md:mb-0">
          <div className="flex items-center justify-between mb-4">
            <div className=" flex items-center space-x-3">
              <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                <Users className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
              </div>
              <h2 className="text-xl font-bold">
                Verv en venn og få 300 kroner i Folkekraft aksjer!
              </h2>
            </div>
          </div>
          <p className="text-muted-foreground">
            Få 300 kr i Folkekraft aksjer og gi din venn 1000 kr i kunde akjser.
          </p>
        </div>
        <ReferralDialog />
      </div>
    </Card>
  );
}
