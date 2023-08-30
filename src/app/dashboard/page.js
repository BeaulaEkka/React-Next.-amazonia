"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";
const Page = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  return (
    <div>
      <p>Hi {session?.user.name}</p>
      <UserInfo />
    </div>
  );
};

export default Page;
