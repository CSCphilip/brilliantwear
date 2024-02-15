import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

export default function DashboardOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
