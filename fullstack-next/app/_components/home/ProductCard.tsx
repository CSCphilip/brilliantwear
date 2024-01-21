"use client";

import { Product } from "_types";
import { formatCurrency } from "_utilities";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ProductCard({ product }: { product: Product }) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `http://localhost:3000/api/products/image/${encodeURIComponent(
      product.image_url
    )}`;
    img.onload = () => {
      setImageLoading(false);
    };
  }, [product]);

  return (
    <div className="font-inter text-[13px] xl:text-[15px] hover:underline">
      <Link href={"/products/" + product.id}>
        {imageLoading ? (
          <div className="h-64 w-44 xl:h-[450px] xl:w-[307px] mb-1 flex justify-center items-center">
            <ClipLoader color="#3B82F6" speedMultiplier={1} />
          </div>
        ) : (
          <img
            src={
              "http://localhost:3000/api/products/image/" +
              encodeURIComponent(product.image_url)
            }
            alt="An image of the product."
            className="h-64 w-44 xl:h-[450px] xl:w-[307px] mb-1"
          />
        )}
        <p>{product.brand}</p>
        <p>{formatCurrency(product.price)}</p>
      </Link>
    </div>
  );
}
