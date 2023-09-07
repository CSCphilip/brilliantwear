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
    fetch("http://api.brilliantwear.se/get-all-products")
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
      {/* TODO: Work on filter feature */}
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
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </div>
      <div className="container">
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
    </>
  );
};

export default ProductCatalog;
