"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Icons
import { ExternalLink, FileText, Ellipsis } from "lucide-react";

//Helpers
import { formatCurrency, formatDateString } from "@/lib/helperFunctions";

export interface Transaction {
  id: number;
  transactionDate: string;
  amount: string;
  stripePaymentId: string;
  status: string;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
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
    accessorKey: "stripePaymentId",
    header: () => <div className="text-center">KID/Melding</div>,
    cell: ({ row }) => {
      var invoice = row.getValue("stripePaymentId") as string;
      return <div className="text-center">{invoice}</div>;
    },
  },
  {
    accessorKey: "stripePaymentId",
    header: () => <div className="text-center">Bankkontonummer</div>,
    cell: ({ row }) => {
      return <div className="text-center">3208.27.99299</div>;
    },
  },

  {
    accessorKey: "transactionDate",
    header: () => <div className="text-center">Tegningsdato</div>,
    cell: ({ row }) => {
      var date = row.getValue("transactionDate") as string;
      return <div className="text-center">{formatDateString(date)}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Beløp</div>,
    cell: ({ row }) => {
      var amount = row.getValue("amount") as number;
      return <div className="text-center">{formatCurrency(amount)}</div>;
    },
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          <Popover>
            <PopoverTrigger>
              <Ellipsis size={20} />
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-4">
              <p>Kommer snart . . .</p>
              {/**
               * <div>
                <ul className="flex flex-col gap-2">
                  <Link href={"/dashboard/profile"}>
                    <li className="flex flex-row text-sm">
                      <ExternalLink size={20} />{" "}
                      <p className="ml-2">View invoice</p>
                    </li>
                  </Link>
                  <Link href={"/dashboard/transactions"}>
                    <li className="flex flex-row text-sm">
                      <FileText size={20} />{" "}
                      <p className="ml-2">Download Invoice</p>
                    </li>
                  </Link>
                </ul>
              </div>
               */}
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

/**
 * Status
 * Date
 * Amount
 * Invoice
 * Options
 */
