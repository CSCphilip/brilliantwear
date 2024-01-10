// Server Component

import { Product } from "_types";
import ProductCard from "./ProductCard";

const POPULAR_ITEMS = 8;

export default async function PopularItems() {
  let popularProducts: Product[] = [];

  try {
    const res = await fetch(
      `http://localhost:3000/api/products/popular/${POPULAR_ITEMS}`,
      {
        cache: "no-cache",
      }
    );
    popularProducts = await res.json().then((data) => data.products);
  } catch (err) {
    console.error("Failed to fetch latest products");
    console.error(err);
  }

  return (
    <div>
      <h2 className="font-inter font-normal mt-5 text-center">Popular Items</h2>
      <div className="flex justify-center mt-1.5">
        <div className="grid grid-cols-2 gap-y-5 gap-x-6">
          {popularProducts.length > 0 &&
            popularProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
