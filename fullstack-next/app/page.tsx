import ShoppingAssistant from "_components/home/ShoppingAssistant";
import WomanManProducts from "_components/home/WomanManProducts";
import PopularBrands from "_components/home/PopularBrands";
import ProductGrid from "_components/home/ProductsGrid";

export default function Home() {
  return (
    <main className="grow">
      <ShoppingAssistant />
      <WomanManProducts />
      <ProductGrid
        heading="Popular Items"
        apiPath="http://localhost:3000/api/products/popular/"
        productItems={8}
      />
      <PopularBrands />
      <ProductGrid
        heading="Latest Products"
        apiPath="http://localhost:3000/api/products/latest/"
        productItems={8}
      />
      <span className="block h-7" />
    </main>
  );
}
