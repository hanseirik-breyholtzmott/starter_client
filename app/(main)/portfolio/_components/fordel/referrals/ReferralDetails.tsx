"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ReferralDetailsProps {
  filter?: "pending-payout" | "pending" | "completed";
}

const referrals = [
  {
    id: 1,
    name: "Navn ukjent",
    status: "pending",
    message: "Må verifisere seg med BankID",
  },
  {
    id: 2,
    name: "Navn ukjent",
    status: "pending",
    message: "Må verifisere seg med BankID",
  },
  {
    id: 3,
    name: "Johannes Eikrem",
    status: "completed",
    date: "30 sep. 2022",
    reward: "+ 100 NOK i ₿",
  },
  {
    id: 4,
    name: "Rodrigo",
    status: "completed",
    date: "30 apr. 2022",
    reward: "+ 100 NOK i ₿",
  },
  {
    id: 5,
    name: "Trine",
    status: "completed",
    date: "31 mars 2022",
    reward: "+ 100 NOK i ₿",
  },
  {
    id: 6,
    name: "Haakon-André",
    status: "completed",
    date: "31 mars 2022",
    reward: "+ 100 NOK i ₿",
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

export function ReferralDetails({ filter }: ReferralDetailsProps) {
  const filteredReferrals = referrals.filter((referral) => {
    if (!filter) return true;
    if (filter === "pending") return referral.status === "pending";
    if (filter === "completed") return referral.status === "completed";
    return true;
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4 mt-6"
    >
      {filteredReferrals.map((referral) => (
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
  );
}
