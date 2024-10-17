"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedShareholder, setSelectedShareholder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("Acme Inc");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { icon: Home, label: "Dashboard" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Users, label: "Shareholders" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help" },
  ];

  const cardData = [
    { title: "Number of Shareholders", value: "5,234" },
    { title: "Number of Shares", value: "10,000,000" },
    { title: "Number of Share Classes", value: "3" },
    { title: "Price per Share", value: "$45.67" },
  ];

  const transactionData = [
    { date: "Jan", buys: 65, sells: 40 },
    { date: "Feb", buys: 78, sells: 52 },
    { date: "Mar", buys: 90, sells: 70 },
    { date: "Apr", buys: 81, sells: 63 },
    { date: "May", buys: 56, sells: 48 },
    { date: "Jun", buys: 55, sells: 41 },
    { date: "Jul", buys: 40, sells: 30 },
  ];

  const recentTransactions = [
    {
      id: 1,
      shareholder: "John Doe",
      type: "Buy",
      shares: 100,
      value: "$4,567",
    },
    {
      id: 2,
      shareholder: "Jane Smith",
      type: "Sell",
      shares: 50,
      value: "$2,283.50",
    },
    {
      id: 3,
      shareholder: "Bob Johnson",
      type: "Buy",
      shares: 200,
      value: "$9,134",
    },
    {
      id: 4,
      shareholder: "Alice Brown",
      type: "Sell",
      shares: 75,
      value: "$3,425.25",
    },
  ];

  const shareholderData = [
    {
      id: 1,
      name: "John Doe",
      shareClass: "A",
      shares: 10000,
      ownership: "5%",
      value: "$456,700",
    },
    {
      id: 2,
      name: "Jane Smith",
      shareClass: "B",
      shares: 5000,
      ownership: "2.5%",
      value: "$228,350",
    },
    {
      id: 3,
      name: "Acme Corp",
      shareClass: "A",
      shares: 50000,
      ownership: "25%",
      value: "$2,283,500",
    },
    {
      id: 4,
      name: "Bob Johnson",
      shareClass: "C",
      shares: 2000,
      ownership: "1%",
      value: "$91,340",
    },
    {
      id: 5,
      name: "Alice Brown",
      shareClass: "B",
      shares: 8000,
      ownership: "4%",
      value: "$365,360",
    },
  ];

  const companies = [
    { value: "acme", label: "Acme Inc" },
    { value: "globex", label: "Globex Corporation" },
    { value: "initech", label: "Initech" },
  ];

  const searchResults = shareholderData.filter((shareholder) =>
    shareholder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
            {navItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
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
                  <Command>
                    <CommandInput placeholder="Search shareholders..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {searchResults.map((shareholder) => (
                        <CommandItem key={shareholder.id}>
                          <span>{shareholder.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Account</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {cardData.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transactions Chart and Recent Transactions */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    buys: {
                      label: "Buys",
                      color: "hsl(var(--chart-1))",
                    },
                    sells: {
                      label: "Sells",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="buys"
                        fill="var(--color-buys)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="sells"
                        fill="var(--color-sells)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Legend verticalAlign="top" height={36} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {transaction.shareholder}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.type} {transaction.shares} shares
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {transaction.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shareholder Data Table */}

          <Card>
            <CardHeader>
              <CardTitle>Shareholder Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shareholder</TableHead>
                    <TableHead>Share Class</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead>Ownership %</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shareholderData.map((shareholder) => (
                    <TableRow key={shareholder.id}>
                      <TableCell className="font-medium">
                        {shareholder.name}
                      </TableCell>
                      <TableCell>{shareholder.shareClass}</TableCell>
                      <TableCell>
                        {shareholder.shares.toLocaleString()}
                      </TableCell>
                      <TableCell>{shareholder.ownership}</TableCell>
                      <TableCell>{shareholder.value}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Sheet>
                              <SheetTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  View details
                                </DropdownMenuItem>
                              </SheetTrigger>
                              <SheetContent>
                                <SheetHeader>
                                  <SheetTitle>Shareholder Details</SheetTitle>
                                  <SheetDescription>
                                    Detailed information about{" "}
                                    {shareholder.name}
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="py-4">
                                  <h3 className="font-medium">
                                    Name: {shareholder.name}
                                  </h3>
                                  <p>Share Class: {shareholder.shareClass}</p>
                                  <p>
                                    Shares:{" "}
                                    {shareholder.shares.toLocaleString()}
                                  </p>
                                  <p>Ownership: {shareholder.ownership}</p>
                                  <p>Value: {shareholder.value}</p>
                                </div>
                              </SheetContent>
                            </Sheet>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
