import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";

export default async function Home() {
  return (
    <main>
      <h1>Next full stack</h1>
      {/* Use the Link tag instead of <a> since this till only download what's new in the next page 
      and not download all of the content again which would be the case if using <a>. This is 
      the next.js/react.js way of doing it and should be used. */}
      <Link href="/users">UsersPage</Link>
      <ProductCard />

      <Link href={"/products"}>Catalog of products</Link>
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
