"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

//Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//Components
import { columns, Transaction } from "./_components/columns";
import { DataTable } from "./_components/data-table";

//Hooks
import { useAuthContext } from "@/app/hooks/AuthContext";

type Props = {};

const transactions = [
  {
    id: 1,
    date: "2024-08-29",
    amount: "$100.00",
    invoice: "INV-001",
    status: "Paid",
  },
  {
    id: 2,
    date: "2024-08-28",
    amount: "$250.00",
    invoice: "INV-002",
    status: "Pending",
  },
  {
    id: 3,
    date: "2024-08-27",
    amount: "$150.00",
    invoice: "INV-003",
    status: "Paid",
  },
];

const TransactionsDashboard = (props: Props) => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const response = await axiosInstance.get(
            `/api/transactions/${user.id}`
          );
          console.log("transactions:", response.data);
          setTransactions(response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>All recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
    </Card>
  );
};

export default TransactionsDashboard;
