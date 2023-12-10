import joi from "joi";
import { apiHandler } from "_helpers/server/api";
import {
  generateAccessToken,
  paypalBase,
  handleResponse,
} from "_helpers/server/api/orders";

module.exports = apiHandler({
  POST: orders,
});

async function orders(req: Request) {
  try {
    // use the cart information passed from the front-end to calculate the order amount details
    const { cart } = await req.json();

    const { jsonResponse, httpStatusCode } = await createOrder(cart);

    // res.status(httpStatusCode).json(jsonResponse); // From the original code (PayPal example)
    return jsonResponse;
  } catch (error) {
    throw new Error("Failed to create order: " + error);
    // console.error("Failed to create order:", error);
    // res.status(500).json({ error: "Failed to create order." }); // From the original code (PayPal example)
  }
}

orders.schema = joi.object({}); // TODO: add schema

// The following code is based on: https://developer.paypal.com/docs/checkout/standard/integrate/#link-integratebackend

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart: any) => {
  // use the cart information passed from the front-end to calculate the purchase unit details

  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart
  );

  const accessToken = await generateAccessToken();

  const url = `${paypalBase}/v2/checkout/orders`;

  const payload = {
    intent: "CAPTURE",

    purchase_units: [
      {
        amount: {
          currency_code: "SEK",

          value: "100",
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },

    method: "POST",

    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};
