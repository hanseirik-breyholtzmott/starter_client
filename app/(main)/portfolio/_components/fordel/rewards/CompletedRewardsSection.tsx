"use client";

import { Bitcoin, Coins } from "lucide-react";
import { CompletedRewardCard } from "./CompletedRewardsCard";
import { AnimatedSection } from "../../dashboard/AnimatedSection";

export function CompletedRewardsSection() {
  return (
    <AnimatedSection>
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Opptjente belønninger</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <CompletedRewardCard
            icon={<Bitcoin className="h-5 w-5 text-green-600" />}
            title="Første innskudd"
            description="Sett inn over 250 NOK på din Firi konto"
            reward="Belønning: ETH for 25 kroner"
          />
          <CompletedRewardCard
            icon={<Coins className="h-5 w-5 text-green-600" />}
            title="Første handel"
            description="Handle for mer enn 1 NOK"
            reward="Belønning: ADA for 25 kroner"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}
