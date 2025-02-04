"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CompletedRewardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  reward: string;
}

export function CompletedRewardCard({
  icon,
  title,
  description,
  reward,
}: CompletedRewardCardProps) {
  return (
    <Card className="bg-gray-50">
      <div className="p-6 flex items-start space-x-4">
        <div className="p-2 bg-green-100 rounded-full">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-sm text-green-600">{reward}</p>
        </div>
      </div>
    </Card>
  );
}
