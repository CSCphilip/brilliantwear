import { NextResponse } from "next/server";
import {
  paypalBase,
  generateAccessToken,
  handleResponse,
} from "_helpers/server/api/orders";

export async function POST(req: Request, { params: { orderID } }: any) {
  try {
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    return NextResponse.json(jsonResponse);
    // res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    return new NextResponse("Failed to capture order.", { status: 500 });
    // res.status(500).json({ error: "Failed to capture order." });
  }
}

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();

  const url = `${paypalBase}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:

      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/

      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'

      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};
