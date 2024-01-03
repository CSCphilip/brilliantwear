import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCatalog from "../app/(public)/products/page";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("ProductCatalog", () => {
  it("should have a heading", async () => {
    render(<ProductCatalog />); // ARRANGE

    const headingElement = await screen.findByRole("heading"); // ACT

    expect(headingElement).toBeInTheDocument(); // ASSERT

    // We could also have done this:
    // waitFor(() => {
    //     const headingElement = screen.getByRole("heading");
    //   expect(headingElement).toBeInTheDocument();
    // });
  });

  it("should have a page number select", async () => {
    render(<ProductCatalog />);

    const selectElement = await screen.findByRole("combobox");

    expect(selectElement).toBeInTheDocument();
  });

  it("should have a previous button", async () => {
    render(<ProductCatalog />);

    const previousButton = await screen.findByRole("button", { name: /prev/i });

    expect(previousButton).toBeInTheDocument();
  });

  it("should have a next button", async () => {
    render(<ProductCatalog />);

    const nextButton = await screen.findByRole("button", {
      name: /next/i,
    });

    expect(nextButton).toBeInTheDocument();
  });
});
