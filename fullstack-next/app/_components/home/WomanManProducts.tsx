"use client";

import ProductCard from "_components/ProductCard";
import { Product } from "_types";
import { formatCurrency } from "_utilities";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

const NO_PRODUCTS = 20;

export default function WomanManProducts() {
  const [womanProducts, setWomanProducts] = useState<Product[] | null>(null);
  const [manProducts, setManProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/woman?shuffle=true")
      .then((res) => res.json())
      .then((json) => {
        setWomanProducts(json.products.slice(0, NO_PRODUCTS));
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:3000/api/products/man?shuffle=true")
      .then((res) => res.json())
      .then((json) => {
        setManProducts(json.products.slice(0, NO_PRODUCTS));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#f1f1f1] py-7">
      <HorizontalScrollableList products={womanProducts} gender="Woman" />
      <span className="block h-2 lg:h-5" />
      <HorizontalScrollableList products={manProducts} gender="Man" />
    </div>
  );
}

function HorizontalScrollableList({
  products,
  gender,
}: {
  products: Product[] | null;
  gender: string;
}) {
  const containerRef = useRef<HTMLInputElement>(null);

  const handleScroll = (scrollAmount: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div
      className={`lg:flex lg:items-center ${
        gender === "Man" && "lg:flex-row-reverse"
      }`}
    >
      <h2
        className={`font-inter font-normal lg:text-5xl ms-6 lg:ms-0 lg:px-14 lg:pb-14 ${
          gender === "Man" && "lg:px-[100px]"
        }`}
      >
        {gender}
      </h2>
      <div className="grow flex mt-1 lg:overflow-x-auto">
        {/* NOTE: You can use 'scrollbar-hide' here to hide scrollbar */}
        <div
          ref={containerRef}
          className={`grow flex overflow-x-auto ps-16 lg:ps-0 lg:snap-x lg:scroll-smooth ${
            gender === "Man" && "lg:flex-row-reverse"
          }`}
        >
          {products ? (
            <>
              {products
                .filter((product) => {
                  const { gender } = product;
                  if (gender !== "Unisex") {
                    return product;
                  }
                })
                .map((product, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        gender === "Man" ? "lg:snap-end" : "lg:snap-start"
                      }`}
                    >
                      <ProductCard
                        product={product}
                        smallCardSizeStyle={{ height: "h-64", width: "w-44" }}
                        mediumCardSizeStyle={{
                          height: "lg:h-96",
                          width: "lg:w-[270px]",
                        }}
                        largeCardSizeStyle={{ height: "", width: "" }}
                        customOuterDivStyle={`w-max me-6 ${
                          product.gender === "Man"
                            ? "lg:me-0 lg:ms-10"
                            : "lg:me-10"
                        } mb-2 lg:mb-3`}
                      />
                    </div>
                  );
                })}
            </>
          ) : (
            <div className="h-[300px] lg:h-[430px]" />
          )}
        </div>
      </div>
      <div className="hidden lg:block lg:mx-4 lg:pb-6">
        <button onClick={() => handleScroll(500)}>
          <svg
            className={`lg:w-14 lg:h-12 ${gender === "Man" && "lg:hidden"}`}
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
                d="M4 12H20M20 12L16 8M20 12L16 16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
        <button onClick={() => handleScroll(-500)}>
          <svg
            className={`lg:w-14 lg:h-12 ${gender === "Woman" && "lg:hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M4 12H20M20 12L16 8M20 12L16 16"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
