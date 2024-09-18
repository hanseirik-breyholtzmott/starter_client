"use client";

import React, { useState } from "react";

//Shadcn
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";
import { LineChart, Line } from "recharts";
import { CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {};

//Table
import { DataTable } from "./_components/data-table";
import { Payment, columns } from "./_components/columns";

//Icons
import { Mail, ArrowUpDown, Info } from "lucide-react";

//Data
const tabsData = [
  { id: "investments", label: "Investeringer", count: 1 },
  { id: "summary", label: "Oppsummering", count: null },
  { id: "tracker", label: "Tracker", count: null },
  { id: "transactions", label: "Transaksjoner", count: null },
];

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 173 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const investmentData = [
  {
    title: "Antall kunder",
    value: "652",
    bgColor: "bg-blue-50",
    button: {
      text: "Bli kunde",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Antall målepunkter",
    value: "684",
    bgColor: "bg-green-50",
  },
  {
    title: "Antall vervinger",
    value: "30",
    bgColor: "bg-blue-50",
  },
  {
    title: "Følgere på facebook",
    value: "128 452",
    bgColor: "bg-green-50",
    button: {
      text: "Følg oss!",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Følgere på instagram",
    value: "155,70 kr",
    bgColor: "bg-blue-50",
    button: {
      text: "Følg oss!",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Kunde rating Folkekraft",
    value: "539 811,90 kr",
    bgColor: "bg-green-50",
    button: {
      text: "gi oss tilbake melding",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Bytt rating",
    value: "3 / 5",
    bgColor: "bg-blue-50",
    button: {
      text: "Invester minimum",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Google rating",
    value: "4 671 000,00 kr",
    bgColor: "bg-green-50",
    button: {
      text: "Invester maksimum",
      action: () => console.log("Maximum investment clicked"),
    },
  },
  {
    title: "App rating",
    value: "4 671 000,00 kr",
    bgColor: "bg-blue-50",
    button: {
      text: "Invester maksimum",
      action: () => console.log("Maximum investment clicked"),
    },
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const tableData: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
];

const Dashboard = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("investments");

  return (
    <section className="container mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full sm:w-auto"
      >
        <div className="text-7xl font-black mt-8">
          <h1>Min portefølje</h1>
        </div>
        <TabsList className="h-auto p-0 bg-transparent flex flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
          <div className="flex flex-row gap-8">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                  activeTab === tab.id && "active:text-blue-600 border-blue-600"
                )}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </div>
          <a
            href="mailto:lg@folkekraft.no"
            className="flex items-center text-xl text-gray-500 hover:text-gray-700"
          >
            <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
            Spørsmål?
          </a>
        </TabsList>
        <TabsContent value="investments">
          <div className="container mx-auto p-4 my-12">
            <Card className="w-full mx-auto p-4">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-700">
                  Aksje oversikt
                </CardTitle>
              </CardHeader>
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Folkekraft aksjer{" "}
                      <Info className="inline-block w-4 h-4 text-gray-400" />
                    </TableHead>
                    <TableHead className="text-center">Dine aksjer</TableHead>
                    <TableHead className="text-center">
                      Estimated verdi{" "}
                      <Info className="inline-block w-4 h-4 text-gray-400" />
                    </TableHead>
                    <TableHead className="text-center">Buy/sell</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="text-center">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>

                        <div className="text-left">
                          <div>Folkekraft</div>
                          <div className="text-sm text-gray-500">Investor</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>4 500 kr</TableCell>
                    <TableCell>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                        Kjøp Folkekraft aksjer
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                        <div className="text-left">
                          <div>Folkekraft</div>
                          <div className="text-sm text-gray-500">Kunde</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>84</TableCell>
                    <TableCell>1 008 kr</TableCell>
                    <TableCell>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                        Bli Folkekraft kunde
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="text-center">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                        <div className="text-left">
                          <div>Folkekraft</div>
                          <div className="text-sm text-gray-500">Verving</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                        Del verve lenke
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="container mx-auto p-4 my-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                  <CardTitle className="text-2xl font-semibold text-gray-700">
                    Investments summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                        IN
                      </div>
                      <div>
                        <div className="font-semibold">Investor aksjer</div>
                        <div className="text-sm text-muted-foreground">
                          0 NOK
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                        K
                      </div>
                      <div>
                        <div className="font-semibold">Kunde aksjer</div>
                        <div className="text-sm text-muted-foreground">
                          0 NOK
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                        V
                      </div>
                      <div>
                        <div className="font-semibold">Verve aksjer</div>
                        <div className="text-sm text-muted-foreground">
                          2 000 NOK
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                      Bli kunde
                    </Button>
                    <Button className="w-full bg-slate-100  border-blue-600  text-blue-600 hover:bg-slate-200 border-2  text-lg h-12">
                      Invester
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                      Kontoverdi
                    </h2>
                    <Button variant="outline">
                      1 mnd <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 flex items-center">
                        Total verdi{" "}
                        <Info className="w-4 h-4 ml-1 text-gray-400" />
                      </h3>
                      <p className="text-4xl font-bold">5 508 NOK</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">
                          Utvikling (NOK)
                        </div>
                        <div className="text-2xl font-bold">0,00% 0</div>
                      </div>
                      <div className="hidden">
                        <div className="text-sm font-medium">
                          Markedsverdi (NOK)
                        </div>
                        <div className="text-2xl font-bold">0</div>
                      </div>
                    </div>

                    <ChartContainer
                      config={chartConfig}
                      className="w-full h-[300px]"
                    >
                      <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: 12,
                          right: 12,
                        }}
                      >
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="month"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                          dataKey="desktop"
                          type="natural"
                          stroke="rgb(59 130 246)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>

                    <div className=" grid-cols-2 gap-4 hidden">
                      <div>
                        <div className="text-sm font-medium">
                          Total investert (NOK)
                        </div>
                        <div className="text-xl font-bold">2 000</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Tjent (NOK)</div>
                        <div className="text-xl font-bold">0</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tracker">
          <div className="container mx-auto p-4 my-12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Tracker
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {investmentData.map((item, index) => (
                    <Card
                      key={index}
                      className={`${item.bgColor} border-none shadow-sm`}
                    >
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          {item.value}
                        </p>
                        {item.button && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={item.button.action}
                            className="w-full mt-2"
                          >
                            {item.button.text}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="transactions">
          <div className="container mx-auto p-4 my-12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-2xl font-semibold text-gray-700">
                    Transactions
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={tableData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Dashboard;
