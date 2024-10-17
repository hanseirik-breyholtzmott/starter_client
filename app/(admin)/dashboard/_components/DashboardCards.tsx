import React from "react";

//Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardData {
  title: string;
  value: string | number;
}

type Props = {
  cardData: CardData[];
};

export default function DashboardCards({ cardData }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <svg className="h-4 w-4 text-muted-foreground"> {/* Icon */} </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
