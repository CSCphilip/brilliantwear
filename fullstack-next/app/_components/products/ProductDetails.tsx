import ProductButton from "./ProductButton";
import { Product as ProductProps } from "_types";

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
      <p>
        <b>Brand:</b> {brand}
      </p>
      <p>
        <b>Category:</b> {category}
      </p>
      <p>
        <b>Type:</b> {type}
      </p>
      <p>
        <b>Price:</b> {price} kr
      </p>
      <img
        src={
          "http://localhost:3000/api/products/image/" +
          encodeURIComponent(image_url)
        }
        alt="The image of the product."
        className="h-[200px] mt-3"
      />
      <ProductButton id={id} />
    </div>
  );
};

export default ProductDetails;
