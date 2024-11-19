import React from "react";

//Nextjs
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

//Shadcn
import { cn } from "@/lib/utils";

//Cookies
import {
  getCookieValue,
  validateSessionCookie,
  getUserId,
} from "@/lib/cookies";

//Dynamic
export const dynamic = "force-dynamic";

//Crypto

//Components
import DataTable from "./_components/data-table";
import { columns } from "./_components/columns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

//Axios
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

//Data
const tabsData = [
  {
    id: "/folkekraft/portfolio/",
    label: "Mine investeringer",
    count: null,
    active: true,
  },
  {
    id: "/folkekraft/portfolio/transactions",
    label: "Transaksjoner",
    count: 1,
    active: false,
  },
];

type Props = {};

const getPortfolioData = async () => {
  // Check for session cookie
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/sign-in");
  }

  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  await setAuthorizationHeader();

  const response = await axiosInstance.get(
    "/api/user/" + userId + "/portfolio"
  );

  return response.data;
  try {
  } catch (error) {
    console.log(error);
  }
};

export default async function PortfolioPage({}: Props) {
  const portfolioData = await getPortfolioData();

  if (!portfolioData) {
    console.log("Error loading portfolio data");
    return <div>Error loading portfolio data</div>;
  }

  return (
    <section className="container mx-auto">
      <div className="text-7xl font-black mt-8">
        <h1>Min portefølje</h1>
      </div>
      <div>
        <Tabs value="investments" className="w-full sm:w-auto">
          <TabsList className="h-auto p-0 bg-transparent flex flex-col lg:flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
            <div className="flex flex-col lg:flex-row gap-8">
              {tabsData.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.id}
                  className={cn(
                    "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                    tab.active && "active:text-[#00263D] border-[#59C9B9]"
                  )}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                      {tab.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </TabsList>
        </Tabs>
      </div>
      <div className="mt-16 mb-20">
        <DataTable data={portfolioData.processedData} columns={columns} />
      </div>
    </section>
  );
}
