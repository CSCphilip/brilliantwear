interface ProductProps {
  brand: string;
  category: string;
  price: number;
  image_url: string;
}

const Product = ({ brand, category, price, image_url }: ProductProps) => {
  image_url = image_url.replaceAll("/", "%2F"); // This is needed to handle the image URL correctly
  return (
    <div className="product">
      <img
        src={"http://localhost:3000/get-image/" + image_url}
        alt="The image of the product."
      ></img>
      <div className="product-description">
        <h5>Brand: {brand}</h5>
        <h6>Category: {category}</h6>
        <h6>Price: {price} kr</h6>
      </div>
    </div>
  );
};

export default Product;
