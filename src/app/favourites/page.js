"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "../components/AddToCart";
import ProductRate from "../components/ProductRate";
import { removeFromFavorite } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const dispatch = useDispatch();
  const favouriteItems = useSelector((state) => state.cart.favouriteItems);

  function truncateDescription(description, numSentences) {
    const sentences = description.split(/\.|\?|!/);
    const truncatedSentences = sentences.slice(0, numSentences);
    return truncatedSentences.join(". ") + ".";
  }

  const deleteFromfavouritehandler = (id) => {
    dispatch(removeFromFavorite(id));
  };

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="w-[80%] mx-auto min-h-screen">
      {" "}
      <h1 className="text-2xl font-bold mb-5 mt-3">Favorite Items</h1>
      <div className=" flex flex-col space-y-3 ">
        {favouriteItems.length > 0 ? (
          favouriteItems.map((product) => (
            <div
              key={product.id}
              className="p-5 border border-gray-200 rounded-md flex flex-col  md:flex-row shadow-md  justify-center items-center md:justify-between "
            >
              <div className="w-[25%]  flex justify-center items-center">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image}
                    width={230}
                    height={230}
                    alt={product.name}
                    className="object-contain cursor-pointer  "
                  />
                </Link>
              </div>

              <div className="flex flex-col items-left justify-center w-[50%] ">
                <p className="text-sm capitalize text-gray-500">
                  {product.category}
                </p>

                <Link href={`/product/${product.id}`}>
                  <h2 className="font-bold text-lg">{product.name}</h2>
                </Link>
                <div className="text-sm text-green-900 lg:block hidden">
                  {truncateDescription(product.description, 2)}
                </div>

                <ProductRate rate={product.rating} count={product.numReviews} />
                <p className="mb-2">{product.brand}</p>

                <div className="flex flex-row gap-4 mb-2">
                  {product.oldPrice && (
                    <p className="line-through text-gray-400">
                      €{product.oldPrice}
                    </p>
                  )}
                  <p className="font-bold">€{product.price}</p>
                </div>
              </div>
              <div className=" flex flex-col justify-center items-end gap-3 mr-8 text-center font-semibold">
                <div className="w-full">
                  <AddToCart
                    showQty={false}
                    product={product}
                    increasePerClick={true}
                    redirect={false}
                  />
                </div>
                <div className="primary-button w-full">
                  <button
                    onClick={() => deleteFromfavouritehandler(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite items yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
