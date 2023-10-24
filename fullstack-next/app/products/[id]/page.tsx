import { Product } from "../../types/types";
import Link from "next/link";

// Does so that the page only renders when a user visits a dynamic route that
// corresponds to an actual product. Otherwise, a 404 page will be rendered.
export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch("https://api.brilliantwear.se/get-all-products");
  const allProducts: Product[] = await res.json();

  const params = allProducts.map((product) => ({
    id: product.id,
  }));

  return params;
}

async function getProduct(id: string) {
  const res = await fetch(
    "https://api.brilliantwear.se/get-product/" + encodeURIComponent(id)
  );
  const product: Product = await res.json();
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return product ? (
    <div className="p-4 m-5 border border-black flex flew-row">
      <img
        src={
          "https://api.brilliantwear.se/get-image/" +
          encodeURIComponent(product.image_url)
        }
        alt="The image of the product."
        className="h-56 lg:h-[500px]"
      />
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
          <b>Price:</b> {product.price} kr
        </p>
      </span>
    </div>
  ) : (
    // NOTE: This is a fallback page if the product is not found.
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
