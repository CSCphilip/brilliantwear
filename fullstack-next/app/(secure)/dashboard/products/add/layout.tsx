import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add product",
};

export default function DashboardAddProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
