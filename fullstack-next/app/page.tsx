import ShoppingAssistant from "_components/home/ShoppingAssistant";
import WomanManProducts from "_components/home/WomanManProducts";
import LatestProducts from "_components/home/LatestProducts";

export default function Home() {
  return (
    <main className="grow">
      <ShoppingAssistant />
      <WomanManProducts />
      <div className="h-20"></div>
    </main>
  );
}
