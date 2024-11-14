"use client";

import React, { useState, useEffect, useMemo } from "react";

//Shadcn
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//Charts
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

//Icons
import { MoreVertical } from "lucide-react";

//Data
const productData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 3000 },
  { name: "Jun", value: 4000 },
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

const allShareholders = [
  { name: "Iskraft AS", value: 25.5 },
  { name: "BlackRock", value: 18.3 },
  { name: "State Street Corporation", value: 12.7 },
  { name: "FMR LLC", value: 9.2 },
  { name: "T. Rowe Price Associates", value: 7.8 },
  { name: "Capital Research & Management", value: 5.4 },
  { name: "Invesco Ltd.", value: 4.1 },
  { name: "Geode Capital Management", value: 3.6 },
  { name: "Northern Trust Corporation", value: 2.9 },
  { name: "Bank of America Corporation", value: 2.5 },
];

const sortedShareholders = [...allShareholders].sort(
  (a, b) => b.value - a.value
);
const topShareholders = sortedShareholders.slice(0, 5);
const othersValue = sortedShareholders
  .slice(5)
  .reduce((sum, shareholder) => sum + shareholder.value, 0);

const chartData = [...topShareholders, { name: "Others", value: othersValue }];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted))",
];

const chartData2 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Shareholders() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("shareholders");
  const [userType, setUserType] = useState<"company" | "investor">("company");
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
    setOpen(false);
  };

  const totalShares = chartData.reduce((sum, entry) => sum + entry.value, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsLoading(true);
  };

  const renderCompanyForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="companyName">Selskapets navn</Label>
        <Input id="companyName" placeholder="Navn på selskapet" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Selskapets organisasjonsnummer</Label>
        <Input id="companyName" placeholder="Organisasjonsnummer" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Fornavn</Label>
        <Input id="businessType" placeholder="Fornavn" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Etternavn</Label>
        <Input id="businessType" placeholder="Etternavn" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Epost</Label>
        <Input id="businessType" placeholder="Epost" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Telefonnummer</Label>
        <Input id="businessType" placeholder="Telefonnummer" />
      </div>
    </>
  );

  const renderInvestorForm = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="companyName">Personnummer</Label>
        <Input id="companyName" placeholder="Personnummer" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Fornavn</Label>
        <Input id="businessType" placeholder="Fornavn" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Etternavn</Label>
        <Input id="businessType" placeholder="Etternavn" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Epost</Label>
        <Input id="businessType" placeholder="Epost" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="businessType">Telefonnummer</Label>
        <Input id="businessType" placeholder="Telefonnummer" />
      </div>
    </>
  );

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">
        Lorem ipsum dolor sit amet erprime dolore nibh.{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Hide data
        </a>
      </p>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="shareholders">Shareholders</TabsTrigger>
          <TabsTrigger value="tags">Fully Diluted</TabsTrigger>
        </TabsList>
        <TabsContent value="shareholders">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* First card spanning over 3 columns */}
            <Card className="col-span-1 md:col-span-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Topp 5 aksjonærer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                  <div className="relative w-[240px] h-[240px]">
                    <ChartContainer
                      config={{
                        shareholders: {
                          label: "Shareholders",
                        },
                      }}
                      className="w-full h-full"
                    >
                      <>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie
                              data={chartData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={100}
                              paddingAngle={0}
                            >
                              {chartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-2xl font-bold">
                              {totalShares.toFixed(1)}%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Total Shares
                            </p>
                          </div>
                        </div>
                      </>
                    </ChartContainer>
                  </div>
                  <div className="mt-8 md:mt-0 md:ml-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Shareholder List
                    </h3>
                    <ul className="space-y-2">
                      {chartData.map((shareholder, index) => (
                        <li key={index} className="flex items-center">
                          <span
                            className="w-4 h-4 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></span>
                          <span className="flex-1">{shareholder.name}</span>
                          <span className="font-semibold">
                            {shareholder.value.toFixed(1)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second card taking one column */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Second Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig2}>
                  <BarChart
                    accessibilityLayer
                    data={chartData2}
                    layout="vertical"
                    margin={{
                      left: 0,
                    }}
                  >
                    <YAxis
                      dataKey="browser"
                      type="category"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) =>
                        chartConfig[value as keyof typeof chartConfig]?.label
                      }
                    />
                    <XAxis dataKey="visitors" type="number" hide />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="visitors" layout="vertical" radius={5} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Third card taking one column */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Third Card
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>This card takes up one column.</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Input className="w-64" placeholder="Search..." />
                <Button variant="outline">Customize</Button>
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Legg til aksjonær</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>New User Registration</SheetTitle>
                    <SheetDescription>
                      Please provide your information below.
                    </SheetDescription>
                  </SheetHeader>
                  <Tabs
                    defaultValue="company"
                    className="w-full mt-4"
                    onValueChange={(value) =>
                      setUserType(value as "company" | "investor")
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="company">Company</TabsTrigger>
                      <TabsTrigger value="investor">
                        Private Investor
                      </TabsTrigger>
                    </TabsList>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <TabsContent value="company">
                        {renderCompanyForm()}
                      </TabsContent>
                      <TabsContent value="investor">
                        {renderInvestorForm()}
                      </TabsContent>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </SheetClose>
                        <Button type="submit">Submit</Button>
                      </SheetFooter>
                    </form>
                  </Tabs>
                </SheetContent>
              </Sheet>
            </div>

            {/* Shareholder Data Table */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Topp 5 aksjonærer</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Shareholder</TableHead>
                      <TableHead className="text-center">Share Class</TableHead>
                      <TableHead className="text-center">Shares</TableHead>
                      <TableHead className="text-center">Ownership %</TableHead>
                      <TableHead className="text-center">Value</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shareholderData.map((shareholder) => (
                      <TableRow key={shareholder.id}>
                        <TableCell className="font-medium text-center">
                          {shareholder.name}
                        </TableCell>
                        <TableCell className="text-center">
                          {shareholder.shareClass}
                        </TableCell>
                        <TableCell className="text-center">
                          {shareholder.shares.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-center">
                          {shareholder.ownership}
                        </TableCell>
                        <TableCell className="text-center">
                          {shareholder.value}
                        </TableCell>
                        <TableCell className="text-center">
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
          </div>
        </TabsContent>
        <TabsContent value="tags">
          <div>Tags</div>
        </TabsContent>
      </Tabs>
    </>
  );
}
