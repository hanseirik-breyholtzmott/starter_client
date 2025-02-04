"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bitcoin, Gift, HandCoins, TicketCheck } from "lucide-react";

const payouts = [
  {
    id: 1,
    type: "Vervebonus",
    amount: "+ 25 aksjer (FLK)",
    date: "30 sep. 23:00",
  },
  {
    id: 2,
    type: "Vervebonus",
    amount: "+ 25 aksjer (FLK)",
    date: "01 apr. 14:29",
  },
  {
    id: 3,
    type: "Vervebonus",
    amount: "+ 25 aksjer (FLK)",
    date: "22 mars 11:25",
  },
];

export function PayoutsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" flex items-center space-x-3">
          <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
            <HandCoins className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
          </div>
          <div className="text-base font-medium">Utbetalinger</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  {payout.type === "Bonus" ? (
                    <TicketCheck className="h-4 w-4 text-[#00263D]" />
                  ) : (
                    <TicketCheck className="h-4 w-4 text-[#00263D]" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{payout.type}</p>
                  <p className="text-sm text-muted-foreground">{payout.date}</p>
                </div>
              </div>
              <p className="font-medium text-green-600">{payout.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
