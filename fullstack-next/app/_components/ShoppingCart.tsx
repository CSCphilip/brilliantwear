"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useShoppingCart } from "_context";
import { formatCurrency } from "_utilities";
import { CartItem, Product } from "_types";

// Slide-over shopping cart menu
export default function ShoppingCart({ isOpen }: { isOpen: boolean }) {
  const {
    cartItems,
    cartImages,
    closeCart,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();

  /* TODO: Improve this frontend code for the shopping cart menu. Remove the double buttons, perhaps you
   can use tailwinds 'pointer-events-none' on one of the divs.
   */
  return (
    <div>
      <button
        onClick={closeCart}
        className={`${
          !isOpen && "hidden"
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
                  <CloseButton closeCart={closeCart} />
                </div>
              </div>
              {/* In next div, 'overflow-y-scroll' to allow vertical scrolling. Only the part of the menu
              with the actual items will be able to scroll. The heading & close button and total price
              section will always be visible. */}
              <div className="overflow-y-scroll grow">
                {cartItems.length !== 0 ? (
                  <ul>
                    {cartItems.map((item, index) => (
                      <ShoppingCartItem
                        key={item.product.id}
                        item={item}
                        cartImages={cartImages}
                        removeFromCart={removeFromCart}
                        increaseCartQuantity={increaseCartQuantity}
                        decreaseCartQuantity={decreaseCartQuantity}
                        isLastItem={index === cartItems.length - 1}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="h-full me-5 flex items-center justify-center">
                    <p className="mb-3 text-gray-500">
                      Oops! Your cart's feeling light as a feather.
                    </p>
                  </div>
                )}
              </div>
              <TotalPriceSection cartItems={cartItems} closeCart={closeCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ShoppingCartItemProps = {
  item: CartItem;
  cartImages: { [key: string]: Blob | undefined };
  removeFromCart: (id: string) => void;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (id: string) => void;
  isLastItem: boolean;
};

function ShoppingCartItem({
  item,
  cartImages,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  isLastItem,
}: ShoppingCartItemProps) {
  let imageUrl = "";
  if (cartImages[item.product.id] !== undefined) {
    imageUrl = URL.createObjectURL(cartImages[item.product.id]!);
  }

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
          <div className="flex">
            <p>Qty: {item.quantity}</p>
            <button
              onClick={() => increaseCartQuantity(item.product)}
              className="pt-[2px]"
            >
              <PlusSign />
            </button>
            <button
              onClick={() => decreaseCartQuantity(item.product.id)}
              className="pt-[2px]"
            >
              <MinusSign />
            </button>
          </div>
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
      <hr
        className={`${
          isLastItem && "hidden"
        } h-px mr-5 mt-1 border-0 bg-gray-300`}
      />
    </li>
  );
}

function CloseButton({ closeCart }: { closeCart: () => void }) {
  return (
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
  );
}

function TotalPriceSection({
  cartItems,
  closeCart,
}: {
  cartItems: CartItem[];
  closeCart: () => void;
}) {
  const router = useRouter();

  return (
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
      <div className="flex">
        <button
          onClick={() => {
            router.push("/checkout");
            closeCart();
          }}
          disabled={cartItems.length === 0}
          className="grow mx-6 mt-2 mb-4 flex items-center justify-center rounded-md border border-transparent 
        bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700
        disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

function PlusSign() {
  return (
    <svg
      className="w-4 h-4 ml-[6px] hover:scale-110 transform transition-all duration-150"
      fill="#000000"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 47.9219 C 16.9374 47.9219 8.1014 39.0625 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9454 39.0625 39.0390 47.9219 27.9999 47.9219 Z M 27.9296 39.1328 C 29.1952 39.1328 29.9452 38.2656 29.9452 36.9063 L 29.9452 29.9688 L 37.2812 29.9688 C 38.5936 29.9688 39.5077 29.2890 39.5077 28.0469 C 39.5077 26.7812 38.6405 26.0547 37.2812 26.0547 L 29.9452 26.0547 L 29.9452 18.6953 C 29.9452 17.3125 29.1952 16.4688 27.9296 16.4688 C 26.6874 16.4688 26.0077 17.3594 26.0077 18.6953 L 26.0077 26.0547 L 18.6952 26.0547 C 17.3124 26.0547 16.4452 26.7812 16.4452 28.0469 C 16.4452 29.2890 17.3827 29.9688 18.6952 29.9688 L 26.0077 29.9688 L 26.0077 36.9063 C 26.0077 38.2188 26.6874 39.1328 27.9296 39.1328 Z"></path>
      </g>
    </svg>
  );
}

function MinusSign() {
  return (
    <svg
      className="w-[14px] h-[14px] ml-[1px] hover:scale-110 transform transition-all duration-150"
      viewBox="0 -0.5 21 21"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>minus_circle [#1426]</title> <desc>Created with Sketch.</desc>{" "}
        <defs> </defs>{" "}
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          {" "}
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-219.000000, -600.000000)"
            fill="#000000"
          >
            {" "}
            <g id="icons" transform="translate(56.000000, 160.000000)">
              {" "}
              <path
                d="M177.7,450 C177.7,450.552 177.2296,451 176.65,451 L170.35,451 C169.7704,451 169.3,450.552 169.3,450 C169.3,449.448 169.7704,449 170.35,449 L176.65,449 C177.2296,449 177.7,449.448 177.7,450 M173.5,458 C168.86845,458 165.1,454.411 165.1,450 C165.1,445.589 168.86845,442 173.5,442 C178.13155,442 181.9,445.589 181.9,450 C181.9,454.411 178.13155,458 173.5,458 M173.5,440 C167.70085,440 163,444.477 163,450 C163,455.523 167.70085,460 173.5,460 C179.29915,460 184,455.523 184,450 C184,444.477 179.29915,440 173.5,440"
                id="minus_circle-[#1426]"
              >
                {" "}
              </path>{" "}
            </g>{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
