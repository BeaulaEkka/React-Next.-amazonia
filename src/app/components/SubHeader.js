import { signOut } from "next-auth/react";
import { LuMenu } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SubHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

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
      <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        {session ? <p>Hello, {session.user.name}</p> : <p>sign in</p>}
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
      <div
        onClick={handleLogout}
        className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent text-amazonia_yellow hover:text-red-600 hover:border-red-600 cursor-pointer duration-300"
      >
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default SubHeader;
