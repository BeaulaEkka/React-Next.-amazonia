"use client";

import { useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";
import DashboardContents from "../components/DashboardContents";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className=" w-[80%] mx-auto flex flex-col justify-center">
      <div className="flex flex-row justify-between items-center gap-11 ">
        <h1 className="font-bold text-2xl">Hi {session?.user?.name}</h1>
        <UserInfo />
      </div>
      <div>
        <DashboardContents />
      </div>
    </div>
  );
};

export default Page;
