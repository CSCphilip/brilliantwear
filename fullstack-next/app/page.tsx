import ShoppingAssistant from "_components/home/ShoppingAssistant";
import LatestProducts from "_components/home/LatestProducts";

export default async function Home() {
  return (
    <main className="overflow-hidden mb-5">
      <div className="w-screen flex flex-col items-center">
        <h2 className="mt-5">Shopping Assistant</h2>
        <p className="text-sm text-gray-500 italic mt-[-2px]">
          Powered by ChatGPT
        </p>
        <img
          src="icon-search-clothing.png"
          alt="Search clothing icon"
          className="mt-2 h-14 lg:h-16"
        />
        <ShoppingAssistant />
        <LatestProducts />
      </div>
    </main>
  );
}

/* 
Next consists of server components which cannot:
* Listen to browser events
* Access browser APIs (like local storage)
* Maintain state
* Use effects
*/
