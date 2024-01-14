"use client";

import { useRouter } from "next/navigation";

export default function ShoppingAssistant() {
  const router = useRouter();

  return (
    <div className="mb-12 lg:flex lg:mt-24 lg:mb-20">
      <div className="lg:w-1/3 flex justify-between px-9 mt-5 lg:px-0 lg:mt-0 lg:justify-center lg:items-center">
        <h2 className="font-inter mt-4 font-normal lg:mt-0 lg:pb-14">
          Shopping Assistant
        </h2>
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="w-[70px] h-[70px] lg:hidden"
        />
      </div>
      <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <ShoppingAssistantForm router={router} />
        <ShoppingAssistantTextSuggestions router={router} />
      </div>
      <div className="hidden lg:flex lg:w-1/3 lg:justify-center">
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="hidden lg:block w-[280px] h-[280px]"
        />
      </div>
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
    <form
      onSubmit={handleSubmit}
      className="relative px-5 mt-4 lg:px-0 lg:mt-0 lg:max-w-[600px] lg:w-full"
    >
      <input
        type="text"
        placeholder="Seeking clothing ideas? Search here..."
        name="user-query"
        maxLength={250}
        className="bg-[#F4F4F4] border-2 border-[#F4F4F4] ps-2 py-4 w-full font-inter 
        placeholder-black custom-box-shadow focus:outline-none focus:border-2 focus:border-gray-400 pr-12"
        autoComplete="off"
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

function ShoppingAssistantTextSuggestions({ router }: { router: any }) {
  function handleClick(query: string) {
    const queryString = encodeURIComponent(query);
    router.push(`/shopping-assistant?query=${queryString}`);
  }

  // NOTE: Hard coded text suggestions for now
  return (
    <div className="mt-6 px-5 lg:px-0 lg:max-w-[600px]">
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
          White t-shirt from Levi's
        </button>
        <button
          onClick={() => handleClick("Shorts for the beach")}
          className="hidden lg:block flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Shorts for the beach
        </button>
      </div>
    </div>
  );
}
