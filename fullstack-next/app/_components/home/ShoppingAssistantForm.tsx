"use client";

import { Product } from "_types";
import { useState } from "react";

export default function ShoppingAssistantForm() {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  // for react-spinners
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="What are you seeking?"
        name="product-description"
        maxLength={250}
        className="lg:w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
        required
      ></input>
      <button
        type="submit"
        className="mt-5 bg-blue-500 hover:bg-blue-400 text-white py-2 lg:py-3 px-8 lg:px-20 rounded"
      >
        Search
      </button>
    </form>
  );
}
