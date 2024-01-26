import { Product } from "_types";
import ProductCard from "../ProductCard";
import React, { useEffect, useState } from "react";

export default function ProductsGrid({
  apiUrl,
  typeFilter,
}: {
  apiUrl: string;
  typeFilter: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(apiUrl, {
      cache: "no-cache",
    }).then((res) => res.json().then((data) => setProducts(data.products)));
  }, []);

  return (
    <div className="lg:px-4 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-10 gap-x-6 xl:gap-x-10">
      {products.length > 0 &&
        products
          .filter(
            (product) => typeFilter === "All" || product.type === typeFilter
          )
          .map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
}
