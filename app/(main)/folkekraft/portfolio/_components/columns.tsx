"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

//Helper functions
import {
  formatCurrency,
  formatDateString,
  formatValue,
} from "@/lib/helperFunctions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Shareportfolio = {
  companyId: string;
  companyName: string;
  identifierType: string;
  identifierValue: string;
  shareClassId: string;
  shareClassName: string;
  totalShares: number;
  totalInvestment: number;
};

export const columns: ColumnDef<Shareportfolio>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return <div className="text-center">Selskapsnavn</div>;
    },
    cell: ({ row }) => {
      const companyName = row.getValue("companyName") as string;

      return <div className="text-center font-medium">{companyName}</div>;
    },
  },
  {
    accessorKey: "identifierValue",
    header: ({ column }) => {
      return <div className="text-center">Aksjonær type</div>;
    },
    cell: ({ row }) => {
      const identifierType = row.original.identifierType;
      const identifierValue = row.getValue("identifierValue") as string;
      if (identifierValue.length === 11) {
        return <div className="text-center">Privatperson</div>;
      } else {
        return (
          <div className="text-center">
            {formatValue(parseInt(identifierValue), 0, false)} / Selskap
          </div>
        );
      }
    },
  },
  {
    accessorKey: "shareClassName",
    header: () => <div className="text-center">Aksjeklasse</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue("shareClassName")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalShares",
    header: () => <div className="text-center">Antall aksjer</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {formatValue(row.getValue("totalShares"), 0, false)}
        </div>
      );
    },
  },
  {
    accessorKey: "totalInvestment",
    header: () => <div className="text-center">Investeringsbeløp</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {formatCurrency(row.getValue("totalInvestment"))}
        </div>
      );
    },
  },
];
