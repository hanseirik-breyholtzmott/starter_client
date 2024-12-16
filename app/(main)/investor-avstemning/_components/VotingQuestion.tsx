"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Question } from "@/app/(main)/investor-avstemning/_components/data/questions";
import { OptionButton } from "@/app/(main)/investor-avstemning/_components/OptionButton";
import { motion, AnimatePresence } from "framer-motion";

interface VotingQuestionProps {
  question: Question;
  onVote: (questionId: number, optionId: number) => void;
  hasVoted: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
}

export function VotingQuestion({
  question,
  onVote,
  hasVoted,
  onNext,
  isLastQuestion,
}: VotingQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const totalVotes = question.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleOptionClick = (optionId: number) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      onVote(question.id, optionId);
    }
  };

  return (
    <div className="space-y-8">
      <motion.h2
        className="text-2xl font-bold text-white text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {question.question}
      </motion.h2>

      <div className="grid grid-cols-2 gap-6">
        <AnimatePresence>
          {question.options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OptionButton
                option={option}
                isSelected={selectedOption === option.id}
                hasVoted={hasVoted}
                totalVotes={totalVotes}
                disabled={hasVoted}
                onClick={() => handleOptionClick(option.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {hasVoted && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-white text-purple-900 hover:bg-white/90"
          >
            {isLastQuestion ? "Submit Feedback" : "Next Question"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
