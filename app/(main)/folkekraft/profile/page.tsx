"use client";

import React, { useState } from "react";

//Nextjs
import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

//Shadcn
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

//Icons
import { Facebook, Instagram, Link, Settings } from "lucide-react";

//Auth
import { useAuth } from "@/app/hooks/AuthContext";

//Data
const cardData = [
  {
    id: 1,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm59vKOX71S5cBKeGsQfwyI0zTEinbLYqv3ZOrN",
    title: "Folkeinvest",
    badgeText: "Tidlig investor",
    description: "Jeg var en av de første investorer i Folkekraft.",
    additionalInfo: "",
  },
  {
    id: 2,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm59vKOX71S5cBKeGsQfwyI0zTEinbLYqv3ZOrN",
    title: "Folkekraft emisjon",
    badgeText: "Seed investor",
    description: "Jeg var en av de første investorer i Folkekraft.",
    additionalInfo: "",
  },
  {
    id: 3,
    imageSrc:
      "https://utfs.io/f/1c66qeb7SCm59vKOX71S5cBKeGsQfwyI0zTEinbLYqv3ZOrN",
    title: "Folkekraft kunde",
    badgeText: "Stolt kunde",
    description: "Jeg var en av de første investorer i Folkekraft.",
    additionalInfo: "",
  },
];

export default function ProfilePage() {
  // Check for session cookie
  const cookieStore = cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/sign-in");
  }
  const { user } = useAuth();
  console.log("user", user);

  const [buttonText, setButtonText] = useState("Rediger profil");

  const handleClick = () => {
    setButtonText("Kommer snart");

    setTimeout(() => {
      setButtonText("Rediger profil");
    }, 3000);
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="h-[100px] w-[100px] bg-blue-600 border-4 border-white rounded-md"></div>
              <div>
                <h1 className="text-6xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-sm my-4">
                  <span>Investor & kunde siden 2023</span>
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className="bg-[#00a86b] text-white">INVESTOR</Badge>
                  <Button variant="ghost" size="icon">
                    <Facebook size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Instagram size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Link size={20} />
                  </Button>
                </div>
                <div className="mt-4">
                  <h2 className="font-semibold">
                    Folkekraft er den beste strømselskap!
                  </h2>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#0a2351] bg-blue-600 transition duration-300 ease-in-out"
              onClick={handleClick} // Add the onClick event handler
            >
              <Settings className="mr-2 h-4 w-4" /> {buttonText}
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 mb-14">
        <h2 className="text-2xl font-bold mb-4">
          Investeringer & kundeforhold
        </h2>
        <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 hidden">
          {cardData.map((card) => (
            <Card key={card.id}>
              <CardContent className="p-4">
                <div className="relative w-full h-[260px] overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt="Responsive Image"
                    layout="fill"
                    objectFit="contain"
                    className="absolute inset-0 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-bold text-lg flex flex-row items-center gap-2">
                    {card.title} <Badge>{card.badgeText}</Badge>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {card.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {card.additionalInfo}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
