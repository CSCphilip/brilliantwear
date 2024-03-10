"use client";

import ProductOrdersDropdown from "_components/WomanManAllProductsPages/ProductOrdersDropdown";
import ProductsGrid from "_components/WomanManAllProductsPages/ProductsGrid";
import ProductTypesFilter from "_components/WomanManAllProductsPages/ProductTypes";
import { useProductService } from "_services";
import { useState } from "react";

export default function WomanProducts() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [order, setOrder] = useState<string>("");
  const productService = useProductService();

  return (
    <main className="grow flex flex-col items-center pb-7">
      <div className="px-2 lg:px-0 w-full max-w-[351px] lg:max-w-[688px] xl:max-w-[1240px] 2xl:max-w-[1345px] mb-2">
        <h2 className="text-center my-4 lg:text-left lg:ps-1">Woman</h2>
        <div className="flex justify-between gap-x-8">
          <ProductTypesFilter
            gender="Woman"
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            order={order}
            getProducts={productService.getWomans}
          />
          <ProductOrdersDropdown
            order={order}
            setOrder={setOrder}
            typeFilter={typeFilter}
            getProducts={productService.getWomans}
          />
        </div>
      </div>
      <ProductsGrid
        productService={productService}
        getProducts={productService.getWomans}
        order={order}
        typeFilter={typeFilter}
      />
    </main>
  );
}
