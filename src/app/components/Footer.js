import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="bg-amazonia_blue w-full  py-8 text-gray-300 flex flex-col items-center justify-center gap-4">
      <div className="align-middle flex items-center text-center">
        <Link href="/">
          <h1 className="font-bold text-lg text-white px-2">
            amazonia<span className="text-sm font-normal">.nl</span>
          </h1>
        </Link>
      </div>
      <p>All Rights Reserved</p>
      <Link
        href="https://beaula.vercel.app/"
        className="hover:text-gray-400 hover:underline "
        target="_blank"
      >
        <p>https://beaula.vercel.app/</p>
      </Link>
    </div>
  );
};
