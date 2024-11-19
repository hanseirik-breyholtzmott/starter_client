import React from "react";

//Next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Auth
import { useAuth } from "@clerk/nextjs";
//Components
import InvestmentLayout from "./_components/investmentLayout";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

const getInvestmentData = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/campaign/${process.env.NEXT_PUBLIC_CAMPAIGN_ID}/investment-details`
    );

    if (response.status !== 200) {
      console.log("Failed to fetch data");
      throw new Error("Failed to fetch data");
    }

    const data = response.data;

    return data;
  } catch (error) {
    console.error("Error fetching investment data:", error);
    return null;
  }
};

export default async function InvestPage() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/sign-in");
  }
  const investmentData = await getInvestmentData();

  if (!investmentData) {
    return <div>Failed to load investment data. Please try again later.</div>;
  }

  return <InvestmentLayout investmentData={investmentData} />;
}
