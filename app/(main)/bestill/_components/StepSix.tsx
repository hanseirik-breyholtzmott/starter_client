import React, { useState, useEffect, useRef } from "react";

//Nextjs
import Link from "next/link";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { HelpCircle, Zap, X, User, Phone, Mail, House } from "lucide-react";

type Props = {
  form: UseFormReturn<any>;
  handleRefresh: (e: React.MouseEvent) => void;
};

export default function StepSix({}: Props) {
  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="w-full  space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between mb-6">
            <Progress value={100} className="w-full bg-[#59C9B9]" />
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            Velkommen til Folkekraft!
          </h2>
          <p className="text-gray-400">
            Om du har flere målepunkter, får det flere aksjer.
          </p>
        </div>

        {/* Form */}
        <div>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                Bestilling registrert!
                <span className="ml-2" role="img" aria-label="Party popper">
                  🎉
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Hva skjer nå?</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Vi sender deg også en bekreftelse på e-post.</li>
                  <li>
                    Grunnet at vi bytter våre IT-systemer, er du nå på
                    venteliste til vår relansering som skjer i midten av april.
                    Vi vil på relanseringsdatoen automatisk si opp din gamle
                    avtale på strømmåleren din.
                  </li>
                  <li>
                    Tilgang til Min Side og app får du etter relanseringen.
                  </li>
                  <li>
                    Aksjebevis blir formelt tildelt før neste oppdatering av
                    aksjonærregisteret.
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Har du spørsmål?</h2>
                <p>
                  Ikke nøl med å ta kontakt med oss på{" "}
                  <a
                    href="mailto:hei@folkekraft.no"
                    className="text-blue-600 hover:underline"
                  >
                    hei@folkekraft.no
                  </a>
                  .
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
