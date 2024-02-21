import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Requests",
};

export default function DashboardContactRequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
