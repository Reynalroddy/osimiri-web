import { columns } from "@/components/Table/Column";
import { DataTable } from "@/components/Table/data-table";
import React from "react";
import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "@/utils/axios";
import { authOptions } from "../api/authOption";
export default async function page() {
  const session = await getServerSession(authOptions);

  console.log("session", session);
  const getUsers = async () => {
    try {
      const authHeader = `Bearer ${session?.accessToken}`;

      const { data } = await axios.get("/user/get-users", {
        headers: {
          Authorization: authHeader,
        },
      });

      // const data = await res.json();
      console.log(data);
      return data.newUsers ?? [];
    } catch (error) {
      console.log("error => ", error);
    }
  };
  const data = await getUsers();
  if (!data) {
    return <div>loading..</div>;
  }
  // return JSON.stringify(session);
  return <DataTable columns={columns} data={data} />;
}
