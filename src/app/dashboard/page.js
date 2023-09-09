"use client";

import { useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";
import DashboardContents from "../components/DashboardContents";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
