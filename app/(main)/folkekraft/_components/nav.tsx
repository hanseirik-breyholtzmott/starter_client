"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//Icons
import {
  Globe,
  Search,
  Zap,
  ChartPie,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import {} from "lucide-react";

import { useAuth } from "@/app/hooks/AuthContext";

export default function Navbar() {
  const { signOut, user } = useAuth();
  return (
    <div className="w-full bg-white border-b">
      <nav className="flex items-center justify-between p-4  container mx-auto">
        <div className=" items-center space-x-8 flex">
          <Link href="/" className="flex items-center space-x-2 ">
            <div className="w-8 h-8 bg-[#00263D] text-white hidden items-center justify-center font-bold rounded md:flex">
              F
            </div>

            <p className="text-3xl font-bold">Folkekraft</p>
          </Link>
          <div className=" space-x-6 flow-row items-center hidden md:flex">
            <Link
              href="/folkekraft"
              className="text-gray-600 hover:text-gray-900"
            >
              Folkekraft AS Emisjon
            </Link>
          </div>
        </div>
        <div className="flex-1 max-w-xl px-4 hidden">
          <div className="relative">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-[#59C9B9] focus:ring-2 focus:ring-[#00263D]"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden">
            <Globe size={20} />
            <span className="ml-1">US</span>
          </Button>

          <Link href={"/folkekraft/invest"}>
            <Button variant="ghost" size="icon">
              <Zap size={20} />
            </Button>
          </Link>

          <Link href={"/folkekraft/portfolio"}>
            <Button variant="ghost" size="icon">
              <ChartPie size={20} />
            </Button>
          </Link>

          <Popover>
            <PopoverTrigger className="flex items-center space-x-4">
              <div>{user?.firstName}</div>
              <div className="flex items-center space-x-2 h-10 w-10 bg-[#00263D] text-white rounded-md"></div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <ul className="flex flex-col gap-2">
                  <Link href={"/folkekraft/profile"}>
                    <li className="flex flex-row text-lg items-center p-2">
                      <User size={20} />{" "}
                      <p className="ml-2 text-md">Min profil</p>
                    </li>
                  </Link>
                  <Link href={"/folkekraft/portfolio"}>
                    <li className="flex flex-row text-lg items-center p-2">
                      <ChartPie size={20} />{" "}
                      <p className="ml-2">Min portefølje</p>
                    </li>
                  </Link>

                  <div
                    onClick={() => {
                      signOut();
                    }}
                    className="cursor-pointer"
                  >
                    <li className="flex flex-row text-lg items-center p-2 text-red-500">
                      <LogOut size={20} /> <p className="ml-2">Log out</p>
                    </li>
                  </div>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
}
