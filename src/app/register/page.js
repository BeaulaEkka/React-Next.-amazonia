import React from "react";
import RegisterForm from "../components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return <RegisterForm />;
}