"use client";

interface VotingStatsProps {
  totalVotes: number;
}

export function VotingStats({ totalVotes }: VotingStatsProps) {
  return <div className="text-white/80 font-medium">{totalVotes} votes</div>;
}
