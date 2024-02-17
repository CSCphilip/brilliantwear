"use client";

import { useRouter } from "next/navigation";
import { Product } from "_types";
import { formatCurrency } from "_utilities";
import AddToCartButton from "_components/products/id/AddToCartButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import ProductCard from "_components/ProductCard";

/** Product page
 *
 * Layout:
 * Product image
 * Product details (brand, category, type)
 * Price
 * Add to cart button
 * Icons (Secure payment, Free shipping, 30 days free returns, Fast delivery 1-3 days)
 * Related products
 */

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>();
  const router = useRouter();

  useEffect(() => {
    getProduct(params.id, router).then((product) => {
      product && setProduct(product);
    });
  }, []);

  return (
    <main className="grow flex flex-col items-center">
      {product && (
        <>
          <div className="grow mx-10 mt-5 md:mt-10 flex flex-col md:flex-row items-center md:items-start md:justify-center max-w-[1500px]">
            <img
              src={
                "http://localhost:3000/api/products/image/" +
                encodeURIComponent(product.image_url)
              }
              alt="An image of the product."
              className="w-full md:max-w-[500px] h-auto"
            />
            <div className="w-full md:w-auto md:ms-7">
              <div className="flex md:flex-col justify-between md:items-start px-1 items-center mt-3 md:mt-2">
                <ProductDetails product={product} />
                <p className="font-inter text-2xl md:text-3xl font-bold md:mt-5">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="mt-4 px-4 md:px-0 md:w-72">
                <AddToCartButton product={product} />
              </div>
              <CustomerBenefits />
            </div>
          </div>
          <div className="mt-10 md:mt-16 pb-5 bg-[#F4F4F4] w-full flex flex-col items-center">
            <RelatedProducts product={product} />
          </div>
        </>
      )}
    </main>
  );
}

async function getProduct(id: string, router: any) {
  const res = await fetch(
    "http://localhost:3000/api/products/" + encodeURIComponent(id)
  );
  const product: Product = await res.json();
  if (!product.id) {
    router.push("/not-found");
    return undefined;
  }

  return product;
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="font-inter">
      <p className="text-3xl md:text-4xl">{product.brand}</p>
      <p className="text-lg">{product.category}</p>
      <p className="text-gray-500 italic">{product.type}</p>
    </div>
  );
}

