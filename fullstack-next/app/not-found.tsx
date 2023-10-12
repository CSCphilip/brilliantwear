import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-amber-500"
      style={{ margin: "-1rem" }}
    >
      <div className="text-center">
        <h1>
          <b>404 - Not Found</b>
        </h1>
        <p className="pt-4">Could not find requested resource</p>
        <Link href="/" className="btn btn-outline mt-6">
          Return Home
        </Link>
      </div>
    </div>
  );
}
