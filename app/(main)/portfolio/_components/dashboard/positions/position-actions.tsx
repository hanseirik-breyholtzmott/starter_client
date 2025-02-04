"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";

type Position = {
  id: string;
  asset: string;
  symbol: string;
  amount: number;
  value: number;
  avgBuyPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
};

interface PositionActionsProps {
  position: Position;
}

export function PositionActions({ position }: PositionActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Buy more</DropdownMenuItem>
        <DropdownMenuItem>Sell</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View history</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
