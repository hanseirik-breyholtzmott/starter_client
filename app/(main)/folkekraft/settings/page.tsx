"use client";

import React, { useState } from "react";

//Shadcn
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//Icons
import { LockIcon, ChevronRight } from "lucide-react";

type Props = {};

const tabsData = [
  { id: "personal", label: "Personal information", count: null },
  { id: "information", label: "Contact information", count: null },
  { id: "payments", label: "Payment methods", count: null },
  { id: "privacy", label: "Privacy", count: null },
  { id: "security", label: "Security", count: null },
  { id: "notifications", label: "Notifications", count: null },
  { id: "delete", label: "Delete account", count: null },
];

const Settings = (props: Props) => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <main>
      <div className="container mx-auto mt-12 mb-14 min-h-[960px]">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col md:flex-row gap-8"
        >
          <TabsList className="h-auto p-0 bg-transparent flex flex-col gap-8 mt-10 justify-start">
            {tabsData.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "px-1 sm:px-3 py-2 text-xl font-medium text-gray-500 hover:text-gray-700 border-b-4 border-transparent text-left rounded-none w-full justify-start flex items-center",
                  activeTab === tab.id && "active:text-blue-600 border-blue-600"
                )}
              >
                <span className="flex-grow">{tab.label}</span>
                {tab.count !== null && (
                  <span className="ml-2 text-xs font-normal text-gray-400 hidden">
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <ChevronRight className="w-5 h-5 ml-2 text-blue-600" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="personal" className="flex-1 mt-0">
            <h1 className="text-3xl font-bold mb-6">Personal information</h1>

            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-2">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First name
                  </label>
                  <Input id="firstName" defaultValue="Hans-Eirik" />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last name
                  </label>
                  <Input id="lastName" defaultValue="Breyholtz-Mott" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Displayed on your profile and across Republic. Must be your real
                name. The full legal name to be signed on your securities is
                collected below under &quot;Identity verification&quot;.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Update
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <LockIcon className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold">
                  Update your identification documents
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Required by United States banking laws. This information is{" "}
                <span className="underline">kept secure</span>. It will never be
                used for any purpose beyond executing your investment.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                You will need your phone and a photo of your identity document.
              </p>
              <div className="bg-white p-4 rounded-md mb-6">
                <h3 className="font-semibold mb-2">
                  Why am I being asked to update my identification documents?
                </h3>
                <p className="text-sm text-gray-600">
                  We found that your identification documents are either expired
                  or invalid. Please provide updated documents to continue
                  investing on Republic.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Update documents
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="information" className="flex-1 mt-0">
            <form className="space-y-8">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="hbreyholtz@gmail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current password
                    </label>
                    <Input id="current-password" type="password" />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update
                </Button>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Mailing address</h2>
                <div>
                  <label
                    htmlFor="street"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street
                  </label>
                  <Input id="street" defaultValue="Vardesvingen" />
                </div>
                <div>
                  <label
                    htmlFor="apt-suite"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apt/suite
                  </label>
                  <Input id="apt-suite" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Country
                    </label>
                    <Select defaultValue="Norway">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Norway">Norway</SelectItem>
                        <SelectItem value="Sweden">Sweden</SelectItem>
                        <SelectItem value="Denmark">Denmark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City
                    </label>
                    <Input id="city" defaultValue="Bergen" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="state-province"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State/Province
                    </label>
                    <Input id="state-province" />
                  </div>
                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Postal code
                    </label>
                    <Input id="postal-code" defaultValue="5141" />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Your mailing address may be used by Republic or founders to
                  deliver physical mail. All essential investment information
                  will be sent to you via email.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Update
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Settings;
