"use client";

import { useShoppingCart } from "_context";
import Link from "next/link";
import { useState } from "react";

export default function NavMenu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { openCart, cartQuantity } = useShoppingCart();

  function toggleMobileMenu() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className="w-screen flex flex-col lg:w-auto lg:flex-row lg:grow lg:items-center">
      <div className="hidden lg:inline">
        <NavMenuLinks toggleMobileMenu={toggleMobileMenu} />
      </div>
      <div className="flex grow lg:items-center lg:pt-1">
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center px-4 py-3 ms-4 mb-2 border rounded text-black border-black hover:text-white hover:border-white"
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

        <span className="grow"></span>

        <button
          onClick={openCart}
          className="w-8 h-8 me-5 lg:me-8 relative flex justify-center rounded-full p-[5px] border-2 border-black hover:rotate-12 duration-300"
        >
          <svg
            className="-translate-x-[1px] translate-y-[1px]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11 21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078 15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884 6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18 13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906 10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489 17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938 20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938 8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617 20Z"
                fill="#0F0F0F"
              ></path>{" "}
            </g>
          </svg>
          <div className="w-4 h-4 bg-slate-800 text-white text-xs rounded-full flex justify-center absolute top-0 right-0 translate-y-[-6px] translate-x-[6px]">
            {cartQuantity}
          </div>
        </button>
      </div>
      <div className={`${isMobileMenuOpen ? "" : "hidden"} lg:hidden`}>
        <NavMenuLinks toggleMobileMenu={toggleMobileMenu} />
      </div>
    </div>
  );
}

function NavMenuLinks({ toggleMobileMenu }: { toggleMobileMenu: () => void }) {
  return (
    <div className="flex items-center border-y-2 border-black lg:border-y-0">
      <ul className="ms-2 my-1 lg:my-0 lg:flex lg:gap-4">
        <li>
          <Link
            href="/products"
            onClick={toggleMobileMenu}
            className="text-black hover:text-white"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={toggleMobileMenu}
            className="text-black hover:text-white"
          >
            Test
          </Link>
        </li>
      </ul>
    </div>
  );
}
