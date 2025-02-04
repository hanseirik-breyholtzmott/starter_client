"use client";

import { Bitcoin, Landmark, Coins } from "lucide-react";
import { RewardCard } from "./RewardCard";
import { MoreRewardsCard } from "./MoreRewardsCard";
import { AnimatedSection } from "../../dashboard/AnimatedSection";

export function RewardSection() {
  return (
    <AnimatedSection>
      <div className="grid gap-6 md:grid-cols-2">
        <RewardCard
          icon={<Bitcoin className="h-5 w-5 text-primary" />}
          title="Ellevill kryptoinvestor"
          description="Handle for mer enn 15 000 NOK"
          reward="Belønning: BTC for 45 kroner"
          progress="13 302 NOK gjenstår"
        />
        <RewardCard
          icon={<Landmark className="h-5 w-5 text-primary" />}
          title="Første sparing"
          description="Gjør et innskudd til din sparekonto, minimum 100 NOK"
          reward="Belønning: LTC for 25 kroner"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <RewardCard
          icon={<Coins className="h-5 w-5 text-primary" />}
          title="KryptoInvestor"
          description="Handle for mer enn 2 500 NOK i tre markeder"
          reward="Belønning: ADA for 45 kroner"
          progress="Kjøpt 0/3 kryptovalutaer for 2500 NOK"
        />
        <MoreRewardsCard />
      </div>
    </AnimatedSection>
  );
}
