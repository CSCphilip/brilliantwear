import { Product } from "../../types/types";
import Link from "next/link";

// Does so that the page only renders when a user visits a dynamic route that
// corresponds to an actual product. Otherwise, a 404 page will be rendered.
export const dynamicParams = false;

export async function generateStaticParams() {
  const res = await fetch("https://api.brilliantwear.se/get-all-products", {
    next: { revalidate: 60 },
  });
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
    <div style={{ border: "1px solid black", margin: "20px", padding: "20px" }}>
      <h4>{product.brand}</h4>
      <p>{product.category}</p>
      <p>{product.type}</p>
      <p>{product.price} kr</p>
      <img
        src={
          "https://api.brilliantwear.se/get-image/" +
          encodeURIComponent(product.image_url)
        }
        alt="The image of the product."
        style={{ height: "500px", border: "1px solid black" }}
      />
      <Link href="/products"> Go back </Link>
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
