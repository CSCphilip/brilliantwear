import Link from "next/link";

import { Product as ProductCardProps } from "../types/types";

const ProductCard = ({
  id,
  brand,
  category,
  type,
  price,
  image_url,
}: ProductCardProps) => {
  return (
    <div className="flex justify-center">
      <div>
        <Link href={"/products/" + id}>
          <img
            src={
              "https://api.brilliantwear.se/get-image/" +
              encodeURIComponent(image_url)
            }
            alt="An image of the product."
            className="h-64 w-40 border border-primary"
          />
        </Link>
        <ul className="text-sm">
          <li>
            <p>
              <b>Brand:</b> {brand}
            </p>
          </li>
          <li>
            <p>
              <b>Category:</b> {category}
            </p>
          </li>
          <li>
            <p>
              <b>Type: </b>
              {type}
            </p>
          </li>
          <li>
            <p>
              <b>Price:</b> {price} kr
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
