import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import { Product } from "_types";

module.exports = apiHandler({
  GET: getRelated,
});

async function getRelated(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");
  const productType = searchParams.get("type"); // Or should I use category like Sneakers?
  const productGender = searchParams.get("gender");

  if (!productId || !productType || !productGender) {
    throw new Error("Missing query parameters");
  }

  const relatedQuery = { type: productType, gender: productGender };

  const relatedProductsPagination = await productsRepo.getLatest(
    undefined,
    relatedQuery
  );

  const relatedProducts = relatedProductsPagination.products.filter(
    (relatedProduct) => relatedProduct.id !== productId
  );

  return relatedProducts;
}
