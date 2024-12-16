"use client";

import { VotingQuestion } from "@/app/(main)/investor-avstemning/_components/VotingQuestion";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/app/(main)/investor-avstemning/_components/QuestionProgressBar";
import { useState } from "react";
import { questions } from "@/app/(main)/investor-avstemning/_components/data/questions";
import { SuggestionForm } from "@/app/(main)/investor-avstemning/_components/SuggestionForm";
import { VotingResults } from "@/app/(main)/investor-avstemning/_components/VotingResults";

export default function QAPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleVote = (questionId: number, optionId: number) => {
    if (!hasVoted) {
      setHasVoted(true);
      const updatedQuestions = questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : q
      );
      questions.splice(0, questions.length, ...updatedQuestions);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setHasVoted(false);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Monthly Focus Voting
            </h1>
            <p className="text-white/80 mb-6">
              Help us decide our priorities for the upcoming month
            </p>
            {!isComplete && <ProgressBar value={progress} />}
          </div>

          {!isComplete ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-white/80 font-medium bg-white/10 px-4 py-2 rounded-full">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <VotingQuestion
                question={questions[currentQuestion]}
                onVote={handleVote}
                hasVoted={hasVoted}
                onNext={handleNextQuestion}
                isLastQuestion={currentQuestion === questions.length - 1}
              />
            </>
          ) : showResults ? (
            <VotingResults questions={questions} />
          ) : (
            <SuggestionForm
              onViewResults={() => setShowResults(true)}
              onSkip={() => setShowResults(true)}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
