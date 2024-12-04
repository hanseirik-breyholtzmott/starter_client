import Image from "next/image";
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

export default function InvestmentCard({
  opportunity,
}: {
  opportunity: InvestmentOpportunity;
}) {
  return (
    <Link
      href={`/campaigns/${opportunity.id}`}
      className=""
      aria-label={`View ${opportunity.companyName} fundraising details`}
    >
      <Card className="max-w-md overflow-hidden block transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-64">
          <Image
            src={opportunity.images.campaign}
            alt={opportunity.title}
            fill
            className="object-cover"
          />
          <div className="absolute -bottom-4 left-4 right-4 p-4 bg-white rounded-t-lg shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-white rounded-lg overflow-hidden">
                <Image
                  src={opportunity.images.icon}
                  alt={`${opportunity.companyName} logo`}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold">£2,141,789 Raised</div>
                <Progress value={65} className="h-2 mt-2 bg-slate-400/20" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>1,042 Investors</span>
                  <span>142% of target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="py-4">
            <h2 className="text-xl font-bold border-b-2 border-orange-500 inline-block pb-1">
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
    </Link>
  );
}
