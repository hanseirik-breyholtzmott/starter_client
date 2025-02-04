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
import { AnimatedSection } from "./_components/dashboard/AnimatedSection";
import { OverviewCards } from "./_components/dashboard/OverviewCards";
import { PositionsTable } from "./_components/dashboard/PositionsTable";
import { NewsSection } from "./_components/dashboard/NewsSection";
import { EducationSection } from "./_components/dashboard/EducationSection";

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
      <AnimatedSection delay={0.1}>
        <OverviewCards />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="mt-6">
          <PositionsTable />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <NewsSection />
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <EducationSection />
      </AnimatedSection>
    </>
  );
}
