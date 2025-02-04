"use client";

type Transaction = {
  id: string;
  type: "buy" | "sell";
  asset: string;
  symbol: string;
  amount: string;
  fee: string;
  timestamp: string;
};

interface RecentTransactionProps {
  transaction: Transaction;
}

export function RecentTransaction({ transaction }: RecentTransactionProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium">{transaction.symbol}</span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">Kjøpt {transaction.amount}</span>
            <span className="text-sm text-muted-foreground">
              {transaction.symbol}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {transaction.timestamp}
          </p>
        </div>
      </div>
      <div className="text-sm text-right">
        <p>- {transaction.amount} kr</p>
        <p className="text-muted-foreground">Gebyr: {transaction.fee} kr</p>
      </div>
    </div>
  );
}
