"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Product } from "_types";
import { formatCurrency } from "_utilities";

interface ProductCardProps {
  product: Product;
  smallCardSizeStyle: { height: string; width: string };
  mediumCardSizeStyle: { height: string; width: string };
  largeCardSizeStyle: { height: string; width: string };
  customOuterDivStyle: string;
}

export default function ProductCard({
  product,
  smallCardSizeStyle,
  mediumCardSizeStyle,
  largeCardSizeStyle,
  customOuterDivStyle,
}: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [isImageFetched, setIsImageFetched] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `https://www.brilliantwear.se/api/products/image/${encodeURIComponent(
      product.image_url
    )}`;
    img.onload = () => {
      setIsImageFetched(true);
      setImageLoading(false);
    };
    img.onerror = () => {
      setImageLoading(false);
    };
  }, [product]);

  return (
    <div
      className={`font-interSansSerif text-[13px] hover:underline ${customOuterDivStyle}`}
    >
      <Link href={"/products/" + product.id}>
        {!isImageFetched ? (
          <div
            className={`mb-1 flex justify-center items-center ${smallCardSizeStyle.height} 
            ${smallCardSizeStyle.width} ${mediumCardSizeStyle.height} ${mediumCardSizeStyle.width}
            ${largeCardSizeStyle.height} ${largeCardSizeStyle.width}`}
          >
            {imageLoading ? (
              <ClipLoader color="#3B82F6" />
            ) : (
              <img
                src="/product-image-not-found.png"
                alt="A default product image not found."
                className="text-center"
              />
            )}
          </div>
        ) : (
          <img
            src={
              "https://www.brilliantwear.se/api/products/image/" +
              encodeURIComponent(product.image_url)
            }
            alt="An image of the product."
            className={`"mb-1 text-center ${smallCardSizeStyle.height} ${smallCardSizeStyle.width} 
            ${mediumCardSizeStyle.height} ${mediumCardSizeStyle.width} ${largeCardSizeStyle.height}
            ${largeCardSizeStyle.width}`}
          />
        )}
        <p>{product.brand}</p>
        <p>{formatCurrency(product.price)}</p>
      </Link>
    </div>
  );
}
