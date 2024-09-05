"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

//Shadn
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

//import { User, columns } from "../_components/customer-columns";
//import { DataTable } from "../_components/customer-data-table";

import { Investors, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

//Uploadthing
import { UploadButton } from "@/lib/uploadthing";

//Helper function
import { formatCurrency, covertToPercentage } from "@/lib/helperFunctions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

//Icons
import { X, Info } from "lucide-react";

import { number, z } from "zod";

import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/app/hooks/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

const formSchema = z.object({
  numberOfShares: z.string(),
});

const capTableData = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Investor",
    shares: 2000000,
    ownership: 50,
    value: "$500,000",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Employee",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
];

const FolkeinvestInvest = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<Investors[]>([]);
  const router = useRouter();

  //Purchase
  const [numberOfShares, setNumberOfShares] = useState<number>(0);

  //Campaign
  const [totalShares, setTotalShares] = useState<number>(0);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalSharesUser, setTotalSharesUser] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  const handleClose = () => {
    window.location.reload();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Console log the current value of the input field

    const response = await axios.post(
      "http://localhost:5000/api/purchaseshares",
      {
        userId: user?.id,
        numberOfShares: numberOfShares,
        purchasePrice: 8,
      }
    );

    if (!response.data.success) {
      toast({
        title: "Error has occured",
        description: `Error message: ${response.data.message}`,
      });
      return;
    }

    // Handle form submission, e.g., show a toast notification
    toast({
      title: "Takk for at du har investert i Folkekraft",
      description: `Sjekk eposten din for sluttsedel. Antall aksjer ${numberOfShares} for ${
        numberOfShares * 8
      } kr`,
    });
  };

  useEffect(() => {
    setData(capTableData);

    // Only fetch share data if the user is defined
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get(
            "/api/folkekraft/" + user.id
          );
          setTotalShares(response.data.data.totalShares);
          setTotalPurchases(response.data.data.totalPurchases);
          setTotalAmount(response.data.data.totalAmount);
          setTotalSharesUser(response.data.user.totalShares);
          setGoal(response.data.data.goal);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }

    const calculateDaysRemaining = () => {
      const currentDate = new Date();
      const targetDate = new Date(currentDate.getFullYear(), 8, 30); // 7 = August (0-indexed)

      const differenceInTime = targetDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setDaysRemaining(differenceInDays);
    };

    calculateDaysRemaining();
  }, [user]);

  return (
    <main className="flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div className="bg-white rounded-xl h-[400px] p-4 relative">
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <iframe
              src="https://player.vimeo.com/video/995795812?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              title="Vi har ikke vært gode nok"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl space-y-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Folkekraft AS</h1>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-start">
                <p>{formatCurrency(totalAmount)}</p>
              </div>
              <Progress value={goal * 100} />
              <div className="flex flex-row justify-between">
                <p>0 kr</p>
                <p>8 000 000 kr</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex flex-row justify-between">
              <p className="font-semibold">
                Minstemål <br />{" "}
                <span className="font-normal">{covertToPercentage(goal)}</span>
              </p>
              <p className="font-semibold">
                Ant. tegninger <br />{" "}
                <span className="font-normal">{totalPurchases}</span>
              </p>
              <p className="font-semibold">
                Pris pr. aksje <br />{" "}
                <span className="font-normal">8,00 kr</span>
              </p>
              <p className="font-semibold">
                Lukkes om <br />{" "}
                <span className="font-normal">{daysRemaining} dager</span>
              </p>
            </div>
            <Separator className="bg-black" />
            <div className="flex flex-col space-y-1">
              <div className="flex flex-row justify-between">
                <p className="font-semibold flex items-center">
                  Verdsettelsen:
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </p>
                <p>19 999 976,40 kr</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold flex items-center">
                  Antall aksjer du har:
                </p>
                <p>{totalShares}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold flex items-center">
                  Anbefalt antall kjøp av aksjer:
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={20} className="ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </p>
                <p>19 999 976,40 kr</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold">
                  Antall aksjer tilgjengelig til salg:
                </p>
                <p>19 999 976,40 kr</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between mt-3 gap-9 items-center">
            <p className="text-sm">
              Før du kjøper aksjer, bør du forstå risikoen dette innebærer. Ikke
              invester mer enn det du kan tape.
            </p>
            <Button onClick={() => router.push("/dashboard/folkekraft/invest")}>
              Kjøp
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl p-4">
        <Tabs defaultValue="about" className="w-full mx-auto">
          <TabsList className="grid w-full grid-cols-5 mx-auto">
            <TabsTrigger value="about">Beskrivelse</TabsTrigger>
            <TabsTrigger value="information">Grunnleggende Info</TabsTrigger>
            <TabsTrigger value="table">CapList</TabsTrigger>
            <TabsTrigger value="team">Team og eiere</TabsTrigger>
            <TabsTrigger value="documents">Dokumenter</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="min-h-[50vh]">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </TabsContent>
          <TabsContent value="information" className="min-h-[50vh]">
            Change your password here.
          </TabsContent>
          <TabsContent value="table" className=" h-fit">
            <div className="w-full max-w-[960px] mx-auto mb-4 h-fit">
              <h1 className="text-3xl font-bold mt-12 mb-8">All Investors</h1>
              <DataTable columns={columns} data={data} />
            </div>
          </TabsContent>
          <TabsContent value="team" className="min-h-[50vh]">
            <div className="w-full max-w-[960px] mx-auto mb-4">
              <h2 className="text-3xl font-bold mt-12 mb-8">Team</h2>
              <Separator />
            </div>

            <div className="flex gap-4 flex-row flex-wrap w-full max-w-[960px] mx-auto justify-center">
              <Card className="rounded-xl overflow-hidden max-w-[300px]">
                <CardHeader className=" p-0">
                  <div className="mb-4">
                    <img
                      className=""
                      src="https://framerusercontent.com/images/cE9N3xOHYmrgmqWBHdWHXoW5U.png"
                      alt=""
                    />
                  </div>

                  <CardTitle className="mt-8 px-6">Geir Morten</CardTitle>
                  <CardDescription className="px-6 text-sm">
                    Gründer og styreleder
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p>Entreprenør i over 20 år</p>
                  <br />
                  <p>Bakgrunn fra shipping, finans, teknologi og kraft</p>
                  <br />
                  <p className="text-wrap">
                    Medgründer i bl.a. H2 Marine, The Ship og GreenPowerHub
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl overflow-hidden max-w-[300px]">
                <CardHeader className=" p-0">
                  <div className="mb-4">
                    <img
                      className=""
                      src="https://framerusercontent.com/images/ito2lVTD90zg4v7QzWb91ozFGs.jpg?scale-down-to=512"
                      alt=""
                    />
                  </div>

                  <CardTitle className="mt-8 px-6">Krishan</CardTitle>
                  <CardDescription className="px-6 text-sm">
                    Interim daglig leder
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p>Investor og konsulent i oppstartsbedrifter</p>
                  <br />
                  <p>Bakgrunn som mangeårig partner i ledende PR-byrå</p>
                  <br />
                  <p>
                    Hjelper små bedrifter å bli store med forretningsutvikling
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-xl overflow-hidden max-w-[300px]">
                <CardHeader className=" p-0">
                  <div className="mb-4">
                    <img
                      className=""
                      src="https://framerusercontent.com/images/1vSG1wm8G35q5CTun4um0c61U0.png"
                      alt=""
                    />
                  </div>

                  <CardTitle className="mt-8 px-6">Tormund</CardTitle>
                  <CardDescription className="px-6 text-sm">
                    Teknologisjef
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p>Over 12 års erfaring fra IT-bransjen</p>
                  <br />
                  <p>
                    Bakgrunn som utvikler av apper, webløsninger og
                    integrasjoner
                  </p>
                  <br />
                  <p>Brenner for gode og sikre digitale løsninger</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl overflow-hidden max-w-[300px]">
                <CardHeader className=" p-0">
                  <div className="mb-4">
                    <img
                      className=""
                      src="https://framerusercontent.com/images/MXozni0DQS04NgpPV1bNS7PKvw.png"
                      alt=""
                    />
                  </div>

                  <CardTitle className="mt-8 px-6">Hans-Eirik</CardTitle>
                  <CardDescription className="px-6 text-sm">
                    Driftsansvarlig
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p>Høyere utdanning innen økonomi og IT-utvikling</p>
                  <br />
                  <p>Deltatt på gründer-programmer</p>
                  <br />
                  <p>Innovasjon – og teknologientusiast</p>
                </CardContent>
              </Card>
              <Card className="rounded-xl overflow-hidden max-w-[300px]">
                <CardHeader className=" p-0">
                  <div className="mb-4">
                    <img
                      className=""
                      src="https://framerusercontent.com/images/AwYfVprSvOrVz55maPquUzIuLx4.png"
                      alt=""
                    />
                  </div>

                  <CardTitle className="mt-8 px-6">Lasse</CardTitle>
                  <CardDescription className="px-6 text-sm">
                    Salgsansvarlig
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <p>Høyere utdanning innen internasjonal markedsføreledelse</p>
                  <br />
                  <p>Erfaring innen prosjektledelse, markedsføring og salg</p>
                  <br />
                  <p>Aktiv innen entreprenørskap og innovasjon</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="documents" className="min-h-[50vh]">
            <div className="w-full max-w-[960px] mx-auto mb-4 h-fit">
              <h2 className="text-3xl font-bold mt-12 mb-8">Dokumenter</h2>
              <Separator />
              <div className="flex flex-col space-y-3">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Document type</p>
                    <p>Document name</p>
                  </div>
                  <div className="cursor-pointer underline">Last ned</div>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Document type</p>
                    <p>Document name</p>
                  </div>
                  <div className="cursor-pointer underline">Last ned</div>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Document type</p>
                    <p>Document name</p>
                  </div>
                  <div className="cursor-pointer underline">Last ned</div>
                </div>
                <Separator />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default FolkeinvestInvest;

/*


<AlertDialog>
              <AlertDialogTrigger className="border rounded-xl px-4 py-2 h-fit bg-slate-600 text-white ">
                Kjøp
              </AlertDialogTrigger>
              <AlertDialogContent className="flex flex-col gap-4">
                <AlertDialogHeader className="flex flex-row justify-between items-center">
                  <AlertDialogTitle>Kjøp aksjer</AlertDialogTitle>
                  <AlertDialogCancel
                    className="border-0 hover:bg-transparent"
                    onClick={handleClose}
                  >
                    <X />
                  </AlertDialogCancel>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Før du bekrefter din tegning bør du forsikre deg om at du
                  forstår risikoen dette innebærer. Ikke invester mer enn det du
                  har råd til å tape.
                </AlertDialogDescription>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-row justify-evenly">
                    <div>
                      <Label htmlFor="inputField">Antall aksjer</Label>
                      <Input
                        id="inputField"
                        type="number"
                        min={25}
                        max={1000}
                        value={numberOfShares}
                        onChange={(e) =>
                          setNumberOfShares(parseInt(e.target.value))
                        }
                        placeholder="Enter your name"
                        className="mt-2"
                      />
                      <small>Det minste du kan tegne er 25 aksjer</small>
                    </div>
                    <div>
                      <Label htmlFor="inputField">Beløp</Label>
                      <Input
                        readOnly
                        value={numberOfShares * 8 + " kr"}
                        placeholder="Beløp"
                        className="max-w-[100px] mt-2 bg-slate-200 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>

                <AlertDialogFooter></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            */
