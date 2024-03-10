"use client";

import { useState } from "react";

export default function ShoppingAssistantForm({
  handleSubmit,
  urlQuery,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  urlQuery?: string | null;
}) {
  const [inputValue, setInputValue] = useState<string>(urlQuery || "");

  return (
    <form
      className="relative px-5 lg:px-0 lg:mt-0 lg:max-w-[600px] w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Seeking clothing ideas? Search here..."
        name="user-query"
        maxLength={250}
        className="bg-[#F4F4F4] border-2 border-[#F4F4F4] ps-2 lg:ps-[14px] py-4 w-full font-interSansSerif 
        placeholder-black custom-box-shadow focus:outline-none focus:border-2 focus:border-gray-400 pr-12"
        autoComplete="off"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 mt-[13.5px] mr-7 lg:mr-3"
      >
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
