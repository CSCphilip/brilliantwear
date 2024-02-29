"use client";

import { useState, useEffect } from "react";

interface ProductTypesFilterProps {
  gender: "Woman" | "Man" | "Unisex" | "All";
  typeFilter: string;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  getProducts: (
    page?: number,
    typeFilter?: string,
    order?: string
  ) => Promise<void>;
}

export default function ProductTypesFilter({
  gender,
  typeFilter,
  setTypeFilter,
  order,
  getProducts,
}: ProductTypesFilterProps) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      `https://www.brilliantwear.se/api/products/types?genderTypeFilter=${gender}`
    ).then((res) => {
      res.json().then((data) => {
        console.log("test:", data);
        setTypes(data);
      });
    });
  }, []);

  function handleClick(type: string) {
    if (type === typeFilter) {
      setTypeFilter("All");
      getProducts(1, "All", order);
    } else {
      setTypeFilter(type);
      getProducts(1, type, order);
    }
  }

  return (
    <div className="overflow-x-scroll lg:px-1 mb-2">
      <ul className="flex">
        {types.map((type, index) => {
          return (
            <li
              key={index}
              className={`${index !== types.length - 1 && "me-2"}`}
            >
              <button
                className={`border border-black py-1 px-1.5 rounded-sm hover:bg-gray-200 ${
                  type === typeFilter && "bg-gray-200"
                }`}
                onClick={() => handleClick(type)}
              >
                {type}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
