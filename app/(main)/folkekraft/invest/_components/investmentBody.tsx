import React from "react";

//Components
import Terms from "./page/terms";
import Addons from "./page/addons";
import InvestmentAmount from "./page/investmentAmount";

//Form
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

// Interface for individual perk
interface Perk {
  title: string;
  value: number;
  description: string;
}

interface InvestmentDetails {
  investmentMinimum: number;
  investmentMaximum: number;
  investmentRecommendation: number;
  investmentPurchaseRight: number;
}

type Props = {
  form: UseFormReturn<any>;
  shareNumber: string;
  onShareNumberChange: (value: string) => void;
  activePerks: Perk[];
  entityType: string;
  setEntityType: (value: string) => void;
  idNumber: string;
  setIdNumber: (value: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
  isFormValid: boolean;
  onSubmit: (values: any) => void;
  investmentDetails: InvestmentDetails;
};

export default function InvestmentBody({
  form,
  shareNumber,
  onShareNumberChange,
  activePerks,
  entityType,
  setEntityType,
  idNumber,
  setIdNumber,
  termsAccepted,
  setTermsAccepted,
  isFormValid,
  onSubmit,
  investmentDetails,
}: Props) {
  const handleSubmit = (values: any) => {
    console.log("InvestmentBody handleSubmit called");
    console.log(values.terms);
  };
  return (
    <div className="w-full md:w-2/3 mb-40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-44"
        >
          <InvestmentAmount
            form={form}
            shareNumber={shareNumber}
            onShareNumberChange={onShareNumberChange}
            activePerks={activePerks}
            entityType={entityType}
            setEntityType={setEntityType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            investmentDetails={investmentDetails}
          />
          <Addons activePerks={activePerks} />
          <Terms
            form={form}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            isFormValid={isFormValid}
            onSubmit={() => onSubmit(form.getValues())}
          />
        </form>
      </Form>
    </div>
  );
}
