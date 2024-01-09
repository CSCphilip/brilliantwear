"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Product } from "_types";

export default function ShoppingAssistant() {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Show the loading spinner
    setLoading(true);
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const userInputProductDescription = formData.get(
      "product-description"
    ) as string;
    const userInputData = {
      userInput: userInputProductDescription,
    };
    fetch("http://localhost:3000/api/shopping-assistant", {
      method: "POST",
      body: JSON.stringify(userInputData),
    })
      .then((res) => res.json())
      .then((json) => {
        setSuggestedProducts(json);
        setHasSearched(true);
        // Hide the loading spinner
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="mb-16">
      <div className="flex justify-between px-9 mt-5">
        <h2 className="font-inter mt-4 font-normal">Shopping Assistant</h2>
        <img
          src="/icon-search-clothing.png"
          alt="Clothing search icon"
          className="w-[70px] h-[70px]"
        />
      </div>
      <ShoppingAssistantForm />
      <ShoppingAssistantTextSuggestions />
    </div>
  );
}

function ShoppingAssistantForm() {
  return (
    <form className="px-5 mt-4">
      {/* TODO: add handleSubmit */}
      <input
        type="text"
        placeholder="Seeking clothing ideas? Search here..."
        name="product-description"
        maxLength={250}
        className="bg-[#F4F4F4] border-2 border-[#F4F4F4] ps-2 py-4 w-full font-inter 
        placeholder-black custom-box-shadow focus:outline-none focus:border-2 focus:border-gray-400"
        autoComplete="off"
      />
    </form>
  );
}

function ShoppingAssistantTextSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/...") //TODO: add api endpoint
      .then((res) => res.json())
      .then((json) => {
        setSuggestions(json);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-6 px-5">
      <div className="bg-[#F4F4F4] custom-box-shadow font-inter text-md p-2 flex flex-wrap gap-2">
        <button className="py-1 px-2 rounded-lg border-2 border-black hover:underline">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </button>
        <button className="py-1 px-2 rounded-lg border-2 border-black hover:underline">
          aaaaaaa
        </button>
        <button className="py-1 px-2 rounded-lg border-2 border-black hover:underline">
          aaaaaaaaaaaaaaaaaaaa
        </button>
      </div>
    </div>
  );
}
