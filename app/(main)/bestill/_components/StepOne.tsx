import React from "react";

//Nextjs
import Link from "next/link";

//Shadcn
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

//Form
import { UseFormReturn } from "react-hook-form";

//Icons
import { Zap, X } from "lucide-react";

type Props = {
  form: UseFormReturn<any>;
  handleRefresh: (e: React.MouseEvent) => void;
  referralUserName: string | null;
};

export default function StepOne({
  form,
  handleRefresh,
  referralUserName,
}: Props) {
  return (
    <div className="max-w-2xl w-full space-y-6 mx-auto">
      <div className="w-full space-y-6">
        <div className="text-center space-y-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="#" onClick={handleRefresh}>
              <X size={44} className="text-gray-400 cursor-pointer mr-4" />
            </Link>
            <Progress
              value={16}
              className="w-full bg-[#59C9B9]"
              color="#00263D"
            />
          </div>
          <h1 className="text-4xl font-bold flex items-center justify-center pt-6">
            <Zap className="mr-2" /> Folkekraft
          </h1>
          <p className="text-gray-400">
            Opplev medeierskap med Folkekraft - mer enn bare strøm.
          </p>
        </div>

        {/* Referral */}

        {referralUserName && (
          <Card className="transition-all duration-300">
            <CardContent className="text-left flex items-center justify-start p-6">
              <div>{`${referralUserName} vil at du blir en del av Folkekraft`}</div>
            </CardContent>
          </Card>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-600 mb-4 text-lg font-normal">
                Epost
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Epost . . ."
                  {...field}
                  className="mb-2 text-xl px-4 py-4 h-14 rounded-lg w-full"
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only email valid characters: letters, numbers, @, ., hyphen, underscore
                    const filteredValue = value.replace(
                      /[^a-zA-Z0-9@._-]/g,
                      ""
                    );
                    field.onChange(filteredValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
