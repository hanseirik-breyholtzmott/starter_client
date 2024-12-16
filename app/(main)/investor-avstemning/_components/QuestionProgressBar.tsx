"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  return <Progress value={value} className="h-2 w-full bg-white/20" />;
}
