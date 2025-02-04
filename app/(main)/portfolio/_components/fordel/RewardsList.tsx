"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Wallet, Landmark, Coins } from "lucide-react";
import { motion } from "framer-motion";

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

interface Reward {
  id: string;
  icon: any;
  title: string;
  description: string;
  rewards: string[];
  additionalInfo?: string;
}

const rewards: Reward[] = [
  {
    id: "1",
    icon: Wallet,
    title: "Sett inn krypto",
    description: "Gjør ditt første kryptoinnksudd",
    rewards: ["Belønning: XRP for 45 kroner"],
  },
  {
    id: "2",
    icon: Landmark,
    title: "Første sparing",
    description: "Gjør et innskudd til din sparekonto, minimum 100 NOK",
    rewards: ["Belønning: LTC for 25 kroner"],
  },
  {
    id: "3",
    icon: Coins,
    title: "KryptoInvestor",
    description: "Handle for mer enn 2 500 NOK i tre markeder",
    rewards: [
      "Belønning: ADA for 45 kroner",
      "Kjøpt 0/3 kryptovalutaer for 2500 NOK",
    ],
  },
];

export function RewardsList() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Belønninger</h2>
        <Button variant="link" className="text-sm">
          Se alle
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-3"
      >
        {rewards.map((reward) => {
          const Icon = reward.icon;
          return (
            <motion.div key={reward.id} variants={item}>
              <Card className="h-full">
                <Button
                  variant="ghost"
                  className="w-full h-auto p-6 flex items-start justify-between hover:bg-gray-50"
                >
                  <div className="flex items-start space-x-4 min-w-0">
                    <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left space-y-2 min-w-0">
                      <h3 className="font-medium truncate">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground break-words">
                        {reward.description}
                      </p>
                      {reward.rewards.map((rewardText, index) => (
                        <p
                          key={index}
                          className="text-sm text-blue-600 break-words"
                        >
                          {rewardText}
                        </p>
                      ))}
                      {reward.additionalInfo && (
                        <p className="text-sm text-muted-foreground break-words">
                          {reward.additionalInfo}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
