"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { API_URL } from "./ProfileFormData";

type Body = {
  password: string;
  newPassword: string;
};

export const change = async (body: Body) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const data = await fetch(`${API_URL}/auth/password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    body: body,
  }).then((r) => r.json());

  console.log(data);
};
