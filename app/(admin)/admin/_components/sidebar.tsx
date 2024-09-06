"use client";

import React, { useState } from "react";
import Link from "next/link";

//Nav
import { adminNavLinks } from "@/config/contants";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

//Icons
import { CirclePlus, ChevronsUpDown, ChevronRight } from "lucide-react";

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
                  <p className="font-semibold text-sm text-black">
                    {process.env.NEXT_PUBLIC_COMPANY_NAME}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Company - 400+ investorer
                  </p>
                </div>
              </div>
              <ChevronsUpDown className="hidden lg:block" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2">
            <div className="pt-4">
              <ul className="flex flex-col gap-2">
                <p className="text-[10px] font-medium ">Personal Acccount</p>
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer">
                  Investor name
                </li>
                <p className="text-[10px] font-medium">Companies</p>
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer">
                  Folkekraft AS
                </li>

                <Separator />
                <li className="text-sm hover:bg-zinc-200 transition-all ease-in-out p-1 cursor-pointer flex flex-row items-center">
                  <CirclePlus size={16} className="mr-2" /> Legg til bedrift
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>

        <ul className="flex flex-col space-y-2">
          {["Menu", "Financial", "Tools"].map((category) => (
            <React.Fragment key={category}>
              <p className="text-sm text-slate-700">{category}</p>
              {adminNavLinks
                .filter((link) => link.category === category)
                .map((link) => (
                  <React.Fragment key={link.name}>
                    <Link href={link.href}>
                      <li className="flex flex-row lg:justify-between justify-center w-full hover:bg-stone-300 p-2 rounded-lg text-slate-900">
                        <div className="flex items-center">
                          <link.icon className="lg:mr-2" />
                          <p className="hidden lg:block">{link.name}</p>
                        </div>
                        {link.subMenu && (
                          <ChevronRight size={16} className="hidden lg:block" />
                        )}
                      </li>
                    </Link>
                    {link.subMenu && (
                      <ul className="ml-4 hidden lg:block">
                        {link.subMenu.map((subLink) => (
                          <Link key={subLink.name} href={subLink.href}>
                            <li className="flex flex-row lg:justify-start justify-center w-full hover:bg-stone-300 p-2 rounded-lg text-slate-900">
                              <subLink.icon className="lg:mr-2" />
                              <p className="hidden lg:block">{subLink.name}</p>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
