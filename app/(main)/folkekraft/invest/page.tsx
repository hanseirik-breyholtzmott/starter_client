"use client";

import React, { useState } from "react";

//Shadcn
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

const Invest = (props: Props) => {
  const [investmentAmount, setInvestmentAmount] = useState("");
  return (
    <main className="">
      <div className="container mx-auto px-4 py-8">
        <div className="container mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
              <h1 className="text-3xl font-bold">Folkekraft AS</h1>
            </div>
            <div>
              <label
                htmlFor="investAs"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Invester som
              </label>
              <Select defaultValue="myself">
                <SelectTrigger id="investAs" className="w-[200px]">
                  <SelectValue placeholder="Select investment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="myself">Megselv / privatperson</SelectItem>
                  <SelectItem value="entity">Selskap</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>

          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2">Investeringsbeløp</h2>
              <p className="text-gray-600 mb-4">
                Betaling skjer i etterkant av bestillingen.
              </p>
              <Input
                type="text"
                placeholder="min $100"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="mb-2"
              />
              <p className="text-sm text-gray-600">
                Du invester som{" "}
                <span className="font-medium">Megselv / privatperson</span>{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  change
                </a>
              </p>

              <div className="mt-8">
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
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full text-xl px-8 py-6">
                    Verifiser med BankID
                  </Button>
                </div>
              </div>

              <Card className="mt-8 bg-gray-100 hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">
                    Why am I being asked to verify my identity again?
                  </h3>
                  <p className="text-sm text-gray-600">
                    We have updated our identity verification standards, and
                    this may require you to re-verify some personal information.{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Learn more
                    </a>
                  </p>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2 flex items-center">
                  Bli Folkekraft kunde og få 1 000kr i aksjer
                </h2>
                <p className="text-gray-600 mb-4">
                  Required by United States banking laws. This information is{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    kept secure
                  </a>
                  . It will never be used for any purpose beyond executing your
                  investment.
                </p>
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Jeg ønsker å bli Folkekraft kunde og få 1 000kr i aksjer
                  </label>
                </div>
              </div>
              <Card className="mt-8 bg-gray-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">
                    Why am I being asked to verify my identity again?
                  </h3>
                  <p className="text-sm text-gray-600">
                    We have updated our identity verification standards, and
                    this may require you to re-verify some personal information.{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Learn more
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="w-64">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Perks</h2>
                <p className="text-gray-600 mb-4">
                  Only available perks are shown. You can still invest any
                  amount.
                </p>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Bli Folkekraft kunde</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold mb-2">
                        Du vil få i aksjer
                        <span className="text-2xl ml-2">1 000kr</span>
                      </p>
                      <Tabs defaultValue="how-it-works">
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="how-it-works">
                            Se hvordan det fungerer
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="how-it-works">
                          <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Verv Folkekraft</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold mb-2">
                        Du vil få i aksjer
                        <span className="text-2xl ml-2">300kr</span>
                      </p>
                      <Tabs defaultValue="how-it-works">
                        <TabsList className="grid w-full grid-cols-1">
                          <TabsTrigger value="how-it-works">
                            Se hvordan det fungerer
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="how-it-works">
                          <p className="text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Dolore voluptas vitae incidunt.
                          </p>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Investor tilbud</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold mb-2">
                        Investerer du mer enn
                        <span className="text-2xl ml-2">10 000kr</span>
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Vil du få en rabatt på strømavtalen
                      </p>
                      <Button variant="outline" className="w-full mb-4">
                        Form C SEC.gov
                      </Button>
                      <h3 className="font-semibold mb-2">Company documents</h3>
                      <ul className="space-y-2">
                        <li>
                          <Button variant="link" className="p-0 h-auto">
                            Subscription Agreement
                          </Button>
                        </li>
                        <li>
                          <Button variant="link" className="p-0 h-auto">
                            Groundfloor Finance Form C.pdf
                          </Button>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Documents</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                    <a href="#" className="text-blue-600 hover:underline">
                      Groundfloor Finance Form C.pdf
                    </a>
                  </li>
                  <li className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 mr-2"></div>
                    <a href="#" className="text-blue-600 hover:underline">
                      Groundfloor Series B-3 Preferred Stock shares
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">How it works</h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline">
                      When will I be charged?
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ChevronDown className="w-4 h-4 mr-2" />
                    <a href="#" className="text-blue-600 hover:underline">
                      So I'm only charged if funding succeeds?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Invest;
