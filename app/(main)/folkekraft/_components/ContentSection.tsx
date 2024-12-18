import React from "react";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ContentSectionProps {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  content: string; // Changed from React.ReactNode to string
  delay?: number;
}

export default function ContentSection({
  id,
  title,
  imageSrc,
  imageAlt,
  content,
  delay = 0,
}: ContentSectionProps) {
  return (
    <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay }}
        >
          <div id={id} className="scroll-mt-[150px]">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            {imageSrc && imageSrc.trim() !== "" && (
              <div className="mb-4 relative w-full h-48 md:h-64 lg:h-80">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
