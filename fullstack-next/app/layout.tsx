import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import NavMenu from "./components/NavMenu";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brilliantwear",
  description: "The most intelligent (brilliant) clothing store online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        <div className="overflow-hidden">
          <nav className="w-screen bg-primary flex flex-row flex-wrap">
            <div className="h-16 w-screen lg:w-44 flex justify-center lg:justify-normal">
              <Link href="/" className="flex justify-center">
                <img
                  className="h-full scale-75 lg:scale-80"
                  src="logo.png"
                  alt="Brilliantwear"
                />
              </Link>
            </div>
            <NavMenu />
          </nav>
        </div>

        {children}

        <footer className="bottom-0 left-0 z-20 w-full p-4 bg-zinc-900 border-t-2 border-t-primary shadow lg:flex lg:items-center lg:justify-between lg:p-6 mt-3">
          <span className="text-sm text-gray-200 sm:text-center">
            &copy; {currentYear} Brilliantwear. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-200 sm:mt-0">
            <li>
              <Link href="#" className="mr-4 hover:underline lg:mr-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </footer>
      </body>
    </html>
  );
}
