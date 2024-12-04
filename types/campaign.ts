export interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  companyName: string;
  tags: string[];
  images: {
    icon: string;
    logo: string;
    campaign: string;
  };
  startDate: string;
  endDate: string;
  daysRemaining: number;
}
