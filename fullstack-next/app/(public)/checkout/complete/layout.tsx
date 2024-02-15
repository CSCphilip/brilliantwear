import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete | Checkout",
};

export default function CheckoutCompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
