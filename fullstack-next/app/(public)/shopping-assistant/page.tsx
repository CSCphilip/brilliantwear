"use client";

import ShoppingAssistantForm from "_components/ShoppingAssistantForm";
import { Product } from "_types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import ProductCard from "_components/ProductCard";

export default function ShoppingAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const searchParams = useSearchParams();
  const shoppingAssistantQuery = searchParams.get("query");

  useEffect(() => {
    if (shoppingAssistantQuery) {
      fetchSuggestedProducts(shoppingAssistantQuery);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const userInputProductDescription = formData.get("user-query") as string;
    fetchSuggestedProducts(userInputProductDescription);
  };

  const fetchSuggestedProducts = (query: string) => {
    const userInputData = {
      userInput: query,
    };

    setHasSearched(true);
    setIsLoading(true);

    fetch("http://localhost:3000/api/shopping-assistant", {
      method: "POST",
      body: JSON.stringify(userInputData),
    })
      .then((res) => res.json())
      .then((json) => {
        json.products && setSuggestedProducts(json.products);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="grow flex flex-col">
      <div className="grow flex flex-col items-center pb-4">
        <h2 className="text-center my-4 lg:my-6">Shopping Assistant</h2>
        <div className="w-full max-w-[600px]">
          <ShoppingAssistantForm
            handleSubmit={handleSubmit}
            urlQuery={shoppingAssistantQuery}
          />
        </div>
        <>
          {isLoading ? (
            <div className="mt-10 flex justify-center">
              <PropagateLoader color="#3B82F6" size={15} />
            </div>
          ) : suggestedProducts.length > 0 ? (
            <div className="mt-7 lg:mt-10 lg:px-4 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-10 gap-x-6 lg:gap-x-10">
              {suggestedProducts.length > 0 &&
                suggestedProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
            hasSearched && (
              <div className="mt-10 px-14 w-full max-w-[600px]">
                <p className="font-inter text-center bg-[#F4F4F4] border-4 border-primary p-4 rounded-lg">
                  No products could be suggested based on your input. Feel free
                  to try searching for something else to discover a personalized
                  selection of clothing products.
                </p>
              </div>
            )
          )}
        </>
      </div>
      <div className="text-sm lg:text-base font-inter text-center bg-[#F4F4F4] p-4 flex justify-center">
        <p className="max-w-[830px]">
          Discover your perfect look with our interactive shopping assistant.
          Whether you're seeking the latest trends or outfits for specific
          occasions, our assistant is here to guide you through a curated
          selection of clothing items tailored to your preferences. Let the
          shopping journey begin!
        </p>
      </div>
    </main>
  );
}
