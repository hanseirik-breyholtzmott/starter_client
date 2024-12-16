"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { ShareDialog } from "./ShareDialog";

interface NewsCardProps {
  title: string;
  date: string;
  content: string;
  image?: string;
}

export function NewsCard({ title, date, content, image }: NewsCardProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Card className="overflow-hidden">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110">
              <Image
                src="https://utfs.io/f/1c66qeb7SCm5XUBsH1fojOvUIbCWn7QpSE4kLV9ZBYa0uec1"
                alt="Folkekraft"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h4 className="font-semibold">Folkekraft</h4>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            Post
          </Button>
        </div>

        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          {content}
        </p>

        {image && (
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <ShareDialog title={title} url={shareUrl} />
        </div>
      </div>
    </Card>
  );
}
