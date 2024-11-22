"use client";

import React, { useState, useEffect } from "react";

//Nextjs
import Image from "next/image";
import { useRouter } from "next/navigation";

//Components
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

//Helper functions
import axiosInstance from "@/lib/axiosInstance";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  followers: number;
  status: "Fulgt" | "Følg emisjon";
}

const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: "1",
    title: "Folkekraft Group AS",
    description:
      "Din egen AI-Assistent, med hjelp som fra et menneske for deg privat, på jobb og for kunder! Bli med på børsnotering sammen med Norges beste investorer.",
    imageUrl: "/placeholder.svg",
    followers: 1043,
    status: "Fulgt",
  },
  {
    id: "2",
    title: "Folkekraft AS",
    description:
      "Stack x me er en app for de som vil investere på en enkel og sosial måte. Bygg formuen din med kunnskap og nettverk. Nå går vi LIVE i Sverige 💃",
    imageUrl: "/placeholder.svg",
    followers: 755,
    status: "Følg emisjon",
  },
];

function InvestmentCard({
  opportunity,
}: {
  opportunity: InvestmentOpportunity;
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl">{opportunity.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-48 mb-4">
          <Image
            src={
              "https://utfs.io/f/1c66qeb7SCm52hDjzB9phV4yts0bOCKoFTzM5vIkXjlNQJdH"
            }
            alt={opportunity.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">{opportunity.description}</p>
        <div className=" items-center justify-between hidden">
          <span className="text-sm text-gray-500">
            {opportunity.followers} følgere
          </span>
          <Button
            variant={opportunity.status === "Fulgt" ? "secondary" : "default"}
            className="min-w-[120px]"
          >
            {opportunity.status}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<InvestmentOpportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the email subscription logic
    console.log("Email subscribed!");
    closeModal();
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        console.log("Starting API fetch...");
        const response = await axiosInstance.get(`/api/campaign/all`);
        console.log("API Response:", response);
        const data = response.data;
        console.log("Parsed Data:", data);
        setCampaigns(data);
      } catch (error) {
        console.log("Failed to fetch campaigns:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleCardClick = (id: string) => {
    if (id == "672cbcce19b91a12e631f7f5") {
      router.push(`/folkekraft-group`);
    } else {
      router.push(`/folkekraft`);
      //router.push(`/campaign/${id}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        <main className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">
              Kommende investeringsmuligheter
            </h1>
            <Button variant="outline">Se alle emisjoner</Button>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => handleCardClick(campaign.id)}
                  className="cursor-pointer"
                >
                  <InvestmentCard opportunity={campaign} />
                </div>
              ))}
            </div>
          )}
        </main>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Abonner på e-postliste</DialogTitle>
              <DialogDescription>
                Få de siste oppdateringene om investeringsmuligheter direkte i
                innboksen din.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubscribe}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-post
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Abonner</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
}
