"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

//Shadcn
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

//Icons
import { ArrowUpDown, Ellipsis, FileText, ExternalLink } from "lucide-react";

export type Investors = {
  id: number;
  name: string;
  shares: number;
  ownership: number;
};

export const columns: ColumnDef<Investors>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
              <div>
                <ul className="flex flex-col gap-2">
                  <Link href={"/dashboard/profile"}>
                    <li className="flex flex-row text-sm">
                      <ExternalLink size={20} />
                    </li>
                  </Link>
                  <Link href={"/dashboard/transactions"}>
                    <li className="flex flex-row text-sm">
                      <FileText size={20} /> <p className="ml-2">gfj</p>
                    </li>
                  </Link>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
