import React from "react";

//Nextjs
import Image from "next/image";

//Shadcn
import { Separator } from "@/components/ui/separator";

//Components
import PerksCard from "../perksCard";

type Props = {};

export default function Team({}: Props) {
  return (
    <div className=" py-8 mt-6 flex">
      {/* Main content area */}
      <div className="flex-grow flex md:flex-row gap-8 flex-col-reverse w-full">
        <div className="h-full flex flex-col gap-10 w-full text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Team</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </span>
            <Separator className="max-w-[200px] mx-auto h-[2px] bg-blue-600 mt-4" />
          </div>
          <div className="w-full flex lg:flex-row flex-col gap-10 justify-evenly">
            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/1c66qeb7SCm5DEQjjbqgux84eWln59LNpt0zoXOyqZTfrQsb"
                  }
                  alt="Krishan"
                  width={160}
                  height={160}
                />
              </div>
              <h2 className="text-xl font-semibold mt-2">Krishan</h2>
              <p className="text-gray-600">Interim Daglig leder</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/1c66qeb7SCm5WzMe6W7GXeyrAJp6MRFLHSIvDUfYTGm3kxq4"
                  }
                  alt="Hans-Eirik"
                  width={160}
                  height={160}
                />
              </div>

              <h2 className="text-xl font-semibold mt-2">Hans-Eirik</h2>
              <p className="text-gray-600">Driftsansvarlig</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[160px] w-[160px] rounded-lg bg-blue-600 overflow-hidden">
                <Image
                  src={
                    "https://utfs.io/f/1c66qeb7SCm5WzkUiPGXeyrAJp6MRFLHSIvDUfYTGm3kxq41"
                  }
                  alt="Lasse"
                  width={160}
                  height={160}
                />
              </div>

              <h2 className="text-xl font-semibold mt-2">Lasse</h2>
              <p className="text-gray-600">Salgsansvarlig</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="h-[80px] w-[80px] rounded-lg bg-blue-600"></div>

              <h2 className="text-xl font-semibold mt-2">Name</h2>
              <p className="text-gray-600">role</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 max-w-[320px]">
          <PerksCard
            title="Bli Folkekraft kunde"
            actionText="Du vil få i aksjer"
            boldText="1 000kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Bli kunde", link: "#" }}
          />
          <PerksCard
            title="Verv Folkekraft"
            actionText="Du vil få i aksjer"
            boldText="300kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Kopier verve lenke", link: "#" }}
          />
          <PerksCard
            title="Investor tilbud"
            actionText="Investerer du mer enn"
            boldText="10.000kr"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                voluptas vitae incidunt."
            button={{ text: "Kopier verve lenke", link: "#" }}
          />
        </div>
      </div>
    </div>
  );
}
