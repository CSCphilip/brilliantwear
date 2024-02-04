"use client";

import ProductOrdersDropdown from "_components/WomanManAllProductsPages/ProductOrdersDropdown";
import ProductsGrid from "_components/WomanManAllProductsPages/ProductsGrid";
import ProductTypesFilter from "_components/WomanManAllProductsPages/ProductTypes";
import { useProductService } from "_services";
import { useState } from "react";

export default function ManProducts() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [order, setOrder] = useState<string>("");
  const productService = useProductService();

  return (
    <main className="grow flex flex-col items-center pb-7">
      <div className="w-[375px] lg:w-[775px] xl:w-[1240px] 2xl:w-[1345px]">
        <h2 className="text-center my-4 lg:text-left lg:ps-1">Man</h2>
        <div className="flex justify-between gap-x-8">
          <ProductTypesFilter
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            order={order}
            getProducts={productService.getMens}
          />
          <ProductOrdersDropdown
            order={order}
            setOrder={setOrder}
            typeFilter={typeFilter}
            getProducts={productService.getMens}
          />
        </div>
      </div>
      <ProductsGrid
        productService={productService}
        getProducts={productService.getMens}
        order={order}
        typeFilter={typeFilter}
      />
    </main>
  );
}
