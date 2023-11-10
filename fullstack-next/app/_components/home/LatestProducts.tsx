import { Product } from "_types";
import ProductCard from "_components/ProductCard";

const LatestProducts = async () => {
  const res = await fetch("http://localhost:3000/api/products/latest/8");
  const latestProducts = await res.json();

  return (
    <>
      <h2 className="mt-10">Latest Products</h2>
      <div className="container grid gap-y-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-1 lg:mt-3">
        {latestProducts.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default LatestProducts;
