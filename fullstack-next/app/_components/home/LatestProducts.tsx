import { Product } from "_types";
import ProductCard from "_components/ProductCard";

export default async function LatestProducts() {
  let latestProducts: Product[] = [];

  try {
    const res = await fetch("http://localhost:3000/api/products/latest/8", {
      cache: "no-cache",
    });
    latestProducts = await res.json();
  } catch (err) {
    console.error("Failed to fetch latest products");
    console.error(err);
  }

  return (
    <>
      <h2 className="mt-10">Latest Products</h2>
      <div className="container grid gap-y-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-1 lg:mt-3">
        {latestProducts.length > 0 ? (
          latestProducts.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))
        ) : (
          <p className="text-center">The latest products could not be found.</p>
        )}
      </div>
    </>
  );
}
