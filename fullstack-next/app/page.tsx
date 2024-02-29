import { Metadata } from "next";
import ShoppingAssistant from "_components/home/ShoppingAssistant";
import WomanManProducts from "_components/home/WomanManProducts";
import PopularBrands from "_components/home/PopularBrands";
import ProductsGrid from "_components/home/ProductsGrid";

export const metadata: Metadata = {
  title: "Home | Brilliantwear",
};

export default function Home() {
  return (
    <main className="grow">
      <ShoppingAssistant />
      <WomanManProducts />
      <ProductsGrid
        heading="Popular Items"
        apiPath="https://www.brilliantwear.se/api/products/popular/"
        productItems={8}
      />
      <PopularBrands />
      <ProductsGrid
        heading="Latest Products"
        apiPath="https://www.brilliantwear.se/api/products/latest/"
        productItems={8}
      />
      <span className="block h-7" />
    </main>
  );
}
