"use client";

import ProductOrdersDropdown from "_components/WomanManAllProductsPages/ProductOrdersDropdown";
import ProductsGrid from "_components/WomanManAllProductsPages/ProductsGrid";
import ProductTypesFilter from "_components/WomanManAllProductsPages/ProductTypes";
import { useProductService } from "_services";
import { useState } from "react";

// Old (left to remember the bug):
// async function getAllProducts() {
//   const res = await fetch("URL_TO_API");
//   // next: { revalidate: 60 }, // This will update every 60 seconds and send a request to the backend API (api.brilliantwear.se) and not use values from the cache.
//   // NOTE: BUG when using revalidate. The page will become blank after it has been revalidated.
//   // See:
//   // https://github.com/vercel/next.js/issues/57058
//   // https://github.com/vercel/next.js/issues/56018

//   const allProducts: Product[] = await res.json();
//   return allProducts;
// }

export default function ProductCatalog() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [order, setOrder] = useState<string>("");
  const productService = useProductService();

  return (
    <main className="grow flex flex-col items-center pb-7">
      <div className="w-[375px] lg:w-[775px] xl:w-[1240px] 2xl:w-[1345px]">
        <h2 className="text-center my-4 lg:text-left lg:ps-1">All Products</h2>
        <div className="flex justify-between gap-x-8">
          <ProductTypesFilter
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            order={order}
            getProducts={productService.getLatest}
          />
          <ProductOrdersDropdown
            order={order}
            setOrder={setOrder}
            typeFilter={typeFilter}
            getProducts={productService.getLatest}
          />
        </div>
      </div>
      <ProductsGrid
        productService={productService}
        getProducts={productService.getLatest}
        order={order}
        typeFilter={typeFilter}
      />
    </main>
  );
}
