"use client";

import { LatestNews } from "./LatestNews";
import { QuickActions } from "./QucikActions";

export function NewsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 mt-6">
      <LatestNews />
      <QuickActions />
    </div>
  );
}
