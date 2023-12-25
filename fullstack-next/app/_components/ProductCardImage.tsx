"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ProductCardImage({ image_url }: { image_url: string }) {
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = `https://brilliantwear.se/api/products/image/${encodeURIComponent(
      image_url
    )}`;
    img.onload = () => {
      setImageLoading(false);
    };
  }, [image_url]);

  return (
    <>
      {imageLoading ? (
        <div className="h-64 w-[170px] lg:h-72 lg:w-48 flex justify-center items-center">
          <ClipLoader color="#3B82F6" speedMultiplier={1} />
        </div>
      ) : (
        <img
          src={`https://brilliantwear.se/api/products/image/${encodeURIComponent(
            image_url
          )}`}
          alt="An image of the product."
          className="h-64 w-[170px] lg:h-72 lg:w-48 border border-primary"
        />
      )}
    </>
  );
}
