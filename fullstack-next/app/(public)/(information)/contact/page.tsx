"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFetch } from "_helpers/client/hooks";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // Another way to define fields instead as in the first input of the form below
  const fields = {
    lastName: register("lastName", {
      required: "Last name is required",
      maxLength: { value: 50, message: "Last name is too long" },
    }),
    email: register("email", {
      required: "Email is required",
      maxLength: { value: 50, message: "Email is too long" },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    }),
    message: register("message", {
      required: "Message is required",
      maxLength: { value: 1000, message: "Message is too long" },
    }),
  };

  const fetch = useFetch();

  async function onSubmit({ firstName, lastName, email, message }: any) {
    await fetch.post("https://www.brilliantwear.se/api/contact", {
      firstName,
      lastName,
      email,
      message,
    });
    setSubmitted(true);
  }

  return (
    <main className="grow px-5 bg-information-background bg-cover bg-center flex justify-center sm:items-center">
      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 py-5 sm:pb-8 px-5 sm:px-8 w-full h-fit max-w-[510px] bg-white rounded-sm shadow-lg"
        >
          <h2 className="text-center mb-1 lg:mb-2">Contact</h2>
          <p className="mb-6 text-center">
            If you have any questions or comments about our website, feel free
            to fill in this form. We&apos;d love to hear from you.
          </p>
          <label
            htmlFor="firstName"
            className="block font-medium text-gray-900 ms-0.5"
          >
            First Name
          </label>
          <input
            {...register("firstName", {
              required: "First name is required",
              maxLength: { value: 50, message: "First name is too long" },
            })}
            placeholder="Parker"
            className="block w-full p-2.5 text-sm bg-gray-50 text-gray-900 rounded-sm border border-gray-300 focus:border-amber-500 focus:outline-none"
          />
          <p className="text-red-600 pl-1 pt-1 mb-1">
            {errors.firstName?.message?.toString()}
          </p>

          <label
            htmlFor="lastName"
            className="block font-medium text-gray-900 ms-0.5"
          >
            Last Name
          </label>
          <input
            {...fields.lastName}
            placeholder="Jones"
            className="block w-full p-2.5 text-sm bg-gray-50 text-gray-900 rounded-sm border border-gray-300 focus:border-amber-500 focus:outline-none"
          />
          <p className="text-red-600 pl-1 pt-1 mb-1">
            {errors.lastName?.message?.toString()}
          </p>

          <label
            htmlFor="email"
            className="block font-medium text-gray-900 ms-0.5"
          >
            Email
          </label>
          <input
            {...fields.email}
            placeholder="parker.jones@brilliantwear.se"
            className="block w-full p-2.5 text-sm bg-gray-50 text-gray-900 rounded-sm border border-gray-300 focus:border-amber-500 focus:outline-none"
          />
          <p className="text-red-600 pl-1 pt-1 mb-1">
            {errors.email?.message?.toString()}
          </p>

          <label
            htmlFor="message"
            className="block font-medium text-gray-900 ms-0.5"
          >
            Your message
          </label>
          <textarea
            {...fields.message}
            placeholder="Message here..."
            rows={4}
            className="block w-full p-2.5 text-sm bg-gray-50 text-gray-900 rounded-sm border border-gray-300 focus:border-amber-500 focus:ring-0"
          />
          <p className="text-red-600 pl-1 pt-1">
            {errors.message?.message?.toString()}
          </p>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className="px-3 py-2 mt-4 sm:mt-7 bg-gray-100 rounded-sm border border-gray-300 hover:bg-gray-200 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="w-fit h-fit my-20 bg-gray-50 px-10 py-3 rounded-sm border-2 border-primary">
          <p className="mb-3 text-green-500">Form submitted successfully.</p>
          <p className="font-medium">Thank you for contacting us!</p>
        </div>
      )}
    </main>
  );
}
