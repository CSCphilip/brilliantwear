"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useShoppingCart } from "_context";
import { formatCurrency } from "_utilities";
import { CartItem } from "_types";

// Slide-over shopping cart menu
export default function ShoppingCart({ isOpen }: { isOpen: boolean }) {
  const { closeCart, cartItems, removeFromCart } = useShoppingCart();

  /* TODO: Improve this frontend code for the shopping cart menu. Remove the double buttons, perhaps you
   can use tailwinds 'pointer-events-none' on one of the divs.
   */
  return (
    <div>
      <button
        onClick={closeCart}
        className={`${
          isOpen ? "" : "hidden"
        } fixed left-0 top-0 h-full w-full z-20 bg-gray-500 bg-opacity-75 cursor-default`}
      />

      {/* NOTE: This needs to be considered when changing sizes or padding in the shopping cart menu.
          448px + 40px (padding = pl-10) = 488px is the max width of the shopping cart menu which explains
          the width of the div below. */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-full sm:w-[488px] z-30 transition-all duration-1000`}
      >
        {/* This button below is to cover up for the other button above and the small strip that is created 
          between the left side of the screen and the start of the shopping cart menu. */}
        <button
          onClick={closeCart}
          className="fixed left-0 top-0 h-full w-10 z-20 cursor-default"
        />
        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          {/* The flex in parent div will make this div height to take up the screen. This div will set the
          width of the parent div to w-screen or max 448px (max-w-md). The left padding in the parent div
          will take effect on this div so that the shopping cart menu doesn't take the full width on smaller
          screen. */}
          <div className="w-screen max-w-md">
            <div className="h-full pl-5 flex flex-col bg-white">
              <div className="flex justify-between py-5">
                <h2 className="text-lg lg:text-2xl text-gray-900">
                  Shopping Cart
                </h2>
                <div
                  className="mr-6 lg:px-[2px] flex items-center border rounded-lg border-gray-400 
                  hover:border-gray-600"
                >
                  <button
                    type="button"
                    onClick={() => closeCart()}
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-600"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* In next div, 'overflow-y-scroll' to allow vertical scrolling. Only the part of the menu
              with the actual items will be able to scroll. The heading & close button and total price
              section will always be visible. */}
              <div className="overflow-y-scroll grow">
                <ul>
                  {cartItems.map((item) => (
                    <ShoppingCartItem
                      key={item.product.id}
                      item={item}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </ul>
                {/* NOTE: Add "Looks empty!" message if cart is empty. */}
              </div>
              <div className="h-28 -ms-5 border-t-2 border-gray-300 pt-3">
                <div className="flex justify-between px-6">
                  <p className="font-medium text-gray-900">Total</p>
                  <p className="text-gray-900">
                    {formatCurrency(
                      cartItems.reduce((totalPrice: number, item: CartItem) => {
                        return item.product.price * item.quantity + totalPrice;
                      }, 0)
                    )}
                  </p>
                </div>
                <Link
                  href="#"
                  className="mx-6 mt-2 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ShoppingCartItemProps = {
  item: CartItem;
  removeFromCart: (id: string) => void;
};

function ShoppingCartItem({ item, removeFromCart }: ShoppingCartItemProps) {
  if (!item.image) {
    return <div>No image data available</div>;
  }

  const imageUrl = URL.createObjectURL(item.image);

  // NOTE: I am not sure about this. It could lead to memory leaks if the image is not removed from
  // memory when the component is unmounted.
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <li className="h-32 mb-4">
      <div className="flex">
        <img
          src={imageUrl}
          alt="Image of product"
          className="h-full w-20 py-2 rounded-xl"
        />
        <div className="flex flex-col justify-between py-4 pl-5 grow">
          <div>
            <p>Brand: {item.product.brand}</p>
            <p>Category: {item.product.category}</p>
          </div>
          <p>Qty: {item.quantity}</p>
        </div>
        <div className="flex flex-col justify-between w-24 py-4">
          <p className="font-medium text-gray-900 text-right pr-[22px]">
            {formatCurrency(item.product.price)}
          </p>
          <button
            onClick={() => removeFromCart(item.product.id)}
            className="font-medium text-indigo-600 hover:text-indigo-500 mr-2"
          >
            Remove
          </button>
        </div>
      </div>
      <hr className="h-px mr-5 mt-1 border-0 bg-gray-300" />
    </li>
  );
}
