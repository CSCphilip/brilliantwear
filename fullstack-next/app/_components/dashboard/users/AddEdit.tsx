"use client";

// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAlertService, useUserService } from "_services";

export default function AddEdit({
  title,
  user,
}: {
  title: string;
  user?: any;
}) {
  const router = useRouter();
  const alertService = useAlertService();
  const userService = useUserService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: user,
  });
  const { errors } = formState;

  const fields = {
    firstName: register("firstName", { required: "First name is required" }),
    lastName: register("lastName", { required: "Last name is required" }),
    username: register("username", { required: "Username is required" }),
    password: register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    }),
  };

  async function onSubmit(data: any) {
    alertService.clear();
    try {
      // create or update user based on user prop
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = "User updated";
      } else {
        await userService.create(data);
        message = "User added";
      }

      // redirect to user list with success message
      router.push("/dashboard/users");
      alertService.success(message, true);
    } catch (error: any) {
      alertService.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h1>{title}</h1>
      <div className="mt-4 sm:flex sm:flex-col">
        <div className="mb-4 sm:flex">
          <div className="mb-4 sm:mb-0">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="first-name"
            >
              First name
            </label>
            <input
              {...fields.firstName}
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="First name"
            />
            <p className="text-red-500 mt-1">
              {errors.firstName?.message?.toString()}
            </p>
          </div>
          <div className="sm:ms-10">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="last-name"
            >
              Last name
            </label>
            <input
              {...fields.lastName}
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Last name"
            />
            <p className="text-red-500 mt-1">
              {errors.lastName?.message?.toString()}
            </p>
          </div>
        </div>
        <div className="sm:flex">
          <div className="mb-4 sm:mb-0">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              {...fields.username}
              type="text"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
            <p className="text-red-500 mt-1">
              {errors.username?.message?.toString()}
            </p>
          </div>
          <div className="sm:ms-10">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
              {user && <em> (enter password to save)</em>}
            </label>
            <input
              {...fields.password}
              type="password"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="******************"
            />
            <p className="text-red-500 mt-1">
              {errors.password?.message?.toString()}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-10 flex">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="py-2 px-5 bg-blue-600 hover:bg-blue-500 rounded text-white"
        >
          {formState.isSubmitting && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
              <span className="sr-only">Loading...</span>
            </div>
          )}
          Save
        </button>
        <button
          onClick={() => reset()}
          type="button"
          disabled={formState.isSubmitting}
          className="py-2 px-5 ms-2 bg-green-600 hover:bg-green-500 rounded text-white"
        >
          Reset
        </button>
        <div className="flex items-center">
          <Link
            href="/dashboard/users"
            className="py-[2px] px-3 ms-5 bg-gray-300 hover:bg-gray-200 rounded border border-black"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
