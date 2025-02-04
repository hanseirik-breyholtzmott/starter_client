"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ReferralStats() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className=" flex items-center space-x-3">
          <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
            <Users className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
          </div>
          <div className="text-base font-medium">Mine vervinger</div>
        </CardTitle>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Oversikt over dine vervinger og utbetalinger</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Totalt antall vervet
            </p>
            <p className="text-2xl font-bold">4</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Totalt utbetalt</p>
            <p className="text-2xl font-bold">100 aksjer (FLK)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Vervinger til utbetaling
            </p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Til utbetaling</p>
            <p className="text-2xl font-bold">0 (FLK)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
