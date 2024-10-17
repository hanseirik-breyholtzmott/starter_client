"use client";

import React, { useState } from "react";

//Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Icons
import { X, ChevronDown, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

type Props = {};

export default function Sidebar({}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("Company 1");
  const [companies, setCompanies] = useState([
    { value: "company1", label: "Company 1" },
    { value: "company2", label: "Company 2" },
    { value: "company3", label: "Company 3" },
  ]);
  const [navItems, setNavItems] = useState([
    { icon: "Home", label: "Home" },
    { icon: "LayoutDashboard", label: "Dashboard" },
    { icon: "Settings", label: "Settings" },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-6">
          <span className="text-2xl font-semibold">ShareTrack</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="px-4 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedCompany}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {companies.map((company) => (
                <DropdownMenuItem
                  key={company.value}
                  onSelect={() => setSelectedCompany(company.label)}
                >
                  {company.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="flex-1 space-y-2 px-2">
          {navItems.map((item, index) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;
            return (
              <a
                key={index}
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
