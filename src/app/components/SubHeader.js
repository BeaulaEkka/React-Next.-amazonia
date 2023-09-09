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
      <div className="flex items-center flex-row gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <div>
          {" "}
          <LuMenu className="text-xl" />
        </div>
        <p>All</p>
      </div>
      <div className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <p>Best Sellers</p>
      </div>
      <div className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <p>Today&apos;s Deals</p>
      </div>
      <div className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <p>Gift Ideas</p>
      </div>
      <div className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <p>Prime</p>
      </div>
      <div>
        <p className="hidden md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          {session ? <p>Hello, {session.user.name}</p> : <p>sign in</p>}
        </p>
      </div>
      <div>
        <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Kindle Books
        </p>
      </div>
      <div>
        <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Gift Cards
        </p>
      </div>
      <div>
        <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Customer Service
        </p>
      </div>
      <div>
        <p className="hidden md:inline-flex items-center  h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
          Sell on Amazon
        </p>
      </div>
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
