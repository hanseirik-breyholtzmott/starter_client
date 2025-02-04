import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import React from "react";
import { AnimatedSection } from "../_components/dashboard/AnimatedSection";
import { ReferralBanner } from "../_components/fordel/ReferralBanner";
import { ReferralStats } from "../_components/fordel/ReferralStats";
import { PayoutsList } from "../_components/fordel/PayoutsList";
import { RewardsList } from "../_components/fordel/RewardsList";
import { ReferralList } from "../_components/fordel/referrals/ReferralList";
import { RewardSection } from "../_components/fordel/rewards/RewardSection";
import { CompletedRewardsSection } from "../_components/fordel/rewards/CompletedRewardsSection";
import { Sparkles } from "lucide-react";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <AnimatedSection>
        <h1 className="text-3xl font-bold mb-4 flex items-center space-x-3">
          <Sparkles className="w-8 h-8 text-[#59C9B9]" />
          <span className="">Folkekraft Fordel</span>
        </h1>
        <Tabs defaultValue="oversikt" className="w-full">
          <TabsList>
            <TabsTrigger value="oversikt">Oversikt</TabsTrigger>
            <TabsTrigger value="vervinger">Vervinger</TabsTrigger>
            <TabsTrigger value="belonninger">Belønninger</TabsTrigger>
            <TabsTrigger value="utbetalinger">Utbetalinger</TabsTrigger>
          </TabsList>

          <TabsContent value="oversikt">
            <AnimatedSection delay={0.1}>
              <ReferralBanner />
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <ReferralStats />
                <PayoutsList />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <RewardsList />
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="vervinger">
            <AnimatedSection delay={0.1}>
              <ReferralBanner />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="mt-6">
                <ReferralList />
              </div>
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="belonninger">
            <AnimatedSection delay={0.1}>
              <RewardSection />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <CompletedRewardsSection />
            </AnimatedSection>
          </TabsContent>

          <TabsContent value="utbetalinger">
            <AnimatedSection delay={0.1}>
              <PayoutsList />
            </AnimatedSection>
          </TabsContent>
        </Tabs>
      </AnimatedSection>
    </>
  );
}
