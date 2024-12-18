"use client";

import React from "react";
import { useCampaign } from "@/app/hooks/CampaignContext";

//Nextjs
import Link from "next/link";

//Shadcn
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

//Icons
import { Download, FileText } from "lucide-react";

export default function Documents() {
  const { campaign, loading, error } = useCampaign();

  if (loading) {
    return (
      <div className="py-8 mt-6 text-center">
        <p>Laster dokumenter...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 mt-6 text-center text-red-500">
        <p>Kunne ikke laste dokumenter: {error}</p>
      </div>
    );
  }

  if (!campaign || !campaign.documents) {
    return (
      <div className="py-8 mt-6 text-center">
        <p>Ingen dokumenter tilgjengelig</p>
      </div>
    );
  }

  return (
    <div className="py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row items-center md:items-start gap-8 flex-col">
        <div className="h-full flex flex-col gap-10 w-full">
          <div className="w-full max-w-[960px] mx-auto mb-4 h-fit text-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-[#00263D]">
                Dokumenter
              </h2>
              <span className="text-gray-600">
                Viktige dokumenter om Folkekraft
              </span>
              <Separator className="max-w-[200px] mx-auto h-[2px] bg-[#59C9B9] mt-4" />
            </div>
            <div className="flex flex-col space-y-6">
              {campaign.documents.map((doc, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-row justify-between items-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#59C9B9]" />
                        <p className="font-semibold text-left">{doc.title}</p>
                      </div>
                      <p className="text-gray-600 mt-1">{doc.description}</p>
                    </div>
                    <Link
                      href={doc.url}
                      target="_blank"
                      download={doc.fileName}
                      className="ml-4"
                    >
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-[#59C9B9]/10"
                      >
                        <Download className="w-4 h-4" />
                        Last ned
                      </Button>
                    </Link>
                  </div>
                  {index < campaign.documents.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
