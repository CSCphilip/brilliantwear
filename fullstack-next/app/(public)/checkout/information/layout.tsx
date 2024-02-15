import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Information | Checkout",
};

export default function CheckoutInformationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
