import ShoppingAssistant from "_components/home/ShoppingAssistant";
import WomanManProducts from "_components/home/WomanManProducts";
import PopularItems from "_components/home/PopularItems";
import LatestProducts from "_components/home/LatestProducts";
import PopularBrands from "_components/home/PopularBrands";

export default function Home() {
  return (
    <main className="grow">
      <ShoppingAssistant />
      <WomanManProducts />
      <PopularItems />
      <PopularBrands />
      <LatestProducts />
      <span className="block h-7"></span>
    </main>
  );
}
