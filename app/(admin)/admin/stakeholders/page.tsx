"use client";

import { useEffect, useState } from "react";
import { Investors, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const capTableData = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Investor",
    shares: 2000000,
    ownership: 50,
    value: "$500,000",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Employee",
    shares: 1000000,
    ownership: 25,
    value: "$250,000",
  },
];

type Props = {};

const Page = (props: Props) => {
  const [data, setData] = useState<Investors[]>([]);

  useEffect(() => {
    setData(capTableData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
