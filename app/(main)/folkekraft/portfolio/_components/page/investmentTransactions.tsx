import React from "react";

//Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Data table
import { DataTable } from "../data-table";
import { Transactions, columns } from "../columns";

type Props = {
  transactions: any[];
};

export default function InvestmentTransactions({ transactions }: Props) {
  //TODO: Format the transactions SERVER SIDE
  const formattedTransactions: Transactions[] = transactions.map(
    (transaction) => ({
      id: transaction._id,
      paymentId: transaction.stripePaymentId,
      date: transaction.createdAt,
      amount: transaction.amount,
      status: transaction.status,
    })
  );

  return (
    <div className="container mx-auto p-4 my-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-700">
            Transaksjoner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={formattedTransactions} />
        </CardContent>
      </Card>
    </div>
  );
}
