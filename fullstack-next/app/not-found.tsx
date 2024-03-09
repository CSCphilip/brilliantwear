import { Metadata } from "next";
import ReturnHomeButton from "_components/not-found/ReturnHomeButton";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <main className="flex-grow w-screen bg-404-background bg-cover bg-center">
      <div className="bg-slate-200 bg-opacity-90 h-72 my-10 w-screen flex flex-col items-center justify-center">
        <h2 className="text-center">This page could not be found</h2>
        <p className="text-center text-lg mt-2 px-4">
          But don&apos;t you worry, there are plenty of clothes to explore on
          our website.
        </p>
        <p className="text-center text-lg mt-5">Find your way back there:</p>
        <ReturnHomeButton />
      </div>
    </main>
  );
}
