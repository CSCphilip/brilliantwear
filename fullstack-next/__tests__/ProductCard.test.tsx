import { render, screen } from "@testing-library/react";
import ProductCard from "../app/_components/ProductCard";
import { Product } from "_types";

const product: Product = {
  id: "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178",
  brand: "Unknown",
  category: "High heels",
  type: "Shoe",
  price: 1399,
  image_url:
    "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178",
  gender: "Woman",
};

describe("ProductCard text tests", () => {
  it("should have brand text", () => {
    // NOTE: Triple A (Arrange, Act, Assert) testing pattern applied.

    // ARRANGE
    render(<ProductCard product={product} />);

    // ACT
    const brandElement = screen.getByText(/Unknown/);

    // ASSERT
    expect(brandElement).toBeInTheDocument();
  });

  it("should have price text", () => {
    render(<ProductCard product={product} />);

    const priceElement = screen.getByText(/1 399,00 kr/);

    expect(priceElement).toBeInTheDocument();
  });
});

describe("ProductCard link", () => {
  beforeEach(() => {
    render(<ProductCard product={product} />);
  });

  it("should have link to product page", () => {
    const linkElement = screen.getByRole("link");

    expect(linkElement).toBeInTheDocument();
  });

  it("should only have one link in ProductCard", () => {
    const linkElements = screen.getAllByRole("link");

    expect(linkElements).toHaveLength(1);
  });
});
