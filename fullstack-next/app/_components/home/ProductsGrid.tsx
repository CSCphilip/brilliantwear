// Server Component

import { Product } from "_types";
import ProductCard from "_components/ProductCard";

interface ProductGridProps {
  apiPath: string;
  productItems: number;
  heading: string;
}

export default async function ProductsGrid({
  apiPath,
  productItems,
  heading,
}: ProductGridProps) {
  let products: Product[] = [];

  try {
    const res = await fetch(apiPath + productItems, {
      cache: "no-store",
    });
    products = await res.json().then((data) => data.products);
  } catch (err) {
    console.error("Failed to fetch products from " + apiPath);
    console.error(err);
  }

  return (
    <div className="lg:container lg:mx-auto lg:w-fit">
      <h2 className="font-inter font-normal mt-5 lg:mt-5 text-center lg:text-start lg:ms-5">
        {heading}
      </h2>
      <div className="flex justify-center mt-1.5 lg:mt-3">
        <div className="lg:px-4 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-10 gap-x-6 lg:gap-x-10">
          {products.length > 0 &&
            products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                smallCardSizeStyle={{ height: "h-64", width: "w-44" }}
                mediumCardSizeStyle={{
                  height: "xl:h-[400px]",
                  width: "xl:w-[280px]",
                }}
                largeCardSizeStyle={{
                  height: "2xl:h-[450px]",
                  width: "2xl:w-[307px]",
                }}
                customOuterDivStyle="xl:text-[15px]"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
