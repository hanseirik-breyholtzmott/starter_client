import { Suspense } from "react";

// Next
import { notFound } from "next/navigation";

//Axios
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

// Types
interface CampaignData {
  id: string;
  title: string;
  description: string;
  // Add other campaign fields
}

interface RelatedData {
  id: string;
  name: string;
  // Add other related data fields
}

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { keyword: string };
}) {
  return {
    title: `Campaign - ${params.keyword}`,
    description: `Campaign details for ${params.keyword}`,
    openGraph: {
      title: `Campaign - ${params.keyword}`,
      description: `Campaign details for ${params.keyword}`,
    },
  };
}

// Enable dynamic rendering
export const dynamic = "force-dynamic";

// Data fetching functions
async function getCampaignData(keyword: string): Promise<CampaignData> {
  if (!keyword) {
    throw new Error("Keyword is required");
  }

  const encodedKeyword = encodeURIComponent(keyword.trim());

  try {
    const response = await axiosInstance.get(
      `/api/campaigns/${encodedKeyword}`
    );

    // Type guard to ensure all required fields are present
    const validateCampaignData = (data: any): data is CampaignData => {
      return (
        typeof data.id === "string" &&
        typeof data.title === "string" &&
        typeof data.description === "string" &&
        (data.status === "active" || data.status === "inactive") &&
        typeof data.startDate === "string" &&
        typeof data.endDate === "string" &&
        typeof data.budget === "number" &&
        typeof data.metrics === "object" &&
        typeof data.metrics.impressions === "number" &&
        typeof data.metrics.clicks === "number" &&
        typeof data.metrics.conversions === "number"
      );
    };

    if (!validateCampaignData(response.data)) {
      throw new Error("Invalid campaign data structure");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        notFound();
      }
      if (error.response?.status === 401) {
        throw new Error("Unauthorized access");
      }
      if (error.response?.status === 403) {
        throw new Error("Forbidden access");
      }
      throw new Error(
        `Failed to fetch campaign: ${
          error.response?.data?.message || error.message
        }`
      );
    }

    // Handle non-Axios errors
    throw new Error("Failed to fetch campaign data");
  }
}

async function getRelatedData(keyword: string): Promise<RelatedData[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/related/${keyword}`, {
      next: {
        revalidate: 3600,
      },
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch related data");
    return res.json();
  } catch (error) {
    console.error("Error fetching related data:", error);
    throw error;
  }
}

// Main page component
export default async function CampaignPage({
  params,
}: {
  params: { keyword: string };
}) {
  // Fetch data in parallel
  const [campaignData, relatedData] = await Promise.all([
    getCampaignData(params.keyword),
    getRelatedData(params.keyword),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<></>}>
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{campaignData.title}</h1>
          <p className="text-gray-600">{campaignData.description}</p>
        </section>

        <Suspense fallback={<></>}>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></section>
        </Suspense>
      </Suspense>
    </main>
  );
}
