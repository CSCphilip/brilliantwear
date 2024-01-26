"use client";

import ProductsGrid from "_components/WomanManPages/ProductsGrid";
import ProductTypesFilter from "_components/WomanManPages/ProductTypes";
import { useState } from "react";

export default function WomanProducts() {
  const [typeFilter, setTypeFilter] = useState<string>("All");

  return (
    <main className="grow flex flex-col items-center pb-7">
      <div className="w-[375px] lg:w-[775px] xl:w-[1240px] 2xl:w-[1345px]">
        <h2 className="text-center my-4 lg:text-left lg:ps-1">Woman</h2>
        <ProductTypesFilter
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
      </div>
      <ProductsGrid
        apiUrl={"http://localhost:3000/api/products/woman"}
        typeFilter={typeFilter}
      />
    </main>
  );
}
