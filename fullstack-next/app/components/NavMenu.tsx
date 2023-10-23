"use client";

import Link from "next/link";
import { useState } from "react";

const NavMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className="w-screen lg:w-1/2 lg:flex lg:items-center">
      <button
        className="flex items-center px-4 py-3 ms-3 mb-2 border rounded text-black border-black hover:text-white hover:border-white lg:hidden"
        onClick={toggleMobileMenu}
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <div
        className={`ps-2 lg:ps-6 py-2 mt-2 lg:mt-0 lg:flex lg:flex-row border-y-2 border-black lg:border-y-0 ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <ul className="lg:flex lg:gap-4">
          <li>
            <Link href="/products" className="text-black hover:text-white">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
