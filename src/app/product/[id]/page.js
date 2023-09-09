"use client";
import AddToCart from "@/app/components/AddToCart";
import ProductRate from "@/app/components/ProductRate";
import { data } from "@/app/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({ params: { id } }) => {
  const product = data.products.find((x) => x.id === id);

  if (!product) {
    return <div>Product does not Exist</div>;
  }
  return (
    <div className="w-[80%] mx-auto">
      <div className="py-2">
        <Link href="/">Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>
              <ProductRate rate={product.rating} count={product.numReviews} />
            </li>
            <li>
              <hr className="my-3" />
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>€{product.price}</div>
            </div>
            <AddToCart product={product} redirect={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
