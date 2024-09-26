import React from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//Charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

//Helpers
import { formatCurrency, formatValue } from "@/lib/helperFunctions";

//Icons
import { Info, ChevronDown } from "lucide-react";

//Data
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
    color: "rgb(59 130 246)",
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow">
        <p className="text-sm font-semibold">{`${label}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

interface PortfolioSummary {
  investorSharesValue: number; // Total value of investor-acquired shares
  customerSharesValue: number; // Total value of customer-owned shares
  referralSharesValue: number; // Total value of shares acquired from referrals
  accountDetails: any[]; // Array of account data for further details
}

type Props = {
  portfolioSummary: PortfolioSummary;
  currentValue: number;
  percentageChange: number;
};

export default function InvestmentSummary({
  portfolioSummary,
  currentValue,
  percentageChange,
}: Props) {
  if (!portfolioSummary) {
    return <div>No portfolio summary available</div>;
  }
  //Constants
  const { investorSharesValue, customerSharesValue, referralSharesValue } =
    portfolioSummary;

  if (!chartData || chartData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto p-4 my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-700">
              Investeringssum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#00263D] text-[#59C9B9] flex items-center justify-center mr-2">
                  IN
                </div>
                <div>
                  <div className="font-semibold">Investor aksjer</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(investorSharesValue, 0, false)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#00263D] text-[#59C9B9] flex items-center justify-center mr-2">
                  K
                </div>
                <div>
                  <div className="font-semibold">Kunde aksjer</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(customerSharesValue, 0, false)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-[#00263D] text-[#59C9B9] flex items-center justify-center mr-2">
                  V
                </div>
                <div>
                  <div className="font-semibold">Verve aksjer</div>
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(referralSharesValue, 0, false)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Link href="/bestill" className="w-full">
                <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-white text-lg h-12">
                  Bli kunde
                </Button>
              </Link>
              <Link href="/folkekraft/invest" className="w-full">
                <Button className="w-full bg-slate-100  border-[#00263D]  text-[#00263D] hover:bg-slate-200 border-2  text-lg h-12">
                  Invester
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex flex-row justify-between items-center ">
              <p className="text-2xl font-semibold text-gray-700">Kontoverdi</p>
              <Button variant="outline">
                Maks <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </CardTitle>
            <div className="flex justify-between items-center py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  Total verdi <Info className="w-4 h-4 ml-1 text-gray-400" />
                </h3>
                <p className="text-4xl font-bold">
                  {formatCurrency(currentValue, 0, false)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
              <Button
                variant="outline"
                className="text-xl font-semibold py-8 px-4"
              >
                Kommer snart
              </Button>
            </div>
            <div className="bg-slate-300/35 absolute top-0 left-0 w-full h-full z-10"></div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Utvikling (NOK)</div>
                  <div className="text-2xl font-bold">
                    {formatValue(percentageChange, 2, true, "%")} (demo data)
                  </div>
                </div>
                <div className="hidden">
                  <div className="text-sm font-medium">Markedsverdi (NOK)</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
              </div>

              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 12,
                      left: 12,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e0e0e0"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={true}
                      tickMargin={8}
                      tickFormatter={(value) =>
                        value && typeof value === "string"
                          ? value.slice(0, 3)
                          : ""
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={true}
                      tickFormatter={(value) => `${value}`}
                      stroke="#e0e0e0"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="desktop"
                      stroke="rgb(59 130 246)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

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
  );
}
