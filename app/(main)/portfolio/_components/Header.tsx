"use client";

import React, { useEffect, useState, useRef, MouseEvent } from "react";

import Image from "next/image";

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
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
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
  CircleArrowUp,
  PanelRightOpen,
  ChevronsUpDown,
  BadgeCheck,
  CreditCard,
  Plus,
} from "lucide-react";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Bli kunde",
    href: "/docs/introduction",
    description: "Når du blir kunde, får du 1000 kr i aksjer!",
  },
  {
    title: "Kampanje",
    href: "/docs/installation",
    description: "Se om vi har noe ledig muligheter å investere i.",
  },
  {
    title: "Folkekraft App",
    href: "/docs/typography",
    description:
      "Du får en egen app for å holde oversikt over dine investeringer.",
  },
];

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
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
      <div className="flex items-center justify-between px-6 py-3">
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
          <Image
            src="https://utfs.io/f/1c66qeb7SCm5YmfZi4ybcQKOgLiwrEyTUDXzp5sHV1kNR4d9"
            alt="Folkekraft"
            width={180}
            height={100}
            priority
          />
          <NavigationMenu className="ml-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Invester nå</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3 col-span-2 md:col-span-1">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex flex-col space-y-4 justify-center items-center h-full w-full select-none rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image
                            src="https://utfs.io/f/1c66qeb7SCm5XW8sq2fojOvUIbCWn7QpSE4kLV9ZBYa0uec1"
                            alt="Folkekraft"
                            width={180}
                            height={100}
                            priority
                          />
                          <p className="text-sm leading-tight text-muted-foreground">
                            Folkekraft har et eget plattform for å investere i
                            aksjer. Se på de ulike mulighetene og investere i
                            aksjer i dag!
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="hidden">
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem title="Components" href="/docs/components">
                      A collection of ready-to-use components.
                    </ListItem>
                    <ListItem title="Button" href="/docs/components/button">
                      Displays a button or a component that looks like a button.
                    </ListItem>
                    <ListItem title="Dialog" href="/docs/components/dialog">
                      A modal dialog that interrupts the user with important
                      content.
                    </ListItem>
                    <ListItem title="Input" href="/docs/components/input">
                      Displays a form input field or a component that looks like
                      an input field.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kontakt
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between hover:bg-muted p-2 rounded-md cursor-pointer w-full">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src="https://utfs.io/f/1c66qeb7SCm5XUBsH1fojOvUIbCWn7QpSE4kLV9ZBYa0uec1"
                      alt="User avatar"
                    />
                    <AvatarFallback>HB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Hans-Eirik Breyholtz-Mott
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      hans-eirik@folkekraft.no
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
              side="bottom"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Hans-Eirik Breyholtz-Mott
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    hans-eirik@folkekraft.no
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <CircleArrowUp className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  <span>Transaksjoner</span>
                </DropdownMenuItem>
                <Link href="/portfolio/innstillinger">
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Innstillinger</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
