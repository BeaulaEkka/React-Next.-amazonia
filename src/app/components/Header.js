"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import { BsHeart } from "react-icons/bs";

const Header = () => {
  const { data: session } = useSession();
  console.log("session-Header", session);
  const { loading, cartItems, favouriteItems } = useSelector(
    (state) => state.cart
  );

  return (
    <header className="w-full md:text-sm">
      <nav className="flex justify-between items-center h-20 px-4 shadow-md bg-amazonia_blue text-white  w-full">
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
          <Link href="/">
            <h1 className="font-bold text-lg">
              amazonia<span className="text-sm font-normal">.nl</span>
            </h1>
          </Link>
        </div>
        {/*delivery*/}
        <div className=" px-2 border border-transparent hover:border-white cursor-pointer duration-300  items-center flex flex-row justify-center h-[70%] ">
          <div className=" w-fit hidden lg:block">
            <SlLocationPin />
          </div>
          <div className="px-2  text-sm">
            <p className="text-sm hidden lg:block">Deliver to</p>
            <p className="hidden lg:block">Netherlands</p>
          </div>
        </div>
        {/* searchbar */}
        <div className="flex-1 h-10  items-center justify-between relative hidden sm:block lg:block ">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full rounded-md px-4 placeholder:text-sm text-base text-black border"
          />
          <span className="h-full w-12 bg-amazonia_yellow hover:bg-orange-400 text-black text-2xl flex items-center justify-center absolute right-0 top-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>

        <div
          onClick={() => signIn()}
          className="px-4 border border-transparent hover:border-white cursor-pointer duration-300  flex-col items-left justify-left h-[70%] "
        >
          {session ? (
            <p className="text-sm">Hello, {session.user.name}</p>
          ) : (
            <p className="text-sm">Hello, sign in</p>
          )}

          <p className="text-lg font-bold hidden md:block">Account & Lists</p>
        </div>
        {/* </Link> */}
        {/* favourite */}
        <Link href="/favourites">
          <div className="relative px-4 border border-transparent hover:border-white cursor-pointer duration-300  flex-col items-left justify-left h-[70%] ">
            <div>
              <p className="text-sm hidden md:block">Orders</p>
              <p className="text-lg font-bold hidden md:block">& favourites</p>
            </div>
            <div className="relative  mt-4 ">
              <div className="md:hidden text-3xl  text-amazonia_yellow ">
                <BsHeart />
              </div>
              <div className="md:hidden absolute top-0 right-2">
                {favouriteItems.length > 0 ? (
                  <span className=" bg-orange-400 px-2 rounded-lg absolute top-0 right-3 font-bold">
                    {favouriteItems.length}
                  </span>
                ) : (
                  0
                )}
              </div>
            </div>
            <div className="hidden md:block">
              {favouriteItems.length > 0 ? (
                <span className="absolute top-0 right-12 font-bold text-amazonia_yellow">
                  {favouriteItems.length}
                </span>
              ) : (
                0
              )}
            </div>
          </div>
        </Link>

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
              <p className="hidden md:block">Shopping</p>
              <p className="font-bold hidden md:block">Basket</p>
            </div>
          </div>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
