"use client";

import { ColumnDef } from "@tanstack/react-table";

//Shadcn
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

//Helper functions
import { formatValue } from "@/lib/helperFunctions";

//Icons
import { ArrowUpDown } from "lucide-react";

type Investor = {
  userId: string;
  totalShares: number;
  name: string;
  email: string;
  ownershipPercentage: number;
};

export const columns: ColumnDef<Investor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Navn
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "totalShares",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Aksjer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const totalShares = row.getValue("totalShares");
      const formatted = formatValue(totalShares as number, 0, false);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "ownershipPercentage",
    header: () => <div className="text-center">Eierandel %</div>,
    cell: ({ row }) => {
      const ownershipPercentage = parseFloat(
        row.getValue("ownershipPercentage")
      );
      const formatted = `${ownershipPercentage.toFixed(2)}%`;

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
