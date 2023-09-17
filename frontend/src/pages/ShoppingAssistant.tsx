import { useState } from "react";
import Product from "../components/Product";

interface ProductType {
  brand: string;
  category: string;
  type: string;
  price: number;
  image_url: string;
}

const ShoppingAssistant = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<ProductType[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const userInputProductDescription = formData.get("product-description");

    fetch(
      `http://api.brilliantwear.se/shopping-assistant/${encodeURIComponent(
        userInputProductDescription as string
      )}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSuggestedProducts(json);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h2 className="shopping-assistant-heading">
        Shopping Assistant - <i>powered by ChatGPT</i>
      </h2>

      <div className="container-fluid d-flex justify-content-center align-items-center">
        <img
          src="/icon-search-clothing.png"
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
