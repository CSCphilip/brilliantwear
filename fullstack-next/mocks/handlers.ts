import { rest } from "msw";

export const handlers = [
  rest.get("*/api/products/latest", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pagination: {
          used: false,
          total_products: 20,
          page: null,
          total_pages: null,
          per_page: null,
          products_skipped: null,
        },
        products: [
          {
            brand: "Unknown",
            category: "Leather",
            type: "Jacket",
            price: 1249,
            image_url: "/images/leather1-2382875926.jpg",
            id: "leather1-2382875926",
          },
        ],
      })
    );
  }),
];
