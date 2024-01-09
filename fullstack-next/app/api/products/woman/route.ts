import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import { shuffleArray } from "_utilities";

module.exports = apiHandler({
  GET: get,
});

async function get(req: Request) {
  const womanProductsPagination = await productsRepo.get(undefined, {
    gender: { $in: ["Woman", "Unisex"] },
  });

  const { searchParams } = new URL(req.url);
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
