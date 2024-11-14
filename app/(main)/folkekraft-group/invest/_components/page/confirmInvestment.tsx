import React from "react";

//Shadcn
import { Button } from "@/components/ui/button";

//Magic
import confetti from "canvas-confetti";

type Props = {
  isFormValid: boolean;
  onSubmit: () => void;
};

export default function ConfirmInvestment({ isFormValid, onSubmit }: Props) {
  const handleClick = () => {
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

  const handleButtonClick = () => {
    if (onSubmit) {
      onSubmit();
    }

    handleClick();
  };

  return (
    <Button
      type="button"
      disabled={!isFormValid}
      className="w-full py-6 text-xl mt-6"
      onClick={handleButtonClick}
    >
      Bekreft investeringen
    </Button>
  );
}
