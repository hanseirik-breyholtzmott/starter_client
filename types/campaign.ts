export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  companyName: string;
  tags: string[];
  displayImage: string;
  iconImage: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  followers: number;
  status: "Fulgt" | "Følg emisjon";
  raisedAmount?: number;
  targetAmount?: number;
  investorCount?: number;
  progressPercentage?: number;
}
