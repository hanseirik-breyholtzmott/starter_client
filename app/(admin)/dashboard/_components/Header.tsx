import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Menu, Search } from "lucide-react";

type Props = {};

export default function Header({}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden mr-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold">Shareholder Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Popover open={searchQuery.length > 0}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search shareholders..."
                  className="pl-8 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              {/* Command Input & Results */}
            </PopoverContent>
          </Popover>
          <Button variant="ghost" size="icon">
            {" "}
            {/* Notifications Icon */}{" "}
          </Button>
          <Button variant="ghost" size="icon">
            {" "}
            {/* Account Icon */}{" "}
          </Button>
        </div>
      </div>
    </header>
  );
}
