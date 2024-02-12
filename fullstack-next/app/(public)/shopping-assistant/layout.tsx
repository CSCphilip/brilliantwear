import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Assistant",
};

export default function ShoppingAssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
