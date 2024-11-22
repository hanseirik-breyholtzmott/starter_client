import { Suspense } from "react";
import { notFound } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

// Types
interface CampaignData {
  id: string;
  title: string;
  description: string;
  status: "active" | "inactive";
  startDate: string;
  endDate: string;
  budget: number;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

interface RelatedData {
  id: string;
  name: string;
}

export async function generateMetadata({
  params,
}: {
  params: { companyName: string[] };
}) {
  const companyNameString = params.companyName.join("/");
  return {
    title: `Campaign - ${companyNameString}`,
    description: `Campaign details for ${companyNameString}`,
    openGraph: {
      title: `Campaign - ${companyNameString}`,
      description: `Campaign details for ${companyNameString}`,
    },
  };
}

export const dynamic = "force-dynamic";

async function getCampaignData(
  companyNameString: string
): Promise<CampaignData> {
  if (!companyNameString) {
    throw new Error("Company name is required");
  }

  const encodedCompanyName = encodeURIComponent(companyNameString.trim());

  try {
    const response = await axiosInstance.get(
      `/api/campaigns/${encodedCompanyName}`
    );

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
    throw new Error("Failed to fetch campaign data");
  }
}

async function getRelatedData(
  companyNameString: string
): Promise<RelatedData[]> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/related/${encodeURIComponent(
        companyNameString
      )}`,
      {
        next: {
          revalidate: 3600,
        },
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch related data");
    return res.json();
  } catch (error) {
    console.error("Error fetching related data:", error);
    throw error;
  }
}

export default async function CampaignPage({
  params,
}: {
  params: { companyName: string[] };
}) {
  const companyNameString = params.companyName.join("/");

  // Fetch data in parallel
  const [campaignData, relatedData] = await Promise.all([
    getCampaignData(companyNameString),
    getRelatedData(companyNameString),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<></>}>
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{campaignData.title}</h1>
          <p className="text-gray-600">{campaignData.description}</p>
        </section>

        <Suspense fallback={<></>}>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Add your campaign details and related data rendering here */}
          </section>
        </Suspense>
      </Suspense>
    </main>
  );
}
