import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Woman",
};

export default function WomanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
