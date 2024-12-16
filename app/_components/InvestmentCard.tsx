"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type InvestmentOpportunity } from "@/types/campaign";
import { formatCurrency, covertToPercentage } from "@/lib/helperFunctions";

export default function InvestmentCard({
  opportunity,
}: {
  opportunity: InvestmentOpportunity;
}) {
  return (
    /*<Link
      href={`/campaigns/${opportunity.id}`}
      className=""
      aria-label={`View ${opportunity.companyName} fundraising details`}
    >*/
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="max-w-md overflow-hidden block transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl">
        <div className="relative h-64">
          <Image
            src={opportunity.images.campaign}
            alt={opportunity.title}
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-4 left-4 right-4 p-4 bg-white rounded-t-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-white rounded-xl overflow-hidden">
                <Image
                  src={opportunity.images.icon}
                  alt={`${opportunity.companyName} logo`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                {opportunity.status === "active" ? (
                  <>
                    <div className="text-lg font-semibold">
                      {formatCurrency(opportunity.totalInvested || 0, 0, false)}
                    </div>
                    <Progress
                      value={(opportunity.percentageInvested ?? 0) * 100}
                      className="h-2 mt-2 bg-slate-400/20"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{opportunity.totalInvestments} tegninger</span>
                      <span>
                        {covertToPercentage(
                          opportunity.percentageInvested || 0
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-lg font-semibold">Coming Soon</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="py-4">
            <h2 className="text-xl font-bold border-b-2 border-[#57C7B7] inline-block pb-1">
              {opportunity.companyName}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {opportunity.description}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col items-start gap-3">
          <div className="text-sm font-medium text-muted-foreground">
            {opportunity.daysRemaining} dager igjen
          </div>
          <div className="flex flex-wrap gap-2">
            {opportunity.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full uppercase"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
    /*</Link>*/
  );
}
