import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

//Icons
import { Lock, ChevronDown } from "lucide-react";

type Props = {};

export default function InvestmentVerification({}: Props) {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-2 flex items-center">
        Verifisering <Lock className="ml-2 w-4 h-4" />
      </h2>
      <p className="text-gray-600 mb-4">
        Required by United States banking laws. This information is{" "}
        <a href="#" className="text-blue-600 hover:underline">
          kept secure
        </a>
        . It will never be used for any purpose beyond executing your
        investment.
      </p>
      <div className="flex gap-4 flex-col max-w-64">
        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full text-xl px-8 py-6">
          Verifiser med Vipps
        </Button>
      </div>
    </div>
  );
}
