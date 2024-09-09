"use client";

import { ColumnDef } from "@tanstack/react-table";

//Shadcn
import { Button } from "@/components/ui/button";

//Icons
import { ArrowUpDown } from "lucide-react";

export type Investor = {
  totalShares: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  ssn: string | null;
  ownershipPercentage: string;
};

export const columns: ColumnDef<Investor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Navn
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return <div className="text-center">{`${firstName} ${lastName}`}</div>;
    },
  },
  {
    accessorKey: "totalShares",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aksjer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("totalShares")}</div>
    ),
  },
  {
    accessorKey: "ownershipPercentage",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Eiendeler
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("ownershipPercentage")}</div>
    ),
  },
];
