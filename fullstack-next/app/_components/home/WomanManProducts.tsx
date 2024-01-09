"use client";

import { Product } from "_types";
import { formatCurrency } from "_utilities";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const NO_PRODUCTS = 4;

export default function WomanManProducts() {
  const [womanProducts, setWomanProducts] = useState<Product[] | null>(null);
  const [manProducts, setManProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/woman?shuffle=true")
      .then((res) => res.json())
      .then((json) => {
        setWomanProducts(json.products.slice(0, NO_PRODUCTS));
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:3000/api/products/man?shuffle=true")
      .then((res) => res.json())
      .then((json) => {
        setManProducts(json.products.slice(0, NO_PRODUCTS));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-[#f1f1f1] py-4">
      <HorizontalScrollableList products={womanProducts} gender="Woman" />
      <span className="block h-2" />
      <HorizontalScrollableList products={manProducts} gender="Man" />
    </div>
  );
}

function HorizontalScrollableList({
  products,
  gender,
}: {
  products: Product[] | null;
  gender: string;
}) {
  return (
    <>
      <h2 className="font-inter font-normal ms-6">{gender}</h2>
      <div className="flex mt-1">
        {/* NOTE: You can use 'scrollbar-hide' here to hide scrollbar */}
        <div className="grow overflow-x-auto ps-16">
          {products ? (
            <ol className="flex">
              {products.map((product) => {
                return (
                  <li>
                    <ProductCard product={product} />
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="h-[300px]" />
          )}
        </div>
      </div>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
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
    <div className="w-max font-inter text-[13px] me-6 mb-2 hover:underline">
      <Link href={"/products/" + product.id} className="">
        {imageLoading ? (
          <div className="h-64 w-44 mb-1 flex justify-center items-center">
            <ClipLoader color="#3B82F6" speedMultiplier={1} />
          </div>
        ) : (
          <img
            src={
              "http://localhost:3000/api/products/image/" +
              encodeURIComponent(product.image_url)
            }
            alt="An image of the product."
            className="h-64 w-44 mb-1"
          />
        )}
        <p>{product.brand}</p>
        <p>{formatCurrency(product.price)}</p>
      </Link>
    </div>
  );
}
