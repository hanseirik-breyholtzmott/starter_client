import React, { useEffect, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";

type Props = {};
// Fetch the API data in getServerSideProps
const getCampaignData = async () => {
  // Replace with your actual API endpoint
  const response = await axiosInstance.get("/api/campaign/folkekraft");

  if (response.status != 200) {
    // Handle error, e.g., throw an error or return notFound
    throw new Error("Failed to fetch data");
  }

  const data = await response.data;
  console.log(data);

  return data;
};

export default async function CampaignPage() {
  const apiDate = await getCampaignData();

  return (
    <main className="h-screen">
      <p>Here is the name: {apiDate.campaign.companyInfo.name}</p>
    </main>
  );
}
