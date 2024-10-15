import React from "react";

//Cookies
import {
  getCookieValue,
  validateSessionCookie,
  getUserId,
} from "@/lib/cookies";

//Axios
import axiosInstance, { setAuthorizationHeader } from "@/lib/axiosInstance";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

type Props = {};

const getTransactionsData = async () => {
  const userId = await getUserId();

  if (!userId) {
    return null;
  }

  await setAuthorizationHeader();

  const response = await axiosInstance.get(
    "/api/user/" + userId + "/transactions"
  );

  return response.data;
  try {
  } catch (error) {
    console.log(error);
  }
};

export default async function Transactions({}: Props) {
  const data = await getTransactionsData();
  return (
    <div>
      <h1>Transactions</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
