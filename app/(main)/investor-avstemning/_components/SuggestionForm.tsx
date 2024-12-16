"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { motion } from "framer-motion";
import { ChartBarIcon, SendIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SuggestionFormProps {
  onViewResults: () => void;
  onSkip: () => void;
}

export function SuggestionForm({ onViewResults, onSkip }: SuggestionFormProps) {
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestion.trim()) {
      toast({
        title: "Thank you for your feedback!",
        description: "Your suggestion has been submitted successfully.",
      });
      setSuggestion("");
      onViewResults();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Thank You for Voting!
        </h2>
        <p className="text-white/80 mb-6">
          Would you like to suggest any other areas we should focus on?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Share your thoughts and suggestions..."
          className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            size="lg"
            className="flex-1 bg-white text-purple-900 hover:bg-white/90"
          >
            <SendIcon className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onSkip}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <ChartBarIcon className="w-4 h-4 mr-2" />
            View Results
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
