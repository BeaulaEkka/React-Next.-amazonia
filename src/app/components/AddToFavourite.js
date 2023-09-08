import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite } from "@/redux/slices/cartSlice";
import { FaHeart } from "react-icons/fa";

export default function AddToFavourite({ product }) {
  const dispatch = useDispatch();
  const { favouriteItems } = useSelector((state) => state.cart);
  console.log("favouriteItems", favouriteItems);

  const addToFavouriteHandler = () => {
    // Check if the product already exists in favorites
    const existItem = favouriteItems.find((x) => x.id === product.id);

    // If it exists, you might want to show a message or handle it accordingly
    if (existItem) {
      console.log("Product already in favorites");
    } else {
      // Dispatch the action to add the product to favorites
      dispatch(addToFavourite({ ...product }));
    }
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        {/* This part is not clear in your code.
         * It seems you intended to render an option, but 'x' is not defined here.
         * You might want to clarify what you intend to do in this section.
         */}
      </div>

      <div>
        <button
          className="primary-button w-full"
          onClick={addToFavouriteHandler}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
}
