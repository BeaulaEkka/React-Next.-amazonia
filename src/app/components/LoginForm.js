"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log("signIn response:", res);

      if (!email || !password) {
        setError(`Please provide a correct user name and a password`);
        console.log(
          `Please provide a correct user name and a password`,
          email,
          password,
          res
        );
        return null;
      }

      if (!email) {
        setError(`User not found for email: ${email}`);
        return null;
      }

      if (res.error) {
        setError(`Invalid Credentials: ${res.error.message}`);
        console.error("Authentication Error:", res.error);
        return;
      }
      setEmail("");
      setPassword("");

      // router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col  px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link href="/">
          {" "}
          <h1 className="font-bold text-3xl text-center">
            amazonia<span className="text-sm font-normal">.nl</span>{" "}
          </h1>{" "}
        </Link>
        <div className=" rounded-lg border border-gray-300 flex flex-col flex-1 p-8 mt-5">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={loginUser}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile phone number or e-mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Johndoe@gmail.com"
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      href="#"
                      className="font-semibold text-amazonia_light hover:text-amazonia_yellow"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={() => loginUser}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amazonia_yellow px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-amazonia_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
                {error && (
                  <div className="bg-red-500 text-sm text-white w-fit ml-2 mt-2 normal-case rounded-md px-2">
                    {error}
                  </div>
                )}
                <div className="mt-5 border-b-2 border-gray-200"></div>
                <div>
                  <button
                    onClick={() => signIn("github")}
                    className=" mt-5 flex w-full justify-center items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-md hover:bg-amazonia_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <div className="mr-3 text-xl">
                      <BsGithub />
                    </div>
                    <p>Login with GitHub</p>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => signIn("google")}
                    className=" mt-5 flex w-full justify-center items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm  hover:text-white font-semibold leading-6 text-black shadow-md hover:bg-amazonia_light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <div className="mr-3 text-xl">
                      <FcGoogle />
                    </div>

                    <p>Login with Google</p>
                  </button>
                </div>
              </div>
            </form>
            <div>
              <p className="mt-10 text-center text-sm text-gray-500">
                By continuing, you agree to Amazonia&apos;s Conditions of Use
                and Privacy Notice.
              </p>
            </div>
            <div className="mt-5">
              <Link
                href="/"
                className="flex justify-center font-semibold leading-6 text-amazonia_light hover:text-amazonia_yellow"
              >
                Need help?
              </Link>
            </div>
          </div>
        </div>
        <div className=" w-full mt-5 text-center flex flex-row justify-center gap-2 mx-auto ">
          <span className="border-b w-1/3 translate-y-[-.5rem] "></span>
          <p className="text-sm text-gray-400">New to Amazon?</p>
          <span className="border-b w-1/3 translate-y-[-.5rem] "></span>
        </div>
        <div className="  flex flex-col flex-1 p-8  g-2">
          <Link href="/register">
            <button className="flex w-full justify-center mt-3 rounded-md  bg-gray-100 text-black px-3 py-1.5 text-sm font-normals leading-6  shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
              Create your Amazonia account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
