import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";

module.exports = apiHandler({
  GET: getTypes,
});

async function getTypes() {
  const types = await productsRepo.getTypes();
  return types;
}
