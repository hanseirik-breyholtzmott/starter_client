"use client";

import React, { useState } from "react";
import Link from "next/link";

//Nav
import nav from "@/config/contants";

//Shadn
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

//Icons
import { LayoutDashboard, CirclePlus, ChevronsUpDown } from "lucide-react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type Props = {};

const Sidebar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <aside className="bg-white hidden md:block w-24 lg:w-64 fixed h-full transition-all ease-in-out">
      <div className="bg-white h-[64px] w-full relative flex items-center justify-center">
        <Link href={"/dashboard"}>
          <h2 className="text-4xl font-bold">Logo</h2>
        </Link>
      </div>

      <nav className="p-4">
        <Popover>
          <PopoverTrigger className="w-full">
            <div className="flex flex-row items-center justify-center lg:justify-between border p-2 rounded-xl hover:bg-zinc-200 transition-all ease-in-out">
              <div className="flex flex-row items-center">
                <div className="rounded-lg bg-slate-800 h-[40px] w-[40px]">
                  {/** LOGO */}
                </div>
                <div className=" flex-col items-start pl-2 hidden lg:flex">
                  <p className="font-semibold text-sm text-black">Folkekraft</p>
                  <p className="text-[10px] text-stone-500">
                    Team - 20 Members
                  </p>
                </div>
              </div>
              <ChevronsUpDown className="hidden lg:block" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2">
            <div>
              <ul className="flex flex-col gap-2">
                <p className="text-[10px] font-medium ">Personal Acccount</p>
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer">
                  Hans-Eirik Breyholtz-Mott
                </li>
                <p className="text-[10px] font-medium">Companies</p>
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer">
                  Company AS
                </li>
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer">
                  Company AS 2
                </li>
                <Separator />
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer flex flex-row items-center">
                  <CirclePlus size={16} className="mr-2" /> Create new
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>

        <ul className=" flex flex-col space-y-2">
          <p className="text-sm text-slate-700">Menu</p>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Dashboard</p>
            </li>
          </a>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Report</p>
            </li>
          </a>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Products</p>
            </li>
          </a>
          <Link href={"/dashboard/customer"}>
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg text-slate-900">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Customers</p>
            </li>
          </Link>
          <p className="text-sm text-slate-700">Financial</p>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Transactions</p>
            </li>
          </a>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Invoices</p>
            </li>
          </a>
          <p className="text-sm text-slate-700">Tools</p>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Settings</p>
            </li>
          </a>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Feedback</p>
            </li>
          </a>
          <a href="#" className="text-slate-900">
            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg">
              <LayoutDashboard className="lg:mr-2" />
              <p className="hidden lg:block">Help</p>
            </li>
          </a>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
