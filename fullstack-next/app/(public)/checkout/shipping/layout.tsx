import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping | Checkout",
};

export default function CheckoutShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
