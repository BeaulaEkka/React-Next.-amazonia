"use client";
import React, { useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
    shippingAddress,
    paymentMethod,
    loading,
  } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  return (
    <div className="w-[80%] mx-auto">
      {" "}
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 font-bold">Place Order</h1>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length === 0 ? (
        <div>
          cart is Empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-y-5 gap-x-4 ">
          <div className="overflow-x-auto md:col-span-3 ">
            <div className="card overflow-x-auto p-5 ">
              <h2 className="mb-2  text-lg font-semibold">Shipping Address</h2>
              {shippingAddress.fullName}, {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.country}
              <div>
                <Link
                  className="default-button inline-block mt-2"
                  href="shipping"
                >
                  Edit
                </Link>
              </div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2  text-lg font-semibold">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div>
                <Link
                  className="default-button inline-block mt-2"
                  href="/payment"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotals</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr className="border-b" key={item.id}>
                      <td>
                        <Link
                          href={`/product/${item.id}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{ maxWidth: "100%", height: "auto" }}
                            className="p-1"
                          />
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.qty}</td>
                      <td className="p-5 text-right">{item.price}</td>
                      <td className="p-5 text-right">
                        €{parseFloat(item.qty) * parseFloat(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="default-button inline-block mt-2" href="/cart">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div className="card p-5 h-80 ">
            <h2 className="mb-8 text-lg font-semibold">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>€{itemsPrice}</div>
                </div>
              </li>
              <li>
                {" "}
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>€{taxPrice}</div>
                </div>
              </li>
              <li>
                {" "}
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>€{shippingPrice}</div>
                </div>
              </li>
              <li>
                {" "}
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>€{totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-full mt-2"
                  onClick={() => alert("Not implemented")}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
