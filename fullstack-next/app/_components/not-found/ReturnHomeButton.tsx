"use client";

import { useRouter } from "next/navigation";

export default function ReturnHomeButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      className="border border-black p-3 mt-3 rounded-lg font-medium hover:bg-gray-800 hover:text-white transition-all"
    >
      Return Home
    </button>
  );
}

// font-medium text-gray-900 4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
