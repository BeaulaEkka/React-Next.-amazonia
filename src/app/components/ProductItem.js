"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductRate from "./ProductRate";
import AddToCart from "./AddToCart";
// import { FaHeart } from "react-icons/fa";

const ProductItem = ({ product }) => {
  return (
    <div className="card relative overflow-hidden group">
      <div className="h-[25rem] ">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.name}
            className=" shadow object-contain w-full group scale-75 group-hover:scale-100 transition-transform"
          />
        </Link>
      </div>
      {/* <div className="w-10 h-12 absolute top-8 right-3  translate-x-20 group-hover:translate-x-0 transition-transform duration-300 ">
        <span
          // onClick={() => dispatch(addToFavourite({ id, category: category }))}
          className=" w-full h-full flex items-center justify-center text-xlbg-transparent  hover:bg-amazonia_yellow cursor-pointer duration-300 rounded-lg"
        >
          <AddToFavourite
            showQty={false}
            product={product}
            increasePerClick={true}
            redirect={false}
          />
          <FaHeart />
        </span>
      </div> */}
      <div className="flex flex-col items-left justify-center p-5 mt-5">
        <p className="text-sm capitalize text-gray-500">{product.category}</p>
        <Link href={`/product/${product.id}`}>
          <h2 className="font-bold text-lg">{product.name}</h2>
        </Link>
        <ProductRate rate={product.rating} count={product.numReviews} />
        <p className="mb-2">{product.brand}</p>
        <div className="absolute top-8 left-8 animate-bounce">
          {product.oldPrice && (
            <p className="text-amazonia_light italic font-semibold tracking-wide">
              Save! €{(product.oldPrice - product.price).toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex flex-row gap-4 mb-2">
          {product.oldPrice && (
            <p className="line-through text-gray-400">€{product.oldPrice}</p>
          )}
          <p className="font-bold">€{product.price}</p>
        </div>
        <AddToCart
          showQty={false}
          product={product}
          increasePerClick={true}
          redirect={false}
        />
      </div>
    </div>
  );
};

export default ProductItem;
