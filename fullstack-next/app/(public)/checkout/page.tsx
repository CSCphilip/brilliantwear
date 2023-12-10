"use client";

import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  router.push("/checkout/information");
}
