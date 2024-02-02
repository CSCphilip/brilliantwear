"use client";

import { get } from "http";
import { useState } from "react";

//TODO: make this a dropdown menu and change the displayed text to the selected order

interface ProductOrdersDropdownProps {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<string>>;
  typeFilter: string;
  getProducts: (
    page?: number,
    typeFilter?: string,
    order?: string
  ) => Promise<void>;
}

export default function ProductOrdersDropdown({
  order,
  setOrder,
  typeFilter,
  getProducts,
}: ProductOrdersDropdownProps) {
  const [orders, _] = useState<string[]>([
    "latest",
    "oldest",
    "priceAsc",
    "priceDesc",
  ]);

  function handleClick(newOrder: string) {
    setOrder(newOrder);
    getProducts(1, typeFilter, newOrder);
  }

  return (
    <div className="overflow-x-scroll lg:px-1 mb-2">
      <ul className="flex">
        {orders.map((orderLocal, index) => {
          return (
            <li
              key={index}
              className={`${index !== orders.length - 1 && "me-2"}`}
            >
              <button
                className={`border border-black py-1 px-1.5 rounded-sm hover:bg-gray-200 ${
                  orderLocal === order && "bg-gray-200"
                }`}
                onClick={() => handleClick(orderLocal)}
              >
                {orderLocal}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
