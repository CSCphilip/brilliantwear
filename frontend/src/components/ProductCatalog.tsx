import { useEffect, useState } from "react";
import Product from "./Product";

// Define the type of a single product
interface ProductType {
  brand: string;
  category: string;
  type: string;
  price: number;
  image_url: string;
}

// This is a React component:
const ProductCatalog = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [type, setType] = useState<string>("All");

  useEffect(() => {
    fetch("http://brilliantwear.se:7000/get-all-products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      })
      .catch((err) => console.log(err)); // Handle any errors here
  }, []); // Empty dependency array to run this effect once, like componentDidMount

  return (
    <>
      <h2 className="catalog-heading">Product Catalog</h2>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              className={
                type === "All" ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => setType("All")}
            >
              All products
            </button>
          </li>
          <li>
            <button
              className={
                type === "Shoe" ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => setType("Shoe")}
            >
              Shoes
            </button>
          </li>
          <li>
            <button
              className={
                type === "Jacket" ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => setType("Jacket")}
            >
              Jackets
            </button>
          </li>
          <li>
            <button
              className={
                type === "Pants" ? "dropdown-item active" : "dropdown-item"
              }
              type="button"
              onClick={() => setType("Pants")}
            >
              Pants
            </button>
          </li>
        </ul>
      </div>
      <div className="container products-container">
        {products
          .filter((product) => type === "All" || product.type === type) // Filter products based on type
          .map((product, index) => (
            <Product
              key={index}
              brand={product.brand}
              category={product.category}
              type={product.type}
              price={product.price}
              image_url={product.image_url}
            />
          ))}
      </div>
    </>
  );
};

export default ProductCatalog;
