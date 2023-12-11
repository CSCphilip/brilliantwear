import { getPaypalClientId, getPaypalClientSecret } from "../config";

// The code in this file is based on: https://developer.paypal.com/docs/checkout/standard/integrate/#link-integratebackend

export const paypalBase = "https://api-m.sandbox.paypal.com"; //NOTE: Change when going live

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
export async function generateAccessToken() {
  try {
    const PAYPAL_CLIENT_ID = await getPaypalClientId();
    const PAYPAL_CLIENT_SECRET = await getPaypalClientSecret();

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }

    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");

    const response = await fetch(`${paypalBase}/v1/oauth2/token`, {
      method: "POST",

      body: "grant_type=client_credentials",

      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    throw new Error("Failed to generate Access Token: " + error);
  }
}

export async function handleResponse(response: any) {
  try {
    const jsonResponse = await response.json();

    return {
      ...jsonResponse,

      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }
}
