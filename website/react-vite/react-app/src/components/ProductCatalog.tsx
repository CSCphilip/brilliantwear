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

  useEffect(() => {
    fetch("http://localhost:3000/get-latest-products/5")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      })
      .catch((err) => console.log(err)); // Handle any errors here
  }, []); // Empty dependency array to run this effect once, like componentDidMount

  // Render the Product component only when products are available
  const product = products.length > 0 ? products[0] : null;

  return (
    <>
      {product && (
        <Product
          brand={product.brand}
          category={product.category}
          price={product.price}
          image_url={product.image_url}
        />
      )}
    </>
  );
};

export default ProductCatalog;
