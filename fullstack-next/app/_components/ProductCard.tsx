import Link from "next/link";

import { Product as ProductCardProps } from "_types";
import { formatCurrency } from "_utilities";
import ProductCardImage from "./ProductCardImage";

export default function ProductCard({
  id,
  brand,
  category,
  type,
  price,
  image_url,
}: ProductCardProps) {
  return (
    <div className="flex justify-center">
      <div>
        <Link href={"/products/" + id}>
          <ProductCardImage image_url={image_url} />
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
              <b>Price:</b> {formatCurrency(price)}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
