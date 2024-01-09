import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import { shuffleArray } from "_utilities";

module.exports = apiHandler({
  GET: get,
});

async function get(req: Request) {
  const manProductsPagination = await productsRepo.get(undefined, {
    gender: { $in: ["Man", "Unisex"] },
  });

  const { searchParams } = new URL(req.url);
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
