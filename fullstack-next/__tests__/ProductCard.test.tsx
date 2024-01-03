import { render, screen } from "@testing-library/react";
import ProductCard from "../app/_components/ProductCard";

describe("ProductCard text tests", () => {
  it("should have brand text", () => {
    // NOTE: Triple A (Arrange, Act, Assert) testing pattern applied.

    // ARRANGE
    render(
      <ProductCard
        id={
          "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
        }
        brand="Unknown"
        category="High heels"
        type="Shoe"
        price={1399}
        image_url="shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
      />
    );

    // ACT
    const brandElement = screen.getByText(/Brand/);

    // ASSERT
    expect(brandElement).toBeInTheDocument();
  });

  it("should have category text", () => {
    render(
      <ProductCard
        id={
          "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
        }
        brand="Unknown"
        category="High heels"
        type="Shoe"
        price={1399}
        image_url="shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
      />
    );

    const categoryElement = screen.getByText(/Category/);

    expect(categoryElement).toBeInTheDocument;
  });

  it("should have type text", () => {
    render(
      <ProductCard
        id={
          "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
        }
        brand="Unknown"
        category="High heels"
        type="Shoe"
        price={1399}
        image_url="shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
      />
    );

    const typeElement = screen.getByText(/Type/);

    expect(typeElement).toBeInTheDocument();
  });

  it("should have price text", () => {
    render(
      <ProductCard
        id={
          "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
        }
        brand="Unknown"
        category="High heels"
        type="Shoe"
        price={1399}
        image_url="shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
      />
    );

    const priceElement = screen.getByText(/Price/);

    expect(priceElement).toBeInTheDocument();
  });
});

describe("ProductCard link", () => {
  beforeEach(() => {
    render(
      <ProductCard
        id={
          "shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
        }
        brand="Unknown"
        category="High heels"
        type="Shoe"
        price={1399}
        image_url="shoe_blue_style_footwear_fashion_female_pair_girl-1194422-1856815178"
      />
    );
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
