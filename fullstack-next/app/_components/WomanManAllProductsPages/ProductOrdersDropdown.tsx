"use client";

import { Dropdown } from "flowbite-react";

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
  const customTheme = {
    inlineWrapper:
      "h-[34px] hover:bg-gray-200 focus:outline-none lg:me-1 rounded-sm border border-black px-5 text-center inline-flex items-center",
  };

  function handleClick(newOrder: string) {
    if (newOrder === order) {
      setOrder("");
      getProducts(1, typeFilter, "");
    } else {
      setOrder(newOrder);
      getProducts(1, typeFilter, newOrder);
    }
  }

  return (
    <Dropdown
      label="Sort"
      dismissOnClick={false}
      inline={true}
      theme={customTheme}
    >
      <Dropdown.Item
        className={`${order === "priceAsc" && "bg-gray-200 hover:bg-gray-200"}`}
        onClick={() => handleClick("priceAsc")}
      >
        Price (Low to High)
      </Dropdown.Item>
      <Dropdown.Item
        className={`${order === "priceDesc" && "bg-gray-200 hover:bg-gray-200"}`}
        onClick={() => handleClick("priceDesc")}
      >
        Price (High to Low)
      </Dropdown.Item>
      <Dropdown.Item
        className={`${order === "latest" && "bg-gray-200 hover:bg-gray-200"}`}
        onClick={() => handleClick("latest")}
      >
        Latest
      </Dropdown.Item>
      <Dropdown.Item
        className={`${order === "oldest" && "bg-gray-200 hover:bg-gray-200"}`}
        onClick={() => handleClick("oldest")}
      >
        Oldest
      </Dropdown.Item>
    </Dropdown>
  );
}
