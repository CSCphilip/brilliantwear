import { NextRequest } from "next/server";
import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";

module.exports = apiHandler({
  GET: getLatest,
});

async function getLatest(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  return await productsRepo.getLatest(parseInt(page as string));
}
