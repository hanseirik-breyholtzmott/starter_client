"use client";
import React from "react";

import Test from "@/components/test";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardFooter from "./_components/dashboard_footer";
import OnboardingMultistep from "@/components/forms/onboarding-multistep";
import { Search, Users, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Sector,
} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

type Props = {};

const Dashboard = (props: Props) => {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);
  return (
    <>
      <div className="flex flex-row w-full justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div>
          <CalendarDateRangePicker />
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col">
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Actual</TabsTrigger>
            <TabsTrigger value="password">Fully diluted</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="w-full">
            <div className="flex flex-col gap-4">
              {/** Key Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
                <Card className="flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Top 10 shareholders</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartData}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalVisitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Visitors
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Share classes</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={chartData}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
                          activeIndex={0}
                          activeShape={({
                            outerRadius = 0,
                            ...props
                          }: PieSectorDataItem) => (
                            <Sector {...props} outerRadius={outerRadius + 10} />
                          )}
                        />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Investor types</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig}>
                      <BarChart
                        accessibilityLayer
                        data={chartData}
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
                            chartConfig[value as keyof typeof chartConfig]
                              ?.label
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
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
              </div>
              <div className="w-full">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="text-gray-400" />
                        <span className="font-semibold">15/20</span>
                        <span className="text-gray-500">
                          stakeholders have access
                        </span>
                      </div>
                      <Button>Invite more...</Button>
                    </div>
                    <Progress value={75} className="h-2" />
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-6">
                <div className="col-span-4 h-[400px] relative"></div>

                <div className="col-span-2"></div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <OnboardingMultistep></OnboardingMultistep>
          </TabsContent>
        </Tabs>
        <DashboardFooter />
      </div>
    </>
  );
};

export default Dashboard;
