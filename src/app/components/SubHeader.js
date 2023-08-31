import { signOut } from "next-auth/react";
import { LuMenu } from "react-icons/lu";
import { useSession } from "next-auth/react";
import UserInfo from "../components/UserInfo";

const SubHeader = () => {
  const { data: session } = useSession();
  console.log("session", session);
  return (
    <div className="w-full h-10  bg-amazonia_light text-sm text-white px-4 flex flex-row items-center">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu className="text-xl" />
        All
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Best Sellers
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Today&apos;s Deals
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gift Ideas
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Prime
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        {session?.user.name
          ? `${session.user.name} Your Amazon.nl`
          : "Your Amazon.nl"}
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Kindle Books
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gift Cards
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Customer Service
      </p>
      <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell on Amazon
      </p>
      <p
        onClick={() => signOut()}
        className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent text-amazonia_yellow hover:text-red-600 hover:border-red-600 cursor-pointer duration-300"
      >
        Sign Out
      </p>
    </div>
  );
};

export default SubHeader;
