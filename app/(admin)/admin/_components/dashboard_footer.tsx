import React from "react";

type Props = {};

const DashboardFooter = (props: Props) => {
  return (
    <footer className="w-full py-4 hidden md:flex flex-row justify-between">
      <p>
        &#64; {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COMPANY_NAME}.
        All rights reserved.
      </p>
      <p>Version 1.0.0 | Updated: 2024-08-18</p>
    </footer>
  );
};

export default DashboardFooter;
