"use client";
import { useRouter } from "next/navigation";

export default function ProductButton({ id }: { id: string }) {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    router.push(`/products/${id}`);
  }

  return (
    <button
      style={{
        cursor: "pointer",
        border: "solid black",
        padding: "10px",
      }}
      className="mt-6"
      onClick={handleClick}
    >
      Go to product
    </button>
  );
}
