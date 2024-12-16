"use client";

import { motion } from "framer-motion";

interface QuestionHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  question: string;
}

export function QuestionHeader({
  currentQuestion,
  totalQuestions,
  question,
}: QuestionHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-white/80 font-medium bg-white/10 px-4 py-2 rounded-full">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
      </div>

      <motion.h2
        className="text-2xl font-bold text-white text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {question}
      </motion.h2>
    </>
  );
}
