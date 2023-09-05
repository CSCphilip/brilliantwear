import { useEffect, useState } from "react";
import Product from "./Product";

// Define the type of a single product
interface ProductType {
  brand: string;
  category: string;
  price: number;
  image_url: string;
}

// This is a React component:
const ProductCatalog = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const numberOfProducts = 100; // TODO: Change this and use another API below.

  useEffect(() => {
    fetch("http://localhost:3000/get-latest-products/" + numberOfProducts)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      })
      .catch((err) => console.log(err)); // Handle any errors here
  }, []); // Empty dependency array to run this effect once, like componentDidMount

  return (
    <div className="products-container">
      {products.map((product, index) => (
        <Product
          key={index}
          brand={product.brand}
          category={product.category}
          price={product.price}
          image_url={product.image_url}
        />
      ))}
    </div>
  );
};

export default ProductCatalog;
