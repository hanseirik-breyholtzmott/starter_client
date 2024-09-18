"use client";

import React, { useState } from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//Icons
import { Mail } from "lucide-react";

//TabComponents
import About from "./about";
import CapList from "./caplist";
import Team from "./team";
import Documents from "./documents";

//Data
const tabsData = [
  { id: "about", label: "Beskrivelse", count: null },
  { id: "caplist", label: "Aksjeeiebok", count: null },
  { id: "team", label: "Team", count: null },
  { id: "documents", label: "Dokumenter", count: null },
];

type Props = {};

export default function TabsComponent({}: Props) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="w-full container mx-auto">
      <div className="flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="h-auto p-0 bg-transparent flex flex-row gap-8 mt-10 border-b border-gray-200 justify-between">
            <div className="flex flex-row gap-8">
              {tabsData.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent rounded-none",
                    activeTab === tab.id &&
                      "active:text-blue-600 border-blue-600"
                  )}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                      {tab.count}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </div>
            <Link
              href="mailto:lg@folkekraft.no"
              className="flex items-center text-xl text-gray-500 hover:text-gray-700"
            >
              <Mail size={20} className="w-4 h-4 mr-1 text-xl" />
              Spørsmål?
            </Link>
          </TabsList>
          <TabsContent value="about">
            <About />
          </TabsContent>
          <TabsContent value="caplist">
            <CapList />
          </TabsContent>
          <TabsContent value="team">
            <Team />
          </TabsContent>
          <TabsContent value="documents">
            <Documents />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
