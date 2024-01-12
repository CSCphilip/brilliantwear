"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "_types";

export default function ShoppingAssistant() {
  const router = useRouter();

  return (
    <div className="mb-12">
      <div className="flex justify-between px-9 mt-5">
        <h2 className="font-inter mt-4 font-normal">Shopping Assistant</h2>
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="w-[70px] h-[70px]"
        />
      </div>
      <ShoppingAssistantForm router={router} />
      <ShoppingAssistantTextSuggestions router={router} />
    </div>
  );
}

function ShoppingAssistantForm({ router }: { router: any }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const userInputProductDescription = formData.get("user-query") as string;
    if (userInputProductDescription.length === 0) {
      return;
    }

    router.push(`/shopping-assistant?query=${userInputProductDescription}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative px-5 mt-4">
      <input
        type="text"
        placeholder="Seeking clothing ideas? Search here..."
        name="user-query"
        maxLength={250}
        className="bg-[#F4F4F4] border-2 border-[#F4F4F4] ps-2 py-4 w-full font-inter 
        placeholder-black custom-box-shadow focus:outline-none focus:border-2 focus:border-gray-400 pr-12"
        autoComplete="off"
      />
      <button type="submit" className="absolute top-0 right-0 mt-[13.5px] mr-7">
        <svg
          className="w-8 h-8 p-0.5 hover:bg-gray-200 rounded-md"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
              fill="#000000"
            ></path>
          </g>
        </svg>
      </button>
    </form>
  );
}

function ShoppingAssistantTextSuggestions({ router }: { router: any }) {
  function handleClick(query: string) {
    router.push(`/shopping-assistant?query=${query}`);
  }

  // NOTE: Hard coded text suggestions for now
  return (
    <div className="mt-6 px-5">
      <div className="bg-[#F4F4F4] custom-box-shadow font-inter text-md px-2 py-3 flex flex-wrap gap-2">
        <button
          onClick={() => handleClick("Formal shoes for a wedding")}
          className="flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Formal shoes for a wedding
        </button>
        <button
          onClick={() => handleClick("Shoes for hiking")}
          className="flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Shoes for hiking
        </button>
        <button
          onClick={() => handleClick("Dress for a dinner party")}
          className="flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Dress for a dinner party
        </button>
        <button
          onClick={() => handleClick("Blue t-shirt")}
          className="flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Blue t-shirt
        </button>
      </div>
    </div>
  );
}
