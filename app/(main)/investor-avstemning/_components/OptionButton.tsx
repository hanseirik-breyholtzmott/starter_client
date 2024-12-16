"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Option } from "@/app/(main)/investor-avstemning/_components/data/questions";
import { motion } from "framer-motion";

interface OptionButtonProps {
  option: Option;
  isSelected: boolean;
  hasVoted: boolean;
  totalVotes: number;
  disabled: boolean;
  onClick: () => void;
}

export function OptionButton({
  option,
  isSelected,
  hasVoted,
  totalVotes,
  disabled,
  onClick,
}: OptionButtonProps) {
  const percentage = (option.votes / (totalVotes || 1)) * 100;

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Button
        onClick={onClick}
        className={cn(
          "w-full h-28 text-lg relative overflow-hidden transition-all duration-300",
          isSelected
            ? "bg-white text-purple-900 hover:bg-white/90"
            : "bg-white/10 text-white hover:bg-white/20",
          hasVoted ? "cursor-default" : "cursor-pointer",
          "border-2",
          isSelected ? "border-white" : "border-transparent",
          "group"
        )}
        variant="ghost"
        disabled={disabled}
      >
        <div className="relative z-10">
          <span className="block font-semibold">{option.text}</span>
          {hasVoted && (
            <motion.span
              className="text-sm mt-2 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {percentage.toFixed(1)}% ({option.votes} votes)
            </motion.span>
          )}
        </div>
        {hasVoted && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
          >
            <motion.div
              className="absolute inset-y-0 bg-white/10"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/5 to-transparent transition-opacity duration-300" />
      </Button>
    </motion.div>
  );
}
