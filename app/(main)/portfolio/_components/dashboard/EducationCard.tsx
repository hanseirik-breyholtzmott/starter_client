"use client";

import { Card } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

type EducationCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
};

interface EducationCardProps {
  card: EducationCard;
}

export function EducationCard({ card }: EducationCardProps) {
  return (
    <Link href={card.link}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <div className={`${card.color} p-6 aspect-[2/1] relative rounded-t-lg`}>
          <div className="w-16 h-16 relative">
            <Image
              src={card.icon}
              alt={card.title}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-2">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      </Card>
    </Link>
  );
}
