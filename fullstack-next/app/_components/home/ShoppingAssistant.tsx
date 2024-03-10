"use client";

import ShoppingAssistantForm from "_components/ShoppingAssistantForm";
import { useRouter } from "next/navigation";

export default function ShoppingAssistant() {
  const router = useRouter();

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
    <div className="mb-12 lg:mb-0 lg:flex lg:py-24">
      <div className="lg:w-1/3 flex justify-between px-9 mt-5 lg:px-0 lg:mt-0 lg:justify-center lg:items-center">
        <h2 className="font-interSansSerif mt-4 font-normal lg:mt-0">
          Shopping Assistant
        </h2>
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="w-[70px] h-[70px] lg:hidden"
        />
      </div>
      <div className="lg:w-1/3 lg:flex lg:flex-col lg:justify-center lg:items-center lg:pt-8 mt-4 lg:mt-0">
        <ShoppingAssistantForm handleSubmit={handleSubmit} />
        <ShoppingAssistantTextSuggestions router={router} />
      </div>
      <div className="hidden lg:flex lg:w-1/3 lg:justify-center lg:pt-8">
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="hidden lg:block w-[280px] h-[280px]"
        />
      </div>
    </div>
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
      <div className="bg-[#F4F4F4] custom-box-shadow font-interSansSerif text-md px-2 lg:px-3 lg:pb-8 py-3 flex flex-wrap gap-2">
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
          onClick={() => handleClick("Spring vibe T-shirt")}
          className="flex-grow py-1 px-2 rounded-lg border-2 border-black hover:bg-gray-200"
        >
          Spring vibe T-shirt
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
