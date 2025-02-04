"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RewardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  reward: string;
  progress?: string;
  className?: string;
}

export function RewardCard({
  icon,
  title,
  description,
  reward,
  progress,
  className,
}: RewardCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <Button
        variant="ghost"
        className="w-full h-auto p-6 flex items-start justify-between hover:bg-gray-50"
      >
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">
            {icon}
          </div>
          <div className="text-left space-y-2">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-sm text-blue-600">{reward}</p>
            {progress && (
              <p className="text-sm text-muted-foreground">{progress}</p>
            )}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
      </Button>
    </Card>
  );
}
