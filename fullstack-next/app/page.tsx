import ShoppingAssistant from "_components/home/ShoppingAssistant";
import WomanManProducts from "_components/home/WomanManProducts";
import PopularItems from "_components/home/PopularItems";
import LatestProducts from "_components/home/LatestProducts";

export default function Home() {
  return (
    <main className="grow">
      <ShoppingAssistant />
      <WomanManProducts />
      <PopularItems />
      <div className="h-20"></div>
    </main>
  );
}
