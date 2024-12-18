import React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

type Props = {};

export default function FundingAlert({}: Props) {
  return (
    <Alert className="mb-8 bg-muted/50 transition-all duration-300 ease-in-out hover:shadow-lg">
      <AlertDescription className="flex gap-2 text-muted-foreground">
        <Info className="h-5 w-5 shrink-0" />
        Verdsettelsen er pre-money og baserer seg på en nedprising fra kr 12 til
        kr 8 per aksje i forbindelse med emisjonen. Dette fører til en justering
        av verdien fra 32,5 millioner kr til 21,7 mill. kr. Fremtidig
        verdsettelse vil bli beregnet basert på multippelanalyse av både
        omsetning og EBITDA, som reflekterer selskapets vekstpotensial og
        lønnsomhet.
      </AlertDescription>
    </Alert>
  );
}
