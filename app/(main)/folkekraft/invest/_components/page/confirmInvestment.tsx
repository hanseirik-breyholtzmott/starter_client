"use client";

import React, { useState } from "react";

//Nextjs
import { useRouter } from "next/navigation";

//Context
import { useInvestmentConfirmation } from "@/app/hooks/InvestmentConfirmationContext";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

//Magic
import confetti from "canvas-confetti";

type Props = {
  isFormValid: boolean;
  onSubmit: () => void;
};

export default function ConfirmInvestment({ isFormValid, onSubmit }: Props) {
  const router = useRouter();
  const { setInvestmentDetails } = useInvestmentConfirmation();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleConfirmInvestment = () => {
    setShowConfirmDialog(false);

    // Set the investment details in context
    setInvestmentDetails({
      purchasedShares: 100, // Replace with actual values from your form
      pricePerShare: 8,
      totalInvestment: 100 * 8,
      investorName: "John Doe", // Replace with actual values
      email: "john@example.com", // Replace with actual values
      companyName: "Company Name", // Replace with actual values
      companyCeo: "CEO Name", // Replace with actual values
    });

    onSubmit();
    handleConfetti();

    // Navigate to confirmation page
    router.push("/folkekraft/investment-confirmation");
  };

  return (
    <>
      <Button
        type="button"
        disabled={!isFormValid}
        className="w-full py-6 text-xl mt-6"
        onClick={() => setShowConfirmDialog(true)}
      >
        Bekreft investeringen
      </Button>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bekreft din investering</DialogTitle>
            <DialogDescription>
              Du er i ferd med å investere 100 aksjer for{" "}
              {(Number(100) * 8).toLocaleString("no-NO")} kr. Er du sikker på at
              du vil fortsette?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Avbryt
            </Button>
            <Button
              onClick={handleConfirmInvestment}
              className="bg-[#59C9B9] hover:bg-[#4BA89B]"
            >
              Bekreft investering
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
