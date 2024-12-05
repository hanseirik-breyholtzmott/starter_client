import React from "react";

//Next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Auth
import { useAuth } from "@clerk/nextjs";

//Components
import InvestmentLayout from "./_components/page/InvestPageLayout";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

const getInvestmentData = async (retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axiosInstance.get(
        `/api/campaign/670edfb1a444b509203c7cd7/investment-details`
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      return response.data;
    } catch (error) {
      console.log(
        `Error fetching investment data (attempt ${attempt}/${retries}):`
      );

      if (attempt === retries) {
        return null;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return null;
};

export default async function InvestPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    const currentPath = "/folkekraft/invest";
    redirect(`/sign-in?redirectUrl=${encodeURIComponent(currentPath)}`);
  }

  const investmentData = await getInvestmentData();

  if (!investmentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg mb-4">Failed to load investment data.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return <InvestmentLayout investmentData={investmentData} />;
}
