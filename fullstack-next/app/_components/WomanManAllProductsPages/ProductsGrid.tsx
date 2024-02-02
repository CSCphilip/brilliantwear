import { Product } from "_types";
import ProductCard from "../ProductCard";
import Spinner from "_components/Spinner";
import { useEffect } from "react";

interface ProductsGridProps {
  productService: any;
  getProducts: (
    page?: number,
    typeFilter?: string,
    order?: string
  ) => Promise<void>;
  order?: string;
  typeFilter?: string;
}

export default function ProductsGrid({
  productService,
  getProducts,
  typeFilter,
  order,
}: ProductsGridProps) {
  const pageProducts = productService.products;
  const page = productService.pagination?.page ?? 1;
  const totalPages = productService.pagination?.total_pages;

  useEffect(() => {
    getProducts(1);
  }, []);

  function handlePrevious() {
    if (page === 1) return;
    getProducts(page - 1, typeFilter, order);
  }

  function handleNext() {
    if (page === totalPages) return;
    getProducts(page + 1, typeFilter, order);
  }

  function handleOnChangePage(event: React.ChangeEvent<HTMLSelectElement>) {
    const page = Number(event.target.value);
    getProducts(page, typeFilter, order);
  }
  if (pageProducts) {
    return (
      <div>
        <div className="lg:px-4 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-10 gap-x-6 xl:gap-x-10">
          {pageProducts.length > 0 &&
            pageProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <div className="flex justify-center mt-6">
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
      </div>
    );
  } else {
    return <Spinner />;
  }
}
