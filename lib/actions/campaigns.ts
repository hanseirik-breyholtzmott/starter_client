import axiosInstance from "@/lib/axiosInstance";
import { type InvestmentOpportunity } from "@/types/campaign";

export async function getCampaigns(): Promise<InvestmentOpportunity[]> {
  try {
    const response = await axiosInstance.get(`/api/campaign/all`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    return [];
  }
}
