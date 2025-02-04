"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Send, Banknote } from "lucide-react";

interface ActionCardProps {
  icon: "transfer" | "send" | "deposit";
  title: string;
  description: string;
}

const icons = {
  transfer: Wallet,
  send: Send,
  deposit: Banknote,
};

export function ActionCard({ icon, title, description }: ActionCardProps) {
  const Icon = icons[icon];

  return (
    <Button
      variant="ghost"
      className="w-full justify-between hover:bg-gray-100 p-4 h-auto"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-emerald-100 rounded-full">
          <Icon className="h-5 w-5 text-[#00263D]" />
        </div>
        <div className="text-left">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground" />
    </Button>
  );
}
