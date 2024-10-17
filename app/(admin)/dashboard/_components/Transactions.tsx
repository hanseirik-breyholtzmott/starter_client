import React from "react";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  transactionData: any[]; // Replace 'any' with the correct type
  recentTransactions: any[]; // Replace 'any' with the correct type
};

export default function Transactions({
  transactionData,
  recentTransactions,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Bar dataKey="buys" fill="#82ca9d" />
              <Bar dataKey="sells" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div>
                <p>{transaction.shareholder}</p>
                <p>
                  {transaction.type} {transaction.shares} shares
                </p>
              </div>
              <div className="ml-auto">{transaction.value}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
