"use client";

import { ColumnDef } from "@tanstack/react-table";

//Shadcn
import { Button } from "@/components/ui/button";

//Icons
import { ArrowUpDown } from "lucide-react";

export type Investors = {
  name: string;
  shares: number;
  ownership: number;
};

export const columns: ColumnDef<Investors>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
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
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "shares",
    header: ({ column }) => {
      return (
        <div className="text-center">
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
      return <div className="text-center">{row.getValue("shares")}</div>;
    },
  },
  {
    accessorKey: "ownership",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button variant="ghost">Eiendeler</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("ownership")}</div>;
    },
  },
];
