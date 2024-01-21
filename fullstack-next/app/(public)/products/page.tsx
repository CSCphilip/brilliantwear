"use client";

import { useEffect } from "react";

import ProductDetails from "_components/products/ProductDetails";
import { useProductService } from "_services";
import Spinner from "_components/Spinner";

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
  const productService = useProductService();

  const pageProducts = productService.products;
  const page = productService.pagination?.page ?? 1;
  const totalPages = productService.pagination?.total_pages;

  useEffect(() => {
    productService.getLatest(1);
  }, []);

  function handlePrevious() {
    if (page === 1) return;
    productService.getLatest(page - 1);
  }

  function handleNext() {
    if (page === totalPages) return;
    productService.getLatest(page + 1);
  }

  function handleOnChangePage(event: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(event.target.value);
    productService.getLatest(page);
  }

  if (pageProducts) {
    return (
      <div className="grow mb-12 flex flex-col">
        <h1 className="ms-[20px] mt-4">Product Catalog</h1>
        {pageProducts.length > 0 ? (
          <>
            {pageProducts.map((product) => (
              <ProductDetails key={product.id} {...product} />
            ))}
            <div className="flex justify-center">
              <button
                disabled={page === 1}
                onClick={handlePrevious}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages || !totalPages}
                onClick={handleNext}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <select
                value={page}
                onChange={handleOnChangePage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold ps-4 pe-2 border-s-2 border-black rounded-r "
              >
                {Array(totalPages)
                  .fill(null)
                  .map((_, index) => {
                    return <option key={index}>{index + 1}</option>;
                  })}
              </select>
            </div>
          </>
        ) : (
          <div className="grow flex items-center justify-center">
            <h3>No products found with this search criteria.</h3>
          </div>
        )}
      </div>
    );
  } else {
    return <Spinner />;
  }
}
