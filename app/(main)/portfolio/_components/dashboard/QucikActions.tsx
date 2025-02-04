"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionCard } from "./ActionCard";
import { RecentTransaction } from "./RecentTransactions";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRightLeft, Wallet, Workflow } from "lucide-react";

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
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

type Transaction = {
  id: string;
  type: "buy" | "sell";
  asset: string;
  symbol: string;
  amount: string;
  fee: string;
  timestamp: string;
};

export function QuickActions() {
  const recentTransactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      asset: "Folkekraft AS",
      symbol: "FLK",
      amount: "4800",
      fee: "0",
      timestamp: "16 des. 16:51",
    },
    {
      id: "2",
      type: "buy",
      asset: "Folkekraft AS",
      symbol: "FLK",
      amount: "1008",
      fee: "0",
      timestamp: "16 des. 16:50",
    },
  ];
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className=" flex items-center space-x-3">
          <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
            <Workflow className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
          </div>
          <div className="text-base font-medium">Hurtig handlinger</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2"
        >
          <motion.div variants={item}>
            <ActionCard
              icon="transfer"
              title="Overfør penger til Emisjon"
              description="Betal for dine aksjer"
            />
          </motion.div>
          <motion.div variants={item}>
            <ActionCard
              icon="send"
              title="Send krypto"
              description="Gjør et uttak av krypto"
            />
          </motion.div>
          <motion.div variants={item}>
            <ActionCard
              icon="deposit"
              title="Sett inn norske kroner"
              description="Invester i krypto når du selv ønsker"
            />
          </motion.div>
        </motion.div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="pb-4 flex items-center space-x-3">
              <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                <ArrowRightLeft className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
              </div>
              <div className="text-base font-medium">Siste transaksjoner</div>
            </div>
            <Button variant="link" className="text-sm">
              Se alle
            </Button>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {recentTransactions.map((transaction) => (
              <motion.div key={transaction.id} variants={item}>
                <RecentTransaction transaction={transaction} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
