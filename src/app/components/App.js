"use client";
import React, { useEffect } from "react";
import { CartSidebar } from "./CartSidebar";
import Header from "./Header";
import { hideLoading } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "./SubHeader";
import { Footer } from "./Footer";

const App = ({ children }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return (
    <div>
      <div className=" relative">
        <Header />
        <SubHeader />
        <main className="p-4">{children}</main>
      </div>
      <div className="absolute top-[7.5rem] right-0">
        {cartItems.length > 0 && <CartSidebar />}
      </div>
      <Footer />
    </div>
  );
};
export default App;