function CustomerBenefits() {
  return (
    <div className="mt-10 flex flex-col text-sm px-1 md:w-5/6">
      <div className="flex md:flex-col justify-between md:justify-start">
        <div className="flex items-center">
          <svg
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M18.92 7.96997C18.9781 7.58275 19.0048 7.19156 19 6.80005C17.8347 5.58901 16.437 4.62559 14.8905 3.96753C13.344 3.30947 11.6806 2.97021 10 2.97021C8.31935 2.97021 6.65602 3.30947 5.10956 3.96753C3.5631 4.62559 2.16532 5.58901 1 6.80005C1 20.86 10 22.97 10 22.97C10.6656 22.6883 11.3077 22.3539 11.92 21.97"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M23 13.97H13"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M21 10.9199H15C13.8954 10.9199 13 11.8154 13 12.9199V17.9199C13 19.0245 13.8954 19.9199 15 19.9199H21C22.1046 19.9199 23 19.0245 23 17.9199V12.9199C23 11.8154 22.1046 10.9199 21 10.9199Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
          <p className="ms-3 md:ms-[14px] font-inter">Secure payment</p>
        </div>
        <div className="flex items-center md:mt-4">
          <svg
            viewBox="0 -1 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.31 16.826C12.2864 17.9963 11.3464 18.9278 10.2052 18.9118C9.06401 18.8957 8.14927 17.9382 8.15697 16.7676C8.16467 15.5971 9.09191 14.6522 10.2332 14.652C10.7897 14.6578 11.3212 14.8901 11.7106 15.2978C12.1001 15.7055 12.3157 16.2552 12.31 16.826V16.826Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.2014 16.826C22.1778 17.9963 21.2378 18.9278 20.0966 18.9118C18.9554 18.8957 18.0407 17.9382 18.0484 16.7676C18.0561 15.5971 18.9833 14.6522 20.1246 14.652C20.6811 14.6578 21.2126 14.8901 21.602 15.2978C21.9915 15.7055 22.2071 16.2552 22.2014 16.826V16.826Z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M17.8032 17.576C18.2174 17.576 18.5532 17.2402 18.5532 16.826C18.5532 16.4118 18.2174 16.076 17.8032 16.076V17.576ZM12.31 16.076C11.8958 16.076 11.56 16.4118 11.56 16.826C11.56 17.2402 11.8958 17.576 12.31 17.576V16.076ZM17.0571 16.826C17.0571 17.2402 17.3928 17.576 17.8071 17.576C18.2213 17.576 18.5571 17.2402 18.5571 16.826H17.0571ZM18.5571 11.559C18.5571 11.1448 18.2213 10.809 17.8071 10.809C17.3928 10.809 17.0571 11.1448 17.0571 11.559H18.5571ZM17.8071 16.076C17.3928 16.076 17.0571 16.4118 17.0571 16.826C17.0571 17.2402 17.3928 17.576 17.8071 17.576V16.076ZM18.0518 17.576C18.466 17.576 18.8018 17.2402 18.8018 16.826C18.8018 16.4118 18.466 16.076 18.0518 16.076V17.576ZM22.189 16.0762C21.7749 16.0852 21.4465 16.4281 21.4555 16.8423C21.4644 17.2564 21.8074 17.5848 22.2215 17.5758L22.189 16.0762ZM24.4 14.485L25.1499 14.4718C25.1492 14.4331 25.1455 14.3946 25.1389 14.3565L24.4 14.485ZM24.63 11.4305C24.559 11.0224 24.1706 10.7491 23.7625 10.8201C23.3544 10.8911 23.0812 11.2794 23.1521 11.6875L24.63 11.4305ZM17.8031 6.127C17.3889 6.127 17.0531 6.46279 17.0531 6.877C17.0531 7.29121 17.3889 7.627 17.8031 7.627V6.127ZM21.2849 6.877L21.2849 7.62702L21.2897 7.62698L21.2849 6.877ZM22.8737 7.56387L22.327 8.07731L22.327 8.07731L22.8737 7.56387ZM23.4835 9.218L22.7342 9.18603C22.7319 9.23979 22.7354 9.29363 22.7446 9.34663L23.4835 9.218ZM23.1522 11.6876C23.2232 12.0957 23.6116 12.3689 24.0197 12.2979C24.4278 12.2268 24.701 11.8384 24.6299 11.4304L23.1522 11.6876ZM18.5531 6.877C18.5531 6.46279 18.2174 6.127 17.8031 6.127C17.3889 6.127 17.0531 6.46279 17.0531 6.877H18.5531ZM17.0531 11.559C17.0531 11.9732 17.3889 12.309 17.8031 12.309C18.2174 12.309 18.5531 11.9732 18.5531 11.559H17.0531ZM17.0531 6.877C17.0531 7.29121 17.3889 7.627 17.8031 7.627C18.2174 7.627 18.5531 7.29121 18.5531 6.877H17.0531ZM17.8031 6.077L17.0531 6.0722V6.077H17.8031ZM16.7657 5L16.77 4.25H16.7657V5ZM7.42037 5L7.42037 4.24999L7.41679 4.25001L7.42037 5ZM6.68411 5.31693L6.14467 4.79587L6.14467 4.79587L6.68411 5.31693ZM6.382 6.075L7.13201 6.075L7.13199 6.07158L6.382 6.075ZM6.382 15.75L7.132 15.7534V15.75H6.382ZM6.68411 16.5081L6.14467 17.0291L6.14467 17.0291L6.68411 16.5081ZM7.42037 16.825L7.41679 17.575H7.42037V16.825ZM8.1526 17.575C8.56681 17.575 8.9026 17.2392 8.9026 16.825C8.9026 16.4108 8.56681 16.075 8.1526 16.075V17.575ZM17.8051 10.808C17.3909 10.808 17.0551 11.1438 17.0551 11.558C17.0551 11.9722 17.3909 12.308 17.8051 12.308V10.808ZM23.893 12.308C24.3072 12.308 24.643 11.9722 24.643 11.558C24.643 11.1438 24.3072 10.808 23.893 10.808V12.308ZM1 6.25C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75V6.25ZM4.05175 7.75C4.46596 7.75 4.80175 7.41421 4.80175 7C4.80175 6.58579 4.46596 6.25 4.05175 6.25V7.75ZM1.975 9.25C1.56079 9.25 1.225 9.58579 1.225 10C1.225 10.4142 1.56079 10.75 1.975 10.75V9.25ZM3.925 10.75C4.33921 10.75 4.675 10.4142 4.675 10C4.675 9.58579 4.33921 9.25 3.925 9.25V10.75ZM2.56975 12.25C2.15554 12.25 1.81975 12.5858 1.81975 13C1.81975 13.4142 2.15554 13.75 2.56975 13.75V12.25ZM3.925 13.75C4.33921 13.75 4.675 13.4142 4.675 13C4.675 12.5858 4.33921 12.25 3.925 12.25V13.75ZM17.8032 16.076H12.31V17.576H17.8032V16.076ZM18.5571 16.826V11.559H17.0571V16.826H18.5571ZM17.8071 17.576H18.0518V16.076H17.8071V17.576ZM22.2215 17.5758C23.8876 17.5397 25.1791 16.1341 25.1499 14.4718L23.6501 14.4982C23.6655 15.3704 22.9939 16.0587 22.189 16.0762L22.2215 17.5758ZM25.1389 14.3565L24.63 11.4305L23.1521 11.6875L23.6611 14.6135L25.1389 14.3565ZM17.8031 7.627H21.2849V6.127H17.8031V7.627ZM21.2897 7.62698C21.6768 7.62448 22.0522 7.7847 22.327 8.07731L23.4204 7.05042C22.8641 6.4581 22.0909 6.12177 21.28 6.12702L21.2897 7.62698ZM22.327 8.07731C22.6025 8.37065 22.7519 8.7712 22.7342 9.18603L24.2328 9.24997C24.2675 8.43728 23.976 7.642 23.4204 7.05042L22.327 8.07731ZM22.7446 9.34663L23.1522 11.6876L24.6299 11.4304L24.2224 9.08937L22.7446 9.34663ZM17.0531 6.877V11.559H18.5531V6.877H17.0531ZM18.5531 6.877V6.077H17.0531V6.877H18.5531ZM18.5531 6.0818C18.5562 5.60485 18.3745 5.14259 18.0422 4.79768L16.9619 5.83829C17.0188 5.8974 17.0537 5.98123 17.0532 6.0722L18.5531 6.0818ZM18.0422 4.79768C17.7094 4.45212 17.2522 4.25277 16.77 4.25001L16.7615 5.74999C16.8331 5.7504 16.9056 5.77984 16.9619 5.83829L18.0422 4.79768ZM16.7657 4.25H7.42037V5.75H16.7657V4.25ZM7.41679 4.25001C6.93498 4.25231 6.4778 4.45098 6.14467 4.79587L7.22355 5.83799C7.27989 5.77967 7.3524 5.75033 7.42396 5.74999L7.41679 4.25001ZM6.14467 4.79587C5.81216 5.1401 5.62983 5.60177 5.63201 6.07843L7.13199 6.07158C7.13158 5.98066 7.16659 5.89696 7.22355 5.83799L6.14467 4.79587ZM5.632 6.075V15.75H7.132V6.075H5.632ZM5.63201 15.7466C5.62983 16.2232 5.81216 16.6849 6.14467 17.0291L7.22355 15.987C7.16659 15.928 7.13158 15.8443 7.13199 15.7534L5.63201 15.7466ZM6.14467 17.0291C6.4778 17.374 6.93498 17.5727 7.41679 17.575L7.42396 16.075C7.3524 16.0747 7.27988 16.0453 7.22355 15.987L6.14467 17.0291ZM7.42037 17.575H8.1526V16.075H7.42037V17.575ZM17.8051 12.308H23.893V10.808H17.8051V12.308ZM1 7.75H4.05175V6.25H1V7.75ZM1.975 10.75H3.925V9.25H1.975V10.75ZM2.56975 13.75H3.925V12.25H2.56975V13.75Z"
                fill="#000000"
              ></path>
            </g>
          </svg>
          <p className="ms-3 font-inter">Free shipping</p>
        </div>
      </div>
      <div className="flex md:flex-col justify-between md:justify-start mt-4">
        <div className="flex items-center">
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="w-[30px] h-[30px]"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M11 5H19L17.1547 2.42858C16.9634 2.16232 16.6093 1.99879 16.2267 2.00001H11V5ZM9 2.00001H3.77333C3.39074 1.99879 3.03663 2.16232 2.84533 2.42858L1 5H9V2.00001ZM1 7V17.5C1 18.3284 1.67156 19 2.49997 19L8.5 19C9.5 19 10 18 10 18C10.0005 17.4658 10.0032 16.9327 10.0097 16.5C10.0097 12.9159 12.9234 10 16.5048 10H18C18 10 19 10 19 9V7H1ZM20 13C20 12.4477 19.5523 12 19 12C18.4477 12 18 12.4477 18 13V14C18 15.1046 17.1046 16 16 16H15.4142L15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929C15.3166 13.9024 14.6834 13.9024 14.2929 14.2929L12.2929 16.2929C11.9024 16.6834 11.9024 17.3166 12.2929 17.7071L14.2929 19.7071C14.6834 20.0976 15.3166 20.0976 15.7071 19.7071C16.0976 19.3166 16.0976 18.6834 15.7071 18.2929L15.4142 18H16C18.2091 18 20 16.2091 20 14V13Z"
                fill="#000000"
              ></path>
            </g>
          </svg>
          <p className="ms-3 md:ms-[18px] font-inter">Free returns</p>
        </div>
        <div className="flex items-center md:mt-5">
          <svg
            viewBox="0 0 512 512"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            className="w-8 h-8"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>rocket-filled</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="icon"
                  fill="#000000"
                  transform="translate(42.666667, 64.000000)"
                >
                  <path
                    d="M405.333333,1.42108547e-14 C396.316305,122.794806 364.316305,211.683695 309.333333,266.666667 C299.582265,276.417735 288.905446,285.33185 277.302879,293.409011 L277.302464,341.234872 L213.302464,405.234872 L174.248,336.891 L68.525,231.157 L7.10542736e-15,192 L64,128 L112.079613,128.000404 C120.083859,116.387258 128.94621,105.720457 138.666667,96 C193.649638,41.0170286 282.538527,9.01702859 405.333333,1.42108547e-14 Z M136.329915,329.707793 L166.499804,359.877683 L121.24497,405.132517 L91.0750809,374.962627 L136.329915,329.707793 Z M91.0750809,284.452959 L121.24497,314.622849 L45.8202469,390.047572 L15.6503576,359.877683 L91.0750809,284.452959 Z M45.8202469,239.198125 L75.9901363,269.368015 L30.7353023,314.622849 L0.565412939,284.452959 L45.8202469,239.198125 Z M245.333333,128 C227.660221,128 213.333333,142.326888 213.333333,160 C213.333333,177.673112 227.660221,192 245.333333,192 C263.006445,192 277.333333,177.673112 277.333333,160 C277.333333,142.326888 263.006445,128 245.333333,128 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
          <p className="ms-3 md:ms-[17px] font-inter">Fast delivery</p>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({ product }: { product: Product }) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/api/products/related?id=${product.id}&type=${product.type}&gender=${product.gender}`
    )
      .then((res) => res.json())
      .then((products) => setRelatedProducts(products.slice(0, 4)));
  }, []);

  return (
    <div className="w-fit">
      <h3 className="mt-4 font-inter text-center text-2xl">Related products</h3>
      {relatedProducts.length > 0 ? (
        <div
          className={`mt-2 lg:mt-4 grid grid-cols-1 ${relatedProducts.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"} lg:grid-cols-${relatedProducts.length} gap-y-5 lg:gap-y-10 md:gap-x-10`}
        >
          {relatedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              smallCardSizeStyle={{ height: "h-[340px]", width: "w-[250px]" }}
              mediumCardSizeStyle={{
                height: "md:h-[300px]",
                width: "md:w-[200px]",
              }}
              largeCardSizeStyle={{
                height: "xl:h-[400px]",
                width: "xl:w-[275px]",
              }}
              customOuterDivStyle="xl:text-[15px]"
            />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-center">No related products found.</p>
      )}
    </div>
  );
}
