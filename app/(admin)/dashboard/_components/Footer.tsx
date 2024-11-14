import React, { useState, useEffect } from "react";

type Props = {};

export default function Footer({}: Props) {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const companyName = process.env.NEXT_PUBLIC_COMPANY;
  const version = process.env.NEXT_PUBLIC_VERSION;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          &copy; {currentYear} {companyName}. All rights reserved.
        </div>
        <div className="text-xs text-gray-500">{version}</div>
      </div>
    </footer>
  );
}
