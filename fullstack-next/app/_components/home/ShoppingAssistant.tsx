"use client";

import { CSSProperties, useState } from "react";
import { BarLoader } from "react-spinners";

import { Product } from "_types";
import ShoppingAssistantForm from "./ShoppingAssistantForm";
import ProductCard from "_components/ProductCard";

const overrideCSS: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "50px",
  marginBottom: "50px",
};

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
    fetch("https://brilliantwear.se/api/shopping-assistant", {
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
    <div className="mt-1 w-screen flex flex-col items-center">
      <div className="flex flex-col items-center justify-center border border-black container bg-home-shopping-assistant h-48">
        <ShoppingAssistantForm handleSubmit={handleSubmit} />
      </div>

      <BarLoader
        aria-label="BarLoader"
        data-testid="loader"
        loading={loading}
        color="blue"
        width={300}
        cssOverride={overrideCSS}
      />
      {suggestedProducts.length > 0 ? (
        <>
          <h3 className="mt-4">Suggested Products</h3>
          <div className="container grid gap-y-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-2">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      ) : (
        hasSearched && (
          <p className="text-center w-1/2 my-3 p-2 bg-slate-300 rounded-lg">
            No products could be suggested. Try searching for something else.
          </p>
        )
      )}
    </div>
  );
}
