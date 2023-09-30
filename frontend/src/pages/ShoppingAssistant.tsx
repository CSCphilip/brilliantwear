import { CSSProperties, useState } from "react";
import { BarLoader } from "react-spinners";

import Product from "../components/Product";

interface ProductType {
  brand: string;
  category: string;
  type: string;
  price: number;
  image_url: string;
}

const overrideCSS: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "50px",
};

const ShoppingAssistant = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Show the loading spinner
    setLoading(true);

    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const userInputProductDescription = formData.get("product-description");

    fetch(
      `http://brilliantwear.se:7000/shopping-assistant/${encodeURIComponent(
        userInputProductDescription as string
      )}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSuggestedProducts(json);

        // Hide the loading spinner
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2 className="shopping-assistant-heading">Shopping Assistant</h2>
      <p className="powered-by-text">Powered by ChatGPT</p>

      <div className="container-fluid d-flex justify-content-center align-items-center">
        <img
          src="icon-search-clothing.png"
          alt="Search clothing"
          className="search-clothing-icon"
        />
      </div>

      <div className="container-fluid custom-container">
        <form
          className="mx-auto shopping-assistant-form"
          onSubmit={handleSubmit}
        >
          <textarea
            className="form-control custom-textarea"
            placeholder="Please provide a description of the clothing product you're seeking"
            name="product-description"
            maxLength={250}
            required
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary submit-button" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      <BarLoader
        aria-label="BarLoader"
        data-testid="loader"
        loading={loading}
        color="blue"
        width={300}
        cssOverride={overrideCSS}
      />

      {suggestedProducts.length > 0 && (
        <h3 className="text-center suggested-products-text">
          Suggested Products
        </h3>
      )}

      <div className="container suggested-products-container">
        {suggestedProducts.map((product, index) => (
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
    </div>
  );
};

export default ShoppingAssistant;
