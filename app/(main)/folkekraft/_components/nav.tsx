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

export default function Navbar() {
  return (
    <div className="w-full bg-white border-b">
      <nav className="flex items-center justify-between p-4  container mx-auto">
        <div className="flex items-center space-x-8">
          <Link href="/" className=" items-center space-x-2 hidden">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded">
              R
            </div>
            <span className="text-xl font-semibold">Republic</span>
          </Link>
          <div className="hidden space-x-6">
            <Link
              href="/investors"
              className="text-gray-600 hover:text-gray-900"
            >
              Investors
            </Link>
            <Link
              href="/businesses"
              className="text-gray-600 hover:text-gray-900"
            >
              Businesses
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
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden">
            <Globe size={20} />
            <span className="ml-1">US</span>
          </Button>

          <Link href={"/folkekraft/portfolio"}>
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
            <PopoverTrigger>
              <div className="flex items-center space-x-2 h-10 w-10 bg-blue-600 text-white rounded-md"></div>
            </PopoverTrigger>
            <PopoverContent>
              <div>
                <ul className="flex flex-col gap-2">
                  <Link href={"/folkekraft/profile"}>
                    <li className="flex flex-row text-lg items-center p-2">
                      <User size={20} />{" "}
                      <p className="ml-2 text-md">My Profile</p>
                    </li>
                  </Link>
                  <Link href={"/dashboard"}>
                    <li className="flex flex-row text-lg items-center p-2">
                      <Settings size={20} /> <p className="ml-2">Verve lenke</p>
                    </li>
                  </Link>
                  <Link href={"folkekraft/settings"}>
                    <li className="flex flex-row text-lg items-center p-2">
                      <Settings size={20} />{" "}
                      <p className="ml-2">Innstillinger</p>
                    </li>
                  </Link>
                  <Link href={"/dashboard"}>
                    <li className="flex flex-row text-lg items-center p-2 text-red-500">
                      <LogOut size={20} /> <p className="ml-2">Log out</p>
                    </li>
                  </Link>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </div>
  );
}
