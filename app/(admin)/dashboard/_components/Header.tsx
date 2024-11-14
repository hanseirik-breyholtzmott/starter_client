"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";

//Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Charts
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

//Icons
import {
  Menu,
  X,
  Home,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  MoreVertical,
  Search,
  ChevronDown,
  GripVertical,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  User,
  LogOut,
  PanelRightOpen,
} from "lucide-react";

//Hooks
import { useTheme } from "next-themes";

// Define props for the Header
const notifications = [
  {
    id: 1,
    title: "New shareholder registered",
    content: "John Doe has registered as a new shareholder.",
    isNew: true,
  },
  {
    id: 2,
    title: "Large transaction detected",
    content: "A large transaction of 10,000 shares has been recorded.",
    isNew: true,
  },
  {
    id: 3,
    title: "Dividend payment processed",
    content: "The quarterly dividend payment has been processed successfully.",
    isNew: false,
  },
  {
    id: 4,
    title: "Annual report available",
    content: "The annual report for the fiscal year 2023 is now available.",
    isNew: false,
  },
];

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDragIcon, setShowDragIcon] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const sidebarRef = useRef<HTMLElement | null>(null);

  const { theme, setTheme } = useTheme();
  //const segment = useSelectedLayoutSegment();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-card shadow-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden mr-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <span className="text-3xl font-semibold">Folkekraft</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search shareholders..."
              className="pl-8 pr-4 py-2 w-64 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Notifications</span>
                <Bell className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  Stay updated with the latest activities and alerts.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Tabs defaultValue="new">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="read">Read</TabsTrigger>
                  </TabsList>
                  <TabsContent value="new">
                    <div className="space-y-4">
                      {notifications
                        .filter((n) => n.isNew)
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className="flex  items-start space-x-4 p-4 bg-accent rounded-md"
                          >
                            <div className="flex-1">
                              <h4 className="text-sm  font-semibold">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {notification.content}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              Mark as read
                            </Button>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="read">
                    <div className="space-y-4">
                      {notifications
                        .filter((n) => !n.isNew)
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-start space-x-4 p-4 bg-muted rounded-md"
                          >
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {notification.content}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
