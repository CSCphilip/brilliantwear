import ProductDetails from "./ProductDetails";
import { Product } from "../types/types";

async function getAllProducts() {
  const res = await fetch("https://api.brilliantwear.se/get-all-products");
  // next: { revalidate: 60 }, // This will update every 60 seconds and send a request to the backend API (api.brilliantwear.se) and not use values from the cache.
  // NOTE: BUG when using revalidate. The page will become blank after it has been revalidated.
  // See:
  // https://github.com/vercel/next.js/issues/57058
  // https://github.com/vercel/next.js/issues/56018

  const allProducts: Product[] = await res.json();
  return allProducts;
}

export default async function ProductCatalog() {
  const allProducts = await getAllProducts();
  return (
    <div>
      <h1 className="ms-[20px] mt-4">Product Catalog</h1>
      {allProducts.length > 0 &&
        allProducts.map((product) => (
          <ProductDetails key={product.id} {...product} />
        ))}
    </div>
  );
}
