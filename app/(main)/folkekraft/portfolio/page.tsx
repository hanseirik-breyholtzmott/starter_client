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

//Icons
import { Mail, ArrowUpDown, Info } from "lucide-react";

//Data
const tabsData = [
  { id: "investments", label: "Investeringer", count: 1 },
  { id: "summary", label: "Oppsummering", count: null },
  { id: "tracker", label: "Tracker", count: null },
  { id: "transactions", label: "Transaksjoner", count: null },
];

const data = [
  { date: "19 aug", value: 200 },
  { date: "26 aug", value: 200 },
  { date: "2 sep", value: 500 },
  { date: "9 sep", value: 1800 },
  { date: "16 sep", value: 2000 },
];

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 173 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Dashboard = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("investments");
  return (
    <section className="container mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full sm:w-auto"
      >
        <div className="text-7xl font-black">
          <h1>My portfolio</h1>
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
          <Table className="mb-32 mt-12">
            <TableHeader>
              <TableRow>
                <TableHead>
                  Company{" "}
                  <Info className="inline-block w-4 h-4 text-gray-400" />
                </TableHead>
                <TableHead>Your holding</TableHead>
                <TableHead>
                  Estimated value{" "}
                  <Info className="inline-block w-4 h-4 text-gray-400" />
                </TableHead>
                <TableHead>Buy/sell</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>

                    <div>
                      <div>Folkekraft</div>
                      <div className="text-sm text-gray-500">Investor</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$100</TableCell>
                <TableCell>$100</TableCell>
                <TableCell>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                    Kjøp Folkekraft aksjer
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                    <div>
                      <div>Folkekraft</div>
                      <div className="text-sm text-gray-500">Kunde</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$150</TableCell>
                <TableCell>$170</TableCell>
                <TableCell>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                    Bli Folkekraft kunde
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                    <div>
                      <div>Folkekraft</div>
                      <div className="text-sm text-gray-500">Verving</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>$150</TableCell>
                <TableCell>$150</TableCell>
                <TableCell>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12">
                    Del verve lenke
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="summary">
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-semibold text-gray-700">
                  Investments summary
                </CardTitle>
                <Select defaultValue="2022">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    Invested total{" "}
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </h3>
                  <p className="text-4xl font-bold">$400</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Companies
                  </h3>
                  <p className="text-4xl font-bold">3</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Capital deployment over time
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis hide />
                    <Bar
                      dataKey="amount"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 flex items-center">
                    Reg CF limit allocation{" "}
                    <Info className="w-4 h-4 ml-1 text-gray-400" />
                  </h3>
                  <p className="text-sm text-gray-700">
                    Default limit is $2500
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Reg A+ limit
                  </h3>
                  <p className="text-sm text-gray-700">Not set</p>
                </div>
                <Button variant="outline" className="w-full">
                  Update limit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tracker">
          <div className="container mx-auto p-4">
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
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
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
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
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
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mr-2">
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
                    <Button variant="outline" className="w-full">
                      Ny konto
                    </Button>
                    <Button className="w-full">Innbetaling</Button>
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
                        Invested total{" "}
                        <Info className="w-4 h-4 ml-1 text-gray-400" />
                      </h3>
                      <p className="text-4xl font-bold">$400</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">
                          Utvikling i dag (NOK)
                        </div>
                        <div className="text-2xl font-bold">0,00% 0</div>
                      </div>
                      <div>
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
                          stroke="var(--color-desktop)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ChartContainer>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium">
                          Tilgjengelig (NOK)
                        </div>
                        <div className="text-xl font-bold">2 000</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Kreditt (NOK)</div>
                        <div className="text-xl font-bold">0</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Mine hendelser</CardTitle>
                    <Button variant="outline">
                      <BarChart className="mr-2 h-4 w-4" /> Sammenlign
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="kommende">
                    <TabsList>
                      <TabsTrigger value="kommende">Kommende</TabsTrigger>
                      <TabsTrigger value="historiske">Historiske</TabsTrigger>
                    </TabsList>
                    <TabsContent value="kommende">
                      <p className="text-sm text-muted-foreground">
                        For øyeblikket har du ingen kommende hendelser
                      </p>
                    </TabsContent>
                    <TabsContent value="historiske">
                      <p className="text-sm text-muted-foreground">
                        Ingen historiske hendelser å vise
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Marked</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Børsen i dag
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nyheter">
                    <TabsList>
                      <TabsTrigger value="nyheter">Nyheter</TabsTrigger>
                      <TabsTrigger value="oversikt">Oversikt</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nyheter">
                      <p className="text-sm text-muted-foreground">
                        Ingen nyheter å vise for øyeblikket
                      </p>
                    </TabsContent>
                    <TabsContent value="oversikt">
                      <p className="text-sm text-muted-foreground">
                        Ingen markedsoversikt tilgjengelig
                      </p>
                    </TabsContent>
                  </Tabs>
                  <div className="flex justify-end mt-4">
                    <Button>Vis alle</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Dashboard;
