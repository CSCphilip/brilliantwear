import { apiHandler } from "_helpers/server/api";
import { getPaypalClientId } from "_helpers/server/init";

module.exports = apiHandler({
  GET: clientId,
});

async function clientId(req: Request) {
  try {
    const PAYPAL_CLIENT_ID = await getPaypalClientId();
    return { paypalClientId: PAYPAL_CLIENT_ID };
  } catch (error) {
    throw new Error("Failed to get client ID: " + error);
  }
}
