"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Check, Users, HandCoins } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

const referrals = [
  {
    id: 1,
    name: "Lasse Gjellestad",
    status: "pending",
    message: "Må være kunde i 14 dager",
  },
  {
    id: 2,
    name: "Hans-Eirik Breyholtz-Mott",
    status: "pending",
    message: "Må være kunde i 14 dager",
  },
  {
    id: 3,
    name: "Geir Morten Folkestad",
    status: "completed",
    date: "30 sep. 2022",
    reward: "+ 100 aksjer (FLK)",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ReferralList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Oppsummering</h3>
          </div>
          <div className="space-y-4">
            <Card className="">
              <CardHeader className="pb-4">
                <CardTitle className=" flex items-center space-x-3">
                  <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                    <Users className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
                  </div>
                  <div className="text-base font-medium">
                    Totalt antall vervet
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">4</p>
                </div>
              </CardContent>
            </Card>
            <Card className="">
              <CardHeader className="pb-4">
                <CardTitle className=" flex items-center space-x-3">
                  <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                    <HandCoins className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
                  </div>
                  <div className="text-base font-medium">Totalt utbetalt</div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">100 aksjer (FLK)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                      <HandCoins className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
                    </div>
                    <div className="text-base font-medium">Til utbetaling</div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Antall vervinger som venter på utbetaling</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold">0</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Mine vervinger</h3>
          <Button variant="link" className="text-sm">
            Se alle
          </Button>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {referrals.map((referral) => (
            <motion.div key={referral.id} variants={item}>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {referral.status === "completed" ? (
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="h-4 w-4 rounded-full bg-gray-300" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      {referral.status === "pending" ? (
                        <p className="text-sm text-muted-foreground">
                          {referral.message}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Utbetalt {referral.date}
                        </p>
                      )}
                    </div>
                  </div>
                  {referral.status === "completed" && (
                    <span className="text-sm text-green-600">
                      {referral.reward}
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
