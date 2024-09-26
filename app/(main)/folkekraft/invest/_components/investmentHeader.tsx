import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function InvestmentHeader({ title, description }: Props) {
  return (
    <header className="flex flex-col justify-start mb-8">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-lg mr-2"></div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <p className="text-lg">{description}</p>
    </header>
  );
}
