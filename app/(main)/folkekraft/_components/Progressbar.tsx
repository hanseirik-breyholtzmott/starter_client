"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface SmoothProgressProps {
  current: number;
  target: number;
}

// Utility function to generate milestones with progressive difficulty
function generatePercentageMilestones(
  target: number,
  count: number = 5
): number[] {
  const percentages = [10, 25, 50, 75, 100];
  return percentages.map((percentage) =>
    Math.round((percentage / 100) * target)
  );
}

export default function SmoothProgress({
  current,
  target,
}: SmoothProgressProps) {
  const [progress, setProgress] = useState(0);

  // Generate dynamic milestones based on target
  const milestones = useMemo(
    () => generatePercentageMilestones(target),
    [target]
  );

  // Memoized calculations
  const progressPercentage = useMemo(() => {
    const percentage = Math.min((current / target) * 100, 100);
    return Math.max(percentage, 0);
  }, [current, target]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(progressPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="relative">
        <Progress value={progress} className="h-4" />

        {/* Dynamic Milestone Markers */}
        {milestones.map((milestone, index) => {
          const milestonePosition = Math.min((milestone / target) * 100, 100);
          return (
            <motion.div
              key={milestone}
              className="absolute top-0 -mt-1"
              style={{ left: `${milestonePosition}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="relative">
                <div
                  className={`h-6 w-0.5 ${
                    milestone <= current ? "bg-primary" : "bg-primary/50"
                  }`}
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-6 text-xs text-muted-foreground">
                  {`${(milestone / 1000000).toFixed(1)}M`}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Decorative Spirals */}
        {milestones.map((_, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: `${((index + 1) / (milestones.length + 1)) * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
          ></motion.div>
        ))}
      </div>
    </motion.div>
  );
}
