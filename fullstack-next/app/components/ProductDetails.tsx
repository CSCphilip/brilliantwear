import ProductButton from "./ProductButton";
import { Product as ProductProps } from "../types/types";

const ProductDetails = ({
  id,
  brand,
  category,
  type,
  price,
  image_url,
}: ProductProps) => {
  return (
    <div style={{ border: "1px solid black", margin: "20px", padding: "20px" }}>
      <h4>{brand}</h4>
      <p>{category}</p>
      <p>{type}</p>
      <p>{price} kr</p>
      <img
        src={
          "https://api.brilliantwear.se/get-image/" +
          encodeURIComponent(image_url)
        }
        alt="The image of the product."
        style={{ height: "100px", border: "1px solid black" }}
      />
      <ProductButton id={id} />
    </div>
  );
};

export default ProductDetails;
