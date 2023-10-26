import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-404-background bg-cover">
      <div className="h-1/6"></div>
      <div className="bg-slate-200 bg-opacity-90 h-72 w-screen flex flex-col items-center justify-center">
        <h2 className="text-center">This page could not be found</h2>
        <p className="text-center text-lg mt-2">
          But don't you worry, there are plenty of clothes to explore on our
          website.
        </p>
        <p className="text-center text-lg mt-5">Find your way back there:</p>
        <Link
          href="/"
          className="border-2 border-black p-3 hover:bg-blue-100 mt-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
