import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";

module.exports = apiHandler({
  GET: getTypes,
});

async function getTypes(req: Request) {
  const { searchParams } = new URL(req.url);
  const genderTypeFilter = searchParams.get("genderTypeFilter");

  let types;

  switch (genderTypeFilter) {
    case "Woman":
      types = await productsRepo.getWomanTypes();
      break;
    case "Man":
      types = await productsRepo.getManTypes();
      break;
    case "Unisex":
      types = await productsRepo.getUnisexTypes();
      break;
    default:
      types = await productsRepo.getAllTypes();
      break;
  }

  return types;
}
