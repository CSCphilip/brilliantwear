"use client";
import { useRouter } from "next/navigation";

const ProductButton = ({ id }: { id: string }) => {
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    router.push(`/products/${id}`);
  }

  return (
    <button
      style={{
        cursor: "pointer",
        border: "solid black",
        marginTop: "10px",
        padding: "10px",
      }}
      onClick={handleClick}
    >
      Go To Product!
    </button>
  );
};

export default ProductButton;
