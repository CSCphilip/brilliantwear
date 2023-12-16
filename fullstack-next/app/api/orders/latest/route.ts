import { apiHandler } from "_helpers/server/api";
import { ordersRepo } from "_helpers/server";

module.exports = apiHandler({
  GET: getLatest,
});

async function getLatest(req: Request) {
  return await ordersRepo.getAllLatest();
}
