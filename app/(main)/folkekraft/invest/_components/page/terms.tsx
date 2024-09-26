import React from "react";

//Shadcn
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

//Components
import ConfirmInvestment from "./confirmInvestment";

//Form
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

type Props = {
  form: UseFormReturn<any>;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  isFormValid: boolean;
  onSubmit: () => void;
};

//Data
const terms = [
  {
    id: 1,
    text: "Investering i unoterte aksjer innebærer høy risiko. Det er viktig at jeg som investor leser investeringstilbudet nøye og gjør meg egen formening om hvilken risiko den eventuelle investeringen innebærer for meg. ",
    link: null,
  },
  {
    id: 2,
    text: "Jeg gir med dette min fullmakt til styreleder i utsteder til å tegne aksjer på mine vegne under fremsatte vilkår i forbindelse med vedtak om kapitalutvidelse i selskapets generalforsamling",
    link: null,
  },
  {
    id: 3,
    text: "Jeg bekrefter at jeg har satt meg inn i investeringstilbudet, og aksepterer risikoen denne investeringen innebærer.",
    link: null,
  },
  {
    id: 4,
    text: "Alle økonomiske bidrag må overholde gjeldende lover, inkludert regler om hvitvasking av penger. Midler fra ulovlige aktiviteter vil bli avvist. Vi forbeholder oss retten til å returnere midler som mistenkes for å bryte disse reglene.",
    link: null,
  },
];

export default function Terms({
  form,
  termsAccepted,
  setTermsAccepted,
  isFormValid,
  onSubmit,
}: Props) {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-2">Vilkår</h2>
      <Card className="mt-8 rounded-xl">
        <CardContent className="pt-6">
          <ul className="space-y-4">
            {terms.map((term) => (
              <li key={term.id} className="text-sm p-2 rounded-lg">
                {term.text.split(term.link || "").map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 font-normal"
                      >
                        {term.link}
                      </Button>
                    )}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </CardContent>
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <CardFooter className="bg-slate-100 hover:bg-slate-200 cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-start">
            <div className="flex items-center pt-6">
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          setTermsAccepted(checked as boolean);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <label htmlFor="terms">Jeg aksepterer vilkårene</label>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardFooter>
        </label>
      </Card>
      <div>
        <ConfirmInvestment isFormValid={isFormValid} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
