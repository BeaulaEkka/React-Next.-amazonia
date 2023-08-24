"use client";
import { saveShippingAddress } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../components/CheckoutWizard";

const Page = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    router.push("/payment");
  };

  return (
    <div className="min-h-screen">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl font-bold">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-sm "
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fullName">Address</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-sm "
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter your Address",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fullName">City</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-sm "
            id="city"
            autoFocus
            {...register("city", {
              required: "Please enter your City",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fullName">Postal Code</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-sm "
            id="postalCode"
            autoFocus
            {...register("postalCode", {
              required: "Please enter your Postal Code",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fullName">Country</label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-sm "
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter your country",
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
