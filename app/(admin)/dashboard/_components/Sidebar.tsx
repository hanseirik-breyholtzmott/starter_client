"use client";

import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

//Components
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  CircleArrowUp,
  BadgeCheck,
  LogOut,
  CreditCard,
  ChevronsUpDown,
  User,
  X,
  Home,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  MoreVertical,
  GripVertical,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  //Auth
  const { user } = useAuth();

  //useState
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDragIcon, setShowDragIcon] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("Folkekraft AS");
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const lastWidthRef = useRef(300);
  const segment = useSelectedLayoutSegment();

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      segment: null,
      isActive: segment === null,
    },
    {
      icon: BarChart2,
      label: "Analytics",
      segment: "analytics",
      isActive: segment === "analytics",
    },
    {
      icon: Users,
      label: "Shareholders",
      segment: "shareholders",
      isActive: segment === "shareholders",
    },
    {
      icon: Settings,
      label: "Settings",
      segment: "settings",
      isActive: segment === "settings",
    },
    {
      icon: HelpCircle,
      label: "Help",
      segment: "help",
      isActive: segment === "help",
    },
  ];

  const companies = [
    { value: "folkekraft", label: "Folkekraft AS" },
    { value: "folkekraft-bedrift", label: "Folkekraft Bedrift AS" },
    { value: "folkekraft-group", label: "Folkekraft Group AS" },
  ];

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
      setSidebarWidth(isCollapsed ? 300 : 80);
    }
  };

  /*const startResizing = () => setShowDragIcon(true);

  const stopResizing = () => setShowDragIcon(false);

  const resize = (e: MouseEvent) => {
    if (isResizing && sidebarRef.current) {
      const newWidth =
        e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth >= 80 && newWidth <= 400) {
        setSidebarWidth(newWidth);
        lastWidthRef.current = newWidth;
        setIsCollapsed(newWidth <= 80);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);*/

  return (
    <aside
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-card shadow-lg transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0`}
      style={{
        width: `${sidebarWidth}px`,
        minWidth: isCollapsed ? "80px" : "260px",
        maxWidth: "400px",
      }}
      onMouseEnter={() => setShowDragIcon(true)}
      onMouseLeave={() => setShowDragIcon(false)}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4 ">
          {(!isCollapsed || window.innerWidth < 768) && (
            <span className="text-2xl font-semibold">ShareTrack</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <X className="h-6 w-6" />
            )}
          </Button>
        </div>
        {(!isCollapsed || window.innerWidth < 768) && (
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.value} value={company.label}>
                  {company.label}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Legg til nytt selskap</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Sidebar Main Content */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <TooltipProvider>
          {navItems.map((item, index) => (
            <TooltipUI key={index}>
              <TooltipTrigger asChild>
                <Link
                  href={`/dashboard/${item.segment}`}
                  className={`flex items-center rounded-lg px-4 py-2 mb-1 text-sm font-medium ${
                    isCollapsed ? "justify-center" : ""
                  } ${
                    item.isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`}
                  />
                  {(!isCollapsed || window.innerWidth < 768) && item.label}
                </Link>
              </TooltipTrigger>
              {isCollapsed && window.innerWidth >= 768 && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </TooltipUI>
          ))}
        </TooltipProvider>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-border p-4">
        <div
          className="flex items-center space-x-3"
          style={{ minWidth: "200px" }}
        >
          {(!isCollapsed || window.innerWidth < 768) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer w-full">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                      />
                      <AvatarFallback>
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user?.firstName + " " + user?.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <ChevronsUpDown className="h-4 w-4" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
                side="right"
              >
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <CircleArrowUp className="mr-2 h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {!isCollapsed && window.innerWidth >= 768 && (
        <div
          className="absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize bg-border hover:bg-border/50 transition-colors duration-200"
          //onMouseDown={startResizing}
        >
          {showDragIcon && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background rounded-full p-1 shadow-md">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
