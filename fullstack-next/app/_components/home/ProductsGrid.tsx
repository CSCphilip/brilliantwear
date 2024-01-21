// Server Component

import { Product } from "_types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  apiPath: string;
  productItems: number;
  heading: string;
}

export default async function ProductGrid({
  apiPath,
  productItems,
  heading,
}: ProductGridProps) {
  let products: Product[] = [];

  try {
    const res = await fetch(apiPath + productItems, {
      cache: "no-cache",
    });
    products = await res.json().then((data) => data.products);
  } catch (err) {
    console.error("Failed to fetch products from " + apiPath);
    console.error(err);
  }

  return (
    <div className="lg:container lg:mx-auto lg:w-fit">
      <h2 className="font-inter font-normal mt-5 lg:mt-5 text-center lg:text-start lg:ms-1">
        {heading}
      </h2>
      <div className="flex justify-center mt-1.5 lg:mt-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-10 gap-x-6 lg:gap-x-10">
          {products.length > 0 &&
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
