"use client";

import { useState } from "react";
import { Question } from "@/app/(main)/investor-avstemning/_components/data/questions";

export function useVoting(questions: Question[]) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (questionId: number, optionId: number) => {
    if (!hasVoted) {
      setHasVoted(true);
      questions[currentQuestion].options = questions[
        currentQuestion
      ].options.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHasVoted(false);
    }
  };

  return {
    currentQuestion,
    hasVoted,
    handleVote,
    handleNextQuestion,
    isLastQuestion: currentQuestion === questions.length - 1,
  };
}
