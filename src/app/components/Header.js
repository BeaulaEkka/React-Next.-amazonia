"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import Image from "next/image";

import { useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  console.log("status", status);
  const { loading, cartItems } = useSelector((state) => state.cart);

  return (
    <header className="w-full">
      <nav className="flex justify-between items-center h-20 px-4 shadow-md bg-amazonia_blue text-white  w-full">
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
          <Link href="/">
            <h1 className="font-bold text-lg">
              amazonia<span className="text-sm font-normal">.nl</span>
            </h1>
          </Link>
        </div>
        {/*delivery*/}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300  items-center justify-center h-[70%] hidden md:block lg:block">
          <SlLocationPin />
          <div className="px-2">
            <p>Deliver to</p>
            <p>Netherlands</p>
          </div>
        </div>
        {/* searchbar */}
        <div className="flex-1 h-10  items-center justify-between relative hidden md:block lg:block ">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full rounded-md px-4 placeholder:text-sm text-base text-black border"
          />
          <span className="h-full w-12 bg-amazonia_yellow text-black text-2xl flex items-center justify-center absolute right-0 top-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>

        {/* signin */}
        <Link href="/login">
          <div className="px-4 border border-transparent hover:border-white cursor-pointer duration-300  flex-col items-left justify-left h-[70%] hidden md:block lg:block">
            <p className="text-sm">Hello, {session?.user?.name}</p>
            <p className="text-lg font-bold">Account & Lists</p>
          </div>
        </Link>
        {/* favourite */}
        {/* <Link href="/favourites"> */}
        <div className="px-4 border border-transparent hover:border-white cursor-pointer duration-300  flex-col items-left justify-left h-[70%] hidden md:block lg:block">
          <p className="text-sm">Orders</p>
          <p className="text-lg font-bold">& Returns</p>
          {/* {favouriteData.length > 0 ? <span>{favouriteData.length}</span> : 0} */}
        </div>
        {/* </Link> */}

        <Link href="/cart">
          <div className="px-4 border border-transparent hover:border-white cursor-pointer duration-300 flex flex-row items-left justify-left h-[70%]">
            <div>
              <span className="cart-badge">
                {loading ? "" : cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
            <Image
              src="/images/cartIcon.png"
              alt="icon"
              width={40}
              height={40}
              className="w-full h-full px-2 mt-3"
            />

            <div>
              <p>Shopping</p>
              <p className="font-bold">Basket</p>
            </div>
          </div>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
