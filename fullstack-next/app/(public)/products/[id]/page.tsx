"use client";

import { useRouter } from "next/navigation";
import { Product } from "_types";
import { formatCurrency } from "_utilities";
import AddToCartButton from "_components/products/id/AddToCartButton";
import { useEffect, useState } from "react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    getProduct(params.id, router).then((product) => {
      setProduct(product);
    });
  }, []);

  return (
    <main className="grow">
      {product?.id && (
        <div className="p-4 m-5 border border-black flex flew-row">
          <img
            src={
              "http://localhost:3000/api/products/image/" +
              encodeURIComponent(product.image_url)
            }
            alt="The image of the product."
            className="h-56 lg:h-[500px]"
          />
          <div className="flex flex-col">
            <span className="ms-5">
              <p>
                <b>Brand:</b> {product.brand}
              </p>
              <p>
                <b>Category:</b> {product.category}
              </p>
              <p>
                <b>Type:</b> {product.type}
              </p>
              <p>
                <b>Price:</b> {formatCurrency(product.price)}
              </p>
            </span>
            <div className="ms-5 mt-5">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

async function getProduct(id: string, router: any) {
  const res = await fetch(
    "http://localhost:3000/api/products/" + encodeURIComponent(id)
  );
  const product: Product = await res.json();
  if (!product.id) {
    router.push("/not-found");
  }

  return product;
}
