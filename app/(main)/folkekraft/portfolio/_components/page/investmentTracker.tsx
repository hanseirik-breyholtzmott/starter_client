import React from "react";

//Shadcn
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

//Data
const investmentData = [
  {
    title: "Antall kunder",
    value: "652",
    bgColor: "bg-blue-50",
    button: {
      text: "Bli kunde",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Antall målepunkter",
    value: "684",
    bgColor: "bg-green-50",
  },
  {
    title: "Antall vervinger",
    value: "30",
    bgColor: "bg-blue-50",
  },
  {
    title: "Følgere på facebook",
    value: "284",
    bgColor: "bg-green-50",
    button: {
      text: "Følg oss!",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Følgere på instagram",
    value: "329",
    bgColor: "bg-blue-50",
    button: {
      text: "Følg oss!",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Kunde rating Folkekraft",
    value: "4/5",
    bgColor: "bg-green-50",
    button: {
      text: "gi oss tilbake melding",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Bytt rating",
    value: "3.1 / 5",
    bgColor: "bg-blue-50",
    button: {
      text: "Invester minimum",
      action: () => console.log("Minimum investment clicked"),
    },
  },
  {
    title: "Google rating",
    value: "- - -",
    bgColor: "bg-green-50",
    button: {
      text: "Invester maksimum",
      action: () => console.log("Maximum investment clicked"),
    },
  },
  {
    title: "App rating",
    value: "4,8",
    bgColor: "bg-blue-50",
    button: {
      text: "Invester maksimum",
      action: () => console.log("Maximum investment clicked"),
    },
  },
];

type Props = {};

export default function InvestmentTracker({}: Props) {
  return (
    <div className="container mx-auto p-4 my-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-700">
            Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {investmentData.map((item, index) => (
              <Card
                key={index}
                className={`${item.bgColor} border-none shadow-sm`}
              >
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {item.value}
                  </p>
                  {item.button && (
                    <Button
                      onClick={item.button.action}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg h-12"
                    >
                      {item.button.text}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
