"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

//Helper functions
import { formatCurrency, formatDateString } from "@/lib/helperFunctions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transactions = {
  id: string;
  paymentId: string;
  date: string;
  amount: number;
  status: string;
};

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <div className="text-center">Status</div>;
    },
    cell: ({ row }) => {
      const status = (row.getValue("status") as string).toLowerCase();

      return (
        <div
          className={`text-center font-medium ${
            status === "success" ? "text-green-600" : status === "pending"
          }`}
        >
          <Badge
            variant="outline"
            className={` ${
              status === "paid"
                ? "text-green-600 bg-green-200 border-green-200"
                : status === "pending"
                ? "text-yellow-500 bg-yellow-200 border-yellow-200"
                : status === "canceled"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Dato
            <ArrowUpDown className="ml-2 h-4 w-4 " />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {formatDateString(row.getValue("date"))}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Beløp</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {formatCurrency(row.getValue("amount"), 0, false)}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentId",
    header: () => <div className="text-center">KID/Melding</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("paymentId")}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">Banknr</div>,
    cell: ({ row }) => {
      return <div className="text-center font-medium">3208.27.99299</div>;
    },
  },

  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-center px-4 py-2">
              Kommer snart . . .
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
