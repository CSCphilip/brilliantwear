"use client";

// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import Link from "next/link";
import { useForm } from "react-hook-form";

import { useUserService } from "_services";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Login />
    </Suspense>
  );
}

function Login() {
  const userService = useUserService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    username: register("username", { required: "Username is required" }),
    password: register("password", { required: "Password is required" }),
  };

  async function onSubmit({ username, password }: any) {
    await userService.login(username, password);
  }

  return (
    <main className="flex-grow bg-neutral-100">
      <div className="flex flex-col items-center">
        <h1 className="mt-10">Login</h1>
        <div className="border border-black rounded-lg mt-10 mb-10 py-5 px-12 bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              <li>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    {...fields.username}
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                  <p>{errors.username?.message?.toString()}</p>
                </div>
              </li>
              <li>
                <div className="mb-2">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    {...fields.password}
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                  />
                  <p>{errors.password?.message?.toString()}</p>
                </div>
              </li>
              <li className="flex justify-center my-5">
                <button
                  disabled={formState.isSubmitting}
                  className="py-2 px-5 bg-gray-600 hover:bg-gray-500 rounded text-white"
                  type="submit"
                >
                  {formState.isSubmitting && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 me-[1px] text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
                  Log in
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </main>
  );
}

function LoginFallback() {
  return <div>Loading...</div>;
}
