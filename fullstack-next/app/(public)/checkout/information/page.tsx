"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCheckout } from "_context";
import { useEffect } from "react";

export default function CheckoutInformation() {
  const { setEmail, toNextCheckoutStep, setCurrentCheckoutStepWithPath } =
    useCheckout();

  const pathname = usePathname();
  useEffect(() => {
    setCurrentCheckoutStepWithPath(pathname);
  }, []);

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    email: register("email", { required: "Email is required" }),
  };

  function onSubmit({ email }: any) {
    if (!errors.email) {
      setEmail(email);
      toNextCheckoutStep();
    }
  }

  return (
    <div className="grow w-screen pb-16 lg:pb-28 flex justify-center items-center">
      <div className="w-full px-2 flex flex-col items-center">
        <h3 className="my-7">Checkout</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[350px] flex flex-col"
        >
          <div className="w-full">
            <label className="pl-1 font-medium">Contact</label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                {...fields.email}
                type="email"
                placeholder="Email"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 ps-10 p-2.5 
              focus:outline-none focus:border-black"
              />
            </div>
            <p className="text-red-600 pl-1 pt-1">
              {errors.email?.message?.toString()}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-56 h-11 mt-7 pb-[1px] flex items-center justify-center rounded-full border border-transparent  
            bg-amber-400 hover:bg-amber-300 shadow-md"
            >
              Continue to shipping
            </button>
          </div>
        </form>
        <div className="w-full max-w-[350px] mt-10 px-5 flex items-center justify-between">
          <hr className="grow h-px border-0 bg-gray-700" />
          <p className="mx-4 pb-1 italic">OR:</p>
          <hr className="grow h-px border-0 bg-gray-700" />
        </div>
        <Link
          href="/"
          className="mt-7 font-medium text-blue-600 hover:underline"
        >
          Return to the shop
        </Link>
      </div>
    </div>
  );
}
