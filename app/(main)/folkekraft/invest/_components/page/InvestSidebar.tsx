"use client";

import React from "react";
import { useInvestment } from "@/app/hooks/InvestContext";

export default function InvestSidebar() {
  const { companyData, activePerks } = useInvestment();

  if (!companyData) {
    return <div>Loading sidebar data...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
      <div className="space-y-2">
        <p>
          <strong>Company Name:</strong> {companyData.companyName}
        </p>
        <p>
          <strong>CEO:</strong> {companyData.companyDetails.ceo}
        </p>
        <p>
          <strong>Share Price:</strong>{" "}
          {companyData.investmentDetails.sharePrice}
        </p>
        <p>
          <strong>Available Shares:</strong>{" "}
          {companyData.investmentDetails.availableShares}
        </p>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Perks</h3>
      <ul className="space-y-2">
        {activePerks.map((perk, index) => (
          <li key={index} className="border p-2 rounded">
            <p className="font-bold">{perk.title}</p>
            <p>{perk.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
