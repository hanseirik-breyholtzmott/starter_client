"use client";

import * as React from "react";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./positions/columns";
import { ChartCandlestick, Wallet } from "lucide-react";
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

const positions: Position[] = [
  {
    id: "1",
    asset: "Folkekraft AS",
    symbol: "FLK",
    amount: 53754,
    value: 25000,
    avgBuyPrice: 645048,
    profitLoss: 2000,
    profitLossPercentage: 8.7,
  },
  {
    id: "2",
    asset: "Folkekraft Bedrift AS",
    symbol: "FKB",
    amount: 10000,
    value: 4500,
    avgBuyPrice: 4800,
    profitLoss: -300,
    profitLossPercentage: -6.25,
  },
  {
    id: "3",
    asset: "Folkekraft Group AS",
    symbol: "FKG",
    amount: 10,
    value: 2519.25,
    avgBuyPrice: 2000,
    profitLoss: 519.25,
    profitLossPercentage: 25.96,
  },
];

export function PositionsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: positions,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full ">
      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-start p-6 pb-4 space-x-3">
          <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
            <ChartCandlestick className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
          </div>
          <div className="text-base font-medium">Min portefølje</div>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
