"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";

//Shadcn
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

//Axios
import axiosInstance from "@/lib/axiosInstance";

//Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  ssn: z.string(),
  address: z.string(),
  postalCode: z.string(),
  city: z.string(),
  email: z.string().email(),
});

type Props = {
  referralUserName: string | null;
  referralUserId: string | null;
};

export default function FormLayout({
  referralUserName,
  referralUserId,
}: Props) {
  //Constants
  const totalSteps = 6;

  //useState
  const [step, setStep] = useState<number>(1);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      ssn: "",
      address: "",
      postalCode: "",
      city: "",
      email: "",
    },
  });
  const formValues = useWatch({ control: form.control });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const submitValues = {
        ...values,
        referralUserName: referralUserName,
        referralUserId: referralUserId,
      };

      const response = await axiosInstance.post("/newContract", submitValues);

      if (response.data.success) {
        if (step === 5) {
          handleNext();
        }
      } else {
        // Handle case where the API returns a non-success response
        console.log("API returned non-success response:", response.data);
        // You might want to set an error state or show a message to the user here
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This is an Axios error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("API error response:", error.response.data);
          console.log("Status code:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error setting up request:", error.message);
        }
      } else {
        // This is not an Axios error
        console.log("Non-Axios error:");
      }
      // You might want to set an error state or show a message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  //useEffect
  useEffect(() => {
    setIsValid(isStepValid());
  }, [formValues, step]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //Functions
  const handleNext = () => {
    if (step < totalSteps) setStep((prev) => prev + 1);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  //Steps validation
  const isStepValid = () => {
    const formValues = form.getValues();
    //Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isNameValid = (name: string) => !!name && name.trim().length > 2;
    const phoneRegex = /^\+\d{10}$/;
    const ssnRegex = /^\d{11}$/;
    //Steps
    switch (step) {
      case 1:
        return emailRegex.test(formValues.email);
      case 2:
        return true;
      case 3:
        return (
          isNameValid(formValues.firstName) &&
          isNameValid(formValues.lastName) &&
          phoneRegex.test(formValues.phone) &&
          ssnRegex.test(formValues.ssn)
        );
      case 4:
        return (
          !!formValues.address && !!formValues.postalCode && !!formValues.city
        );
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            form={form}
            handleRefresh={handleRefresh}
            referralUserName={referralUserName}
          />
        );
      case 2:
        return <StepTwo form={form} handleRefresh={handleRefresh} />;
      case 3:
        return <StepThree form={form} handleRefresh={handleRefresh} />;
      case 4:
        return <StepFour form={form} handleRefresh={handleRefresh} />;
      case 5:
        return (
          <StepFive
            form={form}
            handleRefresh={handleRefresh}
            formValues={form.getValues()}
          />
        );
      case 6:
        return <StepSix form={form} handleRefresh={handleRefresh} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="static w-full flex flex-col justify-center items-center"
        >
          <div className="p-8 w-full">{renderStep()}</div>
        </form>
      </Form>
      <div className="w-full fixed bottom-0 bg-[#00263D] flex items-center justify-center p-4 border-t-2 border-gray-400">
        <div className="container max-w-[930px] mx-auto flex justify-end w-full">
          {step < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="w-full max-w-[360px] bg-white text-[#00263D] hover:bg-gray-200 text-lg h-16"
              disabled={!isValid}
            >
              Neste
            </Button>
          ) : step === 5 ? (
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full max-w-[360px] bg-white text-[#00263D] hover:bg-gray-200 text-lg h-16"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sender..." : "Bekreft"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
