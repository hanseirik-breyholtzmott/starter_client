import { Suspense } from "react";
import CampaignGrid from "@/app/_components/CampaignGrid";
import PageHeader from "@/app/_components/PageHeader";
import { getCampaigns } from "@/lib/actions/campaigns";
import Footer from "@/app/_components/Footer";

export default async function Home() {
  const campaigns = await getCampaigns();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <main className="py-8">
          <PageHeader />
          <Suspense
            fallback={<div className="text-center py-10">Loading...</div>}
          >
            <CampaignGrid initialCampaigns={campaigns} />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}
