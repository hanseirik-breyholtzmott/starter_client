import React from "react";

//Components
import InvestmentLayout from "./_components/investmentLayout";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

const getInvestmentData = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/campaign/1/investment-details"
    );

    if (response.status != 200) {
      console.log("Failed to fetch data");
      throw new Error("Failed to fetch data");
    } else {
      console.log("Data fetched successfully");
    }

    const data = response.data;

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function InvestPage() {
  const investmentData = await getInvestmentData();

  return <InvestmentLayout investmentData={investmentData} />;
}
