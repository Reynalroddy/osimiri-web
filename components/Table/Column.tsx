"use client";

import { usersData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<usersData>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "isActiveSub",
    header: "Subscription",
    cell: ({ row }) => {
      const res = row.getValue("isActiveSub");
      let answer = "";
      if (res === true) {
        answer = "Active";
      } else {
        answer = "Inactive";
      }
      return (
        <p className={`${res === true ? "text-green-500" : "text-red-500"}`}>
          {answer}
        </p>
      );
    },
  },
];
