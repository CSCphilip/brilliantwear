import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment | Checkout",
};

export default function CheckoutPaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
