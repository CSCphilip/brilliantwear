import { NextResponse } from "next/server";
import {
  paypalBase,
  generateAccessToken,
  handleResponse,
} from "_helpers/server/api/orders";
import { ordersRepo } from "_helpers/server";
import log from "_utilities/log";

export async function POST(req: Request, { params: { id } }: any) {
  try {
    const jsonResponse = await captureOrder(id);

    log("Response for capture order: " + jsonResponse);

    if (jsonResponse.httpStatusCode === 201) {
      await updateOrderInDatabase(jsonResponse);
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

/**
 * The code for this function is based on: https://developer.paypal.com/docs/checkout/standard/integrate/#link-integratebackend
 *
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (id: string) => {
  const accessToken = await generateAccessToken();

  const url = `${paypalBase}/v2/checkout/orders/${id}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,

      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation: https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}',
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });

  return handleResponse(response);
};

async function updateOrderInDatabase(paypalCapture: any) {
  const id = paypalCapture.id;

  await ordersRepo.update(id, {
    status: paypalCapture.status,
    isPaid: true,
    paypalCapture,
  });
}
