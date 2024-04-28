import { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

import NavMenu from "_components/NavMenu";
import { ShoppingCartProvider } from "_context";
import CookieBanner from "_components/CookieBanner";

export const metadata: Metadata = {
  title: {
    template: "%s | Brilliantwear",
    default: "Brilliantwear",
  },
  description: "The most brilliant (intelligent) clothing store online.",
  openGraph: {
    title: "Home",
    description: "The most brilliant (intelligent) clothing store online.",
    url: "https://www.brilliantwear.se",
    siteName: "Brilliantwear",
    images: [
      {
        url: "https://www.brilliantwear.se/api/meta/opengraph/image",
        width: 1200,
        height: 627,
        alt: "Brilliantwear logo",
      },
    ],
    locale: "en",
    type: "website",
  },
  metadataBase: new URL("https://www.brilliantwear.se"),
  creator: "Philip Andersson",
  keywords: [
    "clothing",
    "store",
    "fashion",
    "AI",
    "ecommerce",
    "brilliantwear",
  ],
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ShoppingCartProvider>
          <div className="flex flex-col min-h-screen">
            <div className="overflow-hidden">
              <nav className="w-screen bg-primary flex flex-row flex-wrap">
                <div className="h-16 w-screen lg:w-44 flex justify-center lg:justify-normal">
                  <Link href="/" className="flex justify-center">
                    <img
                      className="h-full scale-75 lg:scale-80"
                      src="/logo.png"
                      alt="Brilliantwear"
                    />
                  </Link>
                </div>
                <NavMenu />
              </nav>
            </div>

            {children}

            <footer className="bottom-0 left-0 z-10 w-full p-4 bg-zinc-900 border-t-2 border-t-primary shadow md:flex md:items-center md:justify-between md:p-6">
              <span className="text-sm text-gray-200 md:text-center">
                &copy; {currentYear} Brilliantwear. All Rights Reserved.
              </span>
              <ul className="flex flex-wrap gap-x-4 gap-y-3 lg:gap-x-6 lg:gap-y-0 items-center mt-3 text-sm font-medium text-gray-200 md:mt-0">
                <li>
                  <Link href="/about" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-notice" className="hover:underline">
                    Privacy Notice
                  </Link>
                </li>
              </ul>
            </footer>

            <CookieBanner />
          </div>
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
