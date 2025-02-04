"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ListTodo, Users, Wallet } from "lucide-react";

export function OverviewCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
        <CardHeader className="pb-4">
          <CardTitle className=" flex items-center space-x-3">
            <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
              <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
              <Wallet className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
            </div>
            <div className="text-base font-medium">Min beholdning</div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold">4 533,60 kr</div>
            <div className="text-sm text-[#57C7B7]">+10% fra start</div>
          </div>
        </CardContent>
      </Card>

      <Link href="/dashboard/investor-avstemning">
        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className=" flex items-center space-x-3">
              <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
                <ListTodo className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
              </div>
              <div className="text-base font-medium">Vi trenger din hjelp!</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold hover:underline flex items-center">
                Investor avstemning -{" "}
                <span className="text-sm pl-2 font-normal">
                  Stem på hva vi skal gjøre
                </span>
              </div>
              <div className="text-sm text-green-600 hidden">
                +10% fra start
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
