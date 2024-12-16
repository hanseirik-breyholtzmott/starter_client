"use client";

import { Question } from "@/app/(main)/investor-avstemning/_components/data/questions";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface VotingResultsProps {
  questions: Question[];
}

export function VotingResults({ questions }: VotingResultsProps) {
  const prepareChartData = (question: Question) => {
    if (!question || !question.options) {
      console.error("Invalid question data:", question);
      return [];
    }

    const data = question.options.map((option) => ({
      name:
        option.text.length > 15
          ? option.text.slice(0, 15) + "..."
          : option.text,
      fullName: option.text,
      votes: Number(option.votes) || 0,
    }));

    console.log("Prepared data for chart:", {
      questionId: question.id,
      questionText: question.question,
      chartData: data,
    });

    return data;
  };

  // Remove test data and restore header
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Voting Results</h2>
        <p className="text-white/80">Here's how everyone voted</p>
      </div>

      {questions?.map((question) => (
        <Card key={question.id} className="bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">{question.question}</CardTitle>
            <CardDescription className="text-white/60">
              Total votes:{" "}
              {question.options.reduce(
                (sum, opt) => sum + (Number(opt.votes) || 0),
                0
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border border-red-500"
              style={{ minHeight: "300px" }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={prepareChartData(question)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "white", fontSize: 12 }}
                    textAnchor="middle"
                    height={60}
                    interval={0}
                    tickMargin={5}
                  />
                  <YAxis tick={{ fill: "white" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                    formatter={(value: any, name: any, props: any) => {
                      return [value, props.payload.fullName];
                    }}
                  />
                  <Bar dataKey="votes" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
