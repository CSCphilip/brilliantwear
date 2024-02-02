import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import { shuffleArray } from "_utilities";

module.exports = apiHandler({
  GET: get,
});

// http://localhost:3000/api/products/woman?page=1&shuffle=true&typeFilter=Pants&order=priceAsc
// order (sorting): priceAsc, priceDesc, latest, oldest

async function get(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  const typeFilter = searchParams.get("typeFilter");
  const typeFilterQuery =
    typeFilter && typeFilter !== "All" ? { type: typeFilter } : {};

  const order = searchParams.get("order");

  let womanProductsPagination;

  if (!order || order === "latest") {
    womanProductsPagination = await productsRepo.getLatest(
      parseInt(page as string),
      {
        gender: { $in: ["Woman", "Unisex"] },
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
    womanProductsPagination = await productsRepo.get(
      parseInt(page as string),
      sortOptions,
      {
        gender: { $in: ["Woman", "Unisex"] },
        ...typeFilterQuery,
      }
    );
  }

  const shuffle = searchParams.get("shuffle");
  const shuffledProducts =
    shuffle && shuffle === "true"
      ? shuffleArray(womanProductsPagination.products)
      : null;

  if (shuffledProducts) {
    return {
      ...womanProductsPagination,
      products: shuffledProducts,
    };
  } else {
    return womanProductsPagination;
  }
}
