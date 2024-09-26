import React from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  actionText: string;
  boldText: string;
  description: string;
  button: {
    text: string;
    link: string;
  };
};

export default function perksCard({
  title,
  actionText,
  boldText,
  description,
  button,
}: Props) {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-2">
          {actionText}
          <span className="text-2xl ml-2">{boldText}</span>
        </p>
        <Link href={button.link}>
          <Button className="w-full bg-[#00263D] hover:bg-[#00263D]/80 text-[#59C9B9] text-lg h-12 my-4">
            {button.text}
          </Button>
        </Link>
        <p className="text-sm text-gray-600 mt-4 mb-4">{description}</p>
      </CardContent>
    </Card>
  );
}
