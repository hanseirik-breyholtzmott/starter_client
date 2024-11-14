"use client";

import React, { useState, useEffect, useRef } from "react";

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

export default function Component() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  //Data
  const cardData = [
    {
      title: "Total aksjer",
      value: "2 753 246",
      change: "+25.2%",
      previousValue: "2 500 000",
    },
    {
      title: "Total aksjonærer",
      value: "1 234",
      change: "+3.2%",
      previousValue: "1 073",
    },
    {
      title: "Total aksjeklasser",
      value: "3",
      change: "+0.5%",
      previousValue: "9,950,000",
    },
    {
      title: "Snitt aksjekurs",
      value: "8kr",
      change: "-1.3%",
      previousValue: "12kr",
    },
  ];

  const overviewData = {
    avgYearlyProfit: 212142.12,
    avgYearlyProfitChange: 23.2,
    avgYearlyExpense: 30321.23,
    avgYearlyExpenseChange: -12.3,
  };

  const transactionData = [
    { month: "JAN", profit: 120000, expense: 20000 },
    { month: "FEB", profit: 100000, expense: 22000 },
    { month: "MAR", profit: 144000, expense: 24000 },
    { month: "APR", profit: 123000, expense: 28000 },
    { month: "MAY", profit: 98000, expense: 21000 },
    { month: "JUN", profit: 79000, expense: 23000 },
    { month: "JUL", profit: 130000, expense: 31000 },
    { month: "AUG", profit: 98000, expense: 18000 },
    { month: "SEP", profit: 64000, expense: 28000 },
    { month: "OCT", profit: 90000, expense: 26000 },
    { month: "NOV", profit: 110000, expense: 29000 },
    { month: "DEC", profit: 154000, expense: 32000 },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "Mon, 24 Apr",
      time: "09:00 AM",
      shareholder: "John Doe",
      type: "Buy",
      shares: 100,
      value: "$4,567",
    },
    {
      id: 2,
      date: "Mon, 24 Apr",
      time: "11:30 AM",
      shareholder: "Jane Smith",
      type: "Sell",
      shares: 50,
      value: "$2,283.50",
    },
    {
      id: 3,
      date: "Tue, 25 Apr",
      time: "10:15 AM",
      shareholder: "Bob Johnson",
      type: "Buy",
      shares: 200,
      value: "$9,134",
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

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`font-medium ${
                    parseFloat(card.change) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {card.change}
                </span>{" "}
                vs last month: {card.previousValue}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap lg:flex-nowrap mt-4 mb-4 gap-x-4">
        <div className="w-full xl:w-2/3 h-full ">
          {/* Overview Section */}
          <Card className="w-full xl:min-h-[550px]">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold">
                  Overview
                </CardTitle>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-background border rounded-md px-2 py-1 text-sm"
                >
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold">
                    $
                    {overviewData.avgYearlyProfit.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Avg. Yearly Profit
                  </p>
                  <p
                    className={`text-sm ${
                      overviewData.avgYearlyProfitChange >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {overviewData.avgYearlyProfitChange >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(overviewData.avgYearlyProfitChange)}%
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    $
                    {overviewData.avgYearlyExpense.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Avg. Yearly Expense
                  </p>
                  <p
                    className={`text-sm ${
                      overviewData.avgYearlyExpenseChange >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {overviewData.avgYearlyExpenseChange >= 0 ? "↑" : "↓"}{" "}
                    {Math.abs(overviewData.avgYearlyExpenseChange)}%
                  </p>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={transactionData}>
                    <XAxis
                      dataKey="month"
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
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#333",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      labelStyle={{ color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                      formatter={(value) => [
                        `$${value.toLocaleString()}`,
                        value === transactionData[0].profit
                          ? "Profit"
                          : "Expense",
                      ]}
                    />
                    <Bar
                      dataKey="expense"
                      fill="#fdba74"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="profit"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full xl:w-1/3 h-full ">
          {/* Recent Transactions */}
          <Card className="xl:min-h-[550px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View all</DropdownMenuItem>
                  <DropdownMenuItem>Export to CSV</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                      index % 2 === 0 ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                          {transaction.date}
                        </span>
                        <span className="text-2xl font-bold">
                          {transaction.time}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {transaction.type} Transaction
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {transaction.shareholder} - {transaction.shares}{" "}
                          shares, {transaction.value}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
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
                                Detailed information about {shareholder.name}
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4">
                              <h3 className="font-medium">
                                Name: {shareholder.name}
                              </h3>
                              <p>Share Class: {shareholder.shareClass}</p>
                              <p>
                                Shares: {shareholder.shares.toLocaleString()}
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
    </>
  );
}
