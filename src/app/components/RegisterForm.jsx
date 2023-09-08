"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const router = useRouter();

  useEffect(() => {
    // Clear success message after a few seconds
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/login");
        setSuccessMessage("Registration successful!"); // Set success message
        setError("");
      } else {
        console.log("User registration failed.", res.status);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("User registration failed.", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col  px-6 py-2 lg:px-8  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          {" "}
          <h1 className="font-bold text-3xl text-center">
            amazonia<span className="text-sm font-normal">.nl</span>{" "}
          </h1>{" "}
        </Link>
        <div className=" rounded-lg border border-gray-300 flex flex-col flex-1 p-8 mt-3">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create account
          </h2>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-[-.5rem]">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First and Last Name"
                />
              </div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {" "}
                Email
              </label>
              <div className="mt-[-.5rem]">
                <input
                  id="email"
                  name="email"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="littlelamb@gmail.com"
                />
              </div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {" "}
                Password
              </label>
              <div className="mt-[-.5rem]">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-4">
                <button
                  className="flex w-full justify-center rounded-md bg-amazonia_yellow px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amazonia_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="submit"
                >
                  Register
                </button>
              </div>
              {successMessage && (
                <div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <p className="mt-10 text-center text-sm text-gray-500">
                By creating an account you agree to Amazonia&apos;s Conditions
                of Use & Sale. Please see our Privacy Notice, our Cookies Notice
                and our Interest-Based Ads Notice.{" "}
              </p>
              <div className="mt-5 text-black">
                Already have an account?{" "}
                <span>
                  <Link href="/login" className="text-blue-700 hover:underline">
                    Sign in
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
