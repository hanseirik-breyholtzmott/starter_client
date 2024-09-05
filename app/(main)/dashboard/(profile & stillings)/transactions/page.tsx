import React from "react";

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
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

type Props = {};

interface Transaction {
  id: number;
  date: string;
  amount: string;
  invoice: string;
  status: string;
}

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
