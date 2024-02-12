import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Man",
};

export default function ManLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
