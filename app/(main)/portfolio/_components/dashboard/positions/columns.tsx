import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { PositionActions } from "./position-actions";
import { formatCurrency, formatValue } from "@/lib/helperFunctions";

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

export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "asset",
    header: "Aksjer",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="font-medium ">{row.getValue("asset")}</div>
        <div className="text-gray-500 ">({row.original.symbol})</div>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Antall
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{formatValue(row.getValue("amount"))}</div>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verdi (NOK)
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {formatCurrency(row.getValue("value"), 2, true)}
      </div>
    ),
  },
  {
    accessorKey: "profitLossPercentage",
    header: ({ column }) => (
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          P/L %
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("profitLossPercentage") as number;
      return (
        <div
          className={`text-center ${
            amount >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {amount >= 0 ? "+" : ""}
          {amount}%
        </div>
      );
    },
  },
];
