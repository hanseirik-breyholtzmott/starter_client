"use client";

import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

export function MoreRewardsCard() {
  return (
    <Card className="bg-gray-50 border-dashed">
      <div className="p-6 flex items-center space-x-4">
        <div className="p-2 bg-gray-200 rounded-full">
          <Search className="h-5 w-5 text-gray-600" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Flere fordeler</h3>
          <p className="text-sm text-muted-foreground">
            Det åpnes flere belønninger etter hvert
          </p>
        </div>
      </div>
    </Card>
  );
}
