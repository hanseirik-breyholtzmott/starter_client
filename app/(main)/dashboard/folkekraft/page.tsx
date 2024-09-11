"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

//Shadn
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Investor, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

//Helper function
import {
  formatCurrency,
  covertToPercentage,
  formatNumber,
} from "@/lib/helperFunctions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthContext } from "@/app/hooks/AuthContext";
import Image from "next/image";

//Images
import emisjon from "@/public/img/emisjon.png";
import stromavtale from "@/public/img/stromavtale.png";
import kapital from "@/public/img/kapital.png";

const FolkeinvestInvest = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState<Investor[]>([]);
  const [capTableData, setCapTableData] = useState<Investor[]>([]);
  const router = useRouter();

  //Campaign
  const [totalShares, setTotalShares] = useState<number>(0);
  const [totalPurchases, setTotalPurchases] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalSharesUser, setTotalSharesUser] = useState<number>(0);
  const [goal, setGoal] = useState<number>(0);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [sharesAvailable, setSharesAvailable] = useState<number>(0);

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
          setSharesAvailable(response.data.data.sharesAvailable);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }

    const calculateDaysRemaining = () => {
      const currentDate = new Date();
      const targetDate = new Date(currentDate.getFullYear(), 9, 1); // 7 = August (0-indexed)

      const differenceInTime = targetDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setDaysRemaining(differenceInDays);
    };

    const fetchCapTableData = async () => {
      try {
        const response = await axiosInstance.get("/api/cap-table");
        setCapTableData(response.data.capTable);
      } catch (err) {
        console.log(err);
      }
    };

    calculateDaysRemaining();
    fetchCapTableData();
  }, [user]);

  return (
    <main className="flex flex-col gap-4">
      <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
        <div className="bg-white rounded-xl h-[400px] p-4 relative">
          <div className="w-full h-full relative overflow-hidden rounded-xl">
            <iframe
              src="https://player.vimeo.com/video/1007463389?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              style={{ border: "none" }}
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
            <div className="flex flex-row justify-between ">
              <p className="font-semibold hidden md:block">
                Maksmål <br />{" "}
                <span className="font-normal">{covertToPercentage(goal)}</span>
              </p>
              <p className="font-semibold">
                Ant. tegninger <br />{" "}
                <span className="font-normal">{totalPurchases + 8}</span>
              </p>
              <p className="font-semibold hidden md:block">
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
                  <Popover>
                    <PopoverTrigger>
                      <span className="underline">Verdsettelsen:</span>
                    </PopoverTrigger>
                    <PopoverContent>
                      Verdsettelsen er pre-money og baserer seg på en nedprising
                      fra kr 12 til kr 8 per aksje i forbindelse med emisjonen.
                      Dette fører til en justering av verdien fra 32,5 millioner
                      kr til 21,7 mill. kr. Fremtidig verdsettelse vil bli
                      beregnet basert på multippelanalyse av både omsetning og
                      EBITDA, som reflekterer selskapets vekstpotensial og
                      lønnsomhet.
                    </PopoverContent>
                  </Popover>
                </p>
                <p>21 713 752,00 kr</p>
              </div>
              <div className="flex flex-row justify-between hidden">
                <p className="font-semibold flex items-center">
                  Antall aksjer du har:
                </p>
                <p>{formatNumber(totalShares)}</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold flex items-center">
                  Anbefalt kjøp av aksjer:
                </p>
                <p>6 800,00 kr</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="font-semibold">
                  Antall aksjer tilgjengelig til salg:
                </p>
                <p>{formatNumber(sharesAvailable)} / 1 000 000</p>
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
          <div className="flex flex-col md:flex-row justify-center items-center">
            <TabsList className="flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 h-auto">
              <TabsTrigger value="about">Beskrivelse</TabsTrigger>
              <TabsTrigger value="table">Aksjeeierbok</TabsTrigger>
              <TabsTrigger value="team">Team og samarbeidspartnere</TabsTrigger>
              <TabsTrigger value="documents">Dokumenter</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="about" className=" relative">
            <div className="flex min-h-screen bg-white text-gray-800 relative">
              {/* Sidebar */}
              <aside className="w-64 p-6 border-r border-gray-200 sticky top-0 hidden md:block">
                <h2 className="font-semibold mb-4">FOLKEKRAFT AS</h2>
                <nav>
                  <ul className="space-y-2">
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#konsept">Konsept: strømkunde og medeier</a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#utfordring">Utfordring i strømbransjen</a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#markedsmulighet">
                        Markedsmulighet for Folkekraft
                      </a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#kundetilfredshet">Kundetilfredshet og salg</a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#strømavtalen">Strømavtalen i Folkekraft</a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#restrukturering">
                        Restrukturering av Folkekraft
                      </a>
                    </li>
                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#kapital">Kapital og exit</a>
                    </li>

                    <li className="hover:text-blue-600 hover:underline cursor-pointer">
                      <a href="#emision">Om pågående emisjon</a>
                    </li>
                  </ul>
                </nav>
              </aside>

              {/* Main content */}
              <div className="flex-1 p-8">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4" id="konsept">
                    Konsept: strømkunde og medeier
                  </h2>
                  <p className="mb-4">
                    Alle kunder blir aksjonærer i Folkekraft. Vi gir også
                    aksjepremie til kunder som verver andre. Kundene får en
                    enkel strømavtale basert på månedsavgift og påslag på
                    strømmen.
                    <br />
                    <br />
                    Folkekraft minner om konseptet til store samvirkeforetak som
                    Coop og Felleskjøpet, men vi gir aktivt eierskap og
                    exit-muligheter. Forretningsmodellen bidrar til
                    verdiskapning gjennom økt kundelojalitet og lavere
                    markedsføringskostnader gjennom bl.a. verveordning.
                    <br />
                    <br />
                    Du kan også kjøpe aksjer i Folkekraft som investor.
                    Folkekraft kjøper tilbake aksjer fra investorer for å gi dem
                    til nye kunder mens vi vokser. Investorer vil dermed få
                    flere exit-muligheter.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4" id="utfordring">
                    Utfordring i strømbransjen
                  </h2>
                  <p className="mb-4">
                    Forbrukerrådet mener at mange{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://e24.no/energi-og-klima/i/1BV4GK/forbrukerraadet-mener-stroemkundene-blir-lurt"
                    >
                      strømkunder blir lurt
                    </a>
                    . Tilbud kompliseres for å skjule høye kostnader. Dette har
                    ført til{" "}
                    <a
                      className="text-blue-500 underline"
                      href="https://www.bytt.no/strom/stromleverandorer/zbgv/misfornoyde-stromkunder-med-klagestorm"
                    >
                      klagestorm mot strømleverandører
                    </a>
                    . Vi bygger tillit ved at kundene er medeiere. I vårt første
                    driftsår har vi sett at Folkekraft får lojale kunder som
                    anskaffes til lav kostnad. Målet er at kundene skal bli
                    største aksjonærgruppe.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl font-semibold mb-4"
                    id="markedsmulighet"
                  >
                    Markedsmulighet for Folkekraft
                  </h2>
                  <p className="mb-4">
                    Det norske strømmarkedet er på ca. 3.2 mill. brukere. Vi har
                    som mål å få 100.000 kunder. Altså en markedsandel på noe
                    over 3 %. Det finnes ca. 80 strømleverandører i Norge.
                    Konkurransen om kundene er stor. Inntektsmarginene er små på
                    strømsalg og produktet er relativt generisk. De fleste
                    strømselskaper har store salg- og
                    markedsføringsorganisasjoner som tilfører kunden lite utover
                    høyere sluttkostnader.
                  </p>
                </section>

                <section>
                  <h2
                    className="text-2xl font-semibold mb-4"
                    id="kundetilfredshet"
                  >
                    Kundetilfredshet og salg
                  </h2>
                  <p className="mb-4">
                    Folkekraft har nesten 700 strømkunder. Det er stor
                    tilfredshet med både vår kundeapp som gir oversikt over
                    strømforbruk og betalingsløsninger via Vipps, avtalegiro,
                    etc. Selskapet har testet og optimalisert salgsstrategier.
                    Tidligere avhengighet av telesalg er nå byttet ut med
                    digital annonsering som i siste testkampanje bidro til å
                    hente 115 til en snittpris på 330 kroner. Markedsstandard på
                    telesalg er på 1000 - 1300 kr per kunde.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4" id="strømavtalen">
                    Strømavtalen i Folkekraft
                  </h2>
                  <p className="mb-4">
                    Aksjeverdi: Alt vi estimerer å tjene på kunden gis i aksjer
                    første året. Det tilsvarer ca. 1000 kr i aksjeverdi.
                  </p>
                  <Image
                    src={stromavtale}
                    alt="Emisjon"
                    style={{ width: "100%", height: "auto" }}
                  />
                </section>

                <section>
                  <h2
                    className="text-2xl font-semibold mb-4"
                    id="restrukturering"
                  >
                    Restrukturering av Folkekraft
                  </h2>
                  <p className="mb-4">
                    Etter etablering og Folkefinansieringskampanje i 2023 har
                    Folkekraft gjort betydelige endringer i organisasjonens
                    struktur. Nye lederskap har bidratt til økt effektivitet og
                    kostnadsreduksjon. Selskapet har også forbedret sine
                    IT-systemer, som inkluderer en ny kundeapp og
                    faktureringssystem, og har fjernet gamle systemer som
                    hindret vekst.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-12" id="kapital">
                    Kapital og exit
                  </h2>
                  <p className="mb-4">
                    Selskapet planlegger tre emisjoner fremover, med sikte på å
                    hente kapital fra både profesjonelle investorer og kunder.
                    Allerede ved ca. 8.000–9.000 kunder vil selskapet være
                    selvfinansiert frem mot 100.000 kunder. Inntektsgrunnlaget
                    vil primært komme fra strømleveranser, men også
                    mersalgsprodukter.
                    <br />
                    <br />
                    Investorer i Folkekraft får flere muligheter til å realisere
                    gevinst før børsnoteringen. Selskapet estimerer en aksjekurs
                    på 57 kroner og en selskapsverdi på 330 millioner kroner
                    innen 2028. Deltagelse i denne emisjonen vil i så tilfelle
                    gi 7 ganger tilbake på investert beløp.
                  </p>
                  <Image
                    src={kapital}
                    alt="Emisjon"
                    style={{ width: "100%", height: "auto" }}
                  />
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4" id="emision">
                    Om pågående emisjon
                  </h2>
                  <Image
                    src={emisjon}
                    alt="Emisjon"
                    style={{ width: "100%", height: "auto" }}
                  />
                </section>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="table" className=" h-fit">
            <div className="w-full max-w-[960px] mx-auto mb-4 h-fit">
              <h1 className="text-3xl font-bold mt-12 mb-8">All Investors</h1>
              <DataTable columns={columns} data={capTableData} />
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

              <div className="flex flex-col space-y-3">
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Folkekraft Emisjon 2024</p>
                    <p>Folkekraft emisjonspresentasjon</p>
                  </div>
                  <Link
                    href={"/doc/folkekraft_emisjonpresentasjon.pdf"}
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"folkekraft_emisjonpresentasjon.pdf"}
                  >
                    Last ned
                  </Link>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Financial model Folkekraft</p>
                    <p>Finansiell prognosemodell</p>
                  </div>
                  <Link
                    href="/doc/finansiell_prognosemodell.pdf"
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"finansiell_prognosemodell.pdf"}
                  >
                    Last ned
                  </Link>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Verdsettelsesmodell</p>
                    <p>Fremtidig verdsettelsesmodell</p>
                  </div>
                  <Link
                    href="/doc/verdsettelse.pdf"
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"verdsettelse.pdf"}
                  >
                    Last ned
                  </Link>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Folkekraft AS Årsrapport</p>
                    <p>Folkekraft AS_årsrapport 2023</p>
                  </div>
                  <Link
                    href="/doc/folkekraft_as_årsrapport_2023.pdf"
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"folkekraft_as_årsrapport_2023.pdf"}
                  >
                    Last ned
                  </Link>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Notat disput med Props</p>
                    <p>Notat om disput med IT-leverandør</p>
                  </div>
                  <Link
                    href="/doc/notat_disput_med_props.pdf"
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"notat_disput_med_props.pdf"}
                  >
                    Last ned
                  </Link>
                </div>
                <Separator />
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <p className="font-semibold">Reklamasjon Havskraft</p>
                    <p>Reklamasjon Havskraft</p>
                  </div>
                  <Link
                    href="/doc/reklamasjon_havskraft.pdf"
                    className="cursor-pointer underline"
                    target="_blank"
                    download={"reklamasjon_havskraft.pdf"}
                  >
                    Last ned
                  </Link>
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
