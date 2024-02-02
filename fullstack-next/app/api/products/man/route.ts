import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import { shuffleArray } from "_utilities";

module.exports = apiHandler({
  GET: get,
});

async function get(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  const typeFilter = searchParams.get("typeFilter");
  const typeFilterQuery =
    typeFilter && typeFilter !== "All" ? { type: typeFilter } : {};

  const order = searchParams.get("order");

  let manProductsPagination;

  if (!order || order === "latest") {
    manProductsPagination = await productsRepo.getLatest(
      parseInt(page as string),
      {
        gender: { $in: ["Man", "Unisex"] },
        ...typeFilterQuery,
      }
    );
  } else {
    let sortOptions = {};
    switch (order) {
      case "priceAsc":
        sortOptions = { price: 1 };
        break;
      case "priceDesc":
        sortOptions = { price: -1 };
        break;
    }
    manProductsPagination = await productsRepo.get(
      parseInt(page as string),
      sortOptions,
      {
        gender: { $in: ["Man", "Unisex"] },
        ...typeFilterQuery,
      }
    );
  }

  const shuffle = searchParams.get("shuffle");
  const shuffledProducts =
    shuffle && shuffle === "true"
      ? shuffleArray(manProductsPagination.products)
      : null;

  if (shuffledProducts) {
    return {
      ...manProductsPagination,
      products: shuffledProducts,
    };
  } else {
    return manProductsPagination;
  }
}
