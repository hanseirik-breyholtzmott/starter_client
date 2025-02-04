"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Newspaper, Wallet } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  timestamp: string;
  category: string;
  content: string;
};

type MarketUpdate = {
  id: string;
  title: string;
  change: number;
  timestamp: string;
};

export function LatestNews() {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "KOMMENTAR: BRED NEDGANG OSLO BØRS MANDAG",
      timestamp: "I går kl. 13:44",
      category: "Selskapshendelser",
      content:
        "Bred nedgang observert på Oslo Børs i dag med flere sektorer påvirket.",
    },
    {
      id: "2",
      title: "DNB senker riktikursen for Sparebanken Vest",
      timestamp: "13 des. 10:15",
      category: "Flash",
      content:
        "DNB senker riktikursen for Sparebanken Vest till 156 norska kronor (158), upprepar køp - BN",
    },
  ];

  const marketUpdates: MarketUpdate[] = [
    {
      id: "1",
      title: "BULK: BALTIC DRY-INDEKSEN",
      change: -1.68,
      timestamp: "I dag kl. 14:06",
    },
    {
      id: "2",
      title: "BULK: BALTIC DRY-INDEKSEN",
      change: 1.9,
      timestamp: "I går kl. 14:02",
    },
    {
      id: "3",
      title: "BULK: BALTIC DRY-INDEKSEN",
      change: -0.38,
      timestamp: "13 des. 14:02",
    },
  ];
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className=" flex items-center space-x-3">
          <div className="rounded-full h-8 w-8 bg-emerald-100 p-2 relative flex items-right justify-end">
            <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-emerald-100" />
            <Newspaper className="pl-2 h-8 w-8 text-[#57C7B7] absolute -bottom-1 right-0" />
          </div>
          <div className="text-base font-medium">Siste nytt</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {newsItems.map((news) => (
            <div key={news.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{news.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {news.timestamp}
                </span>
              </div>
              <h3 className="font-medium leading-snug">{news.title}</h3>
              <p className="text-sm text-muted-foreground">{news.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
