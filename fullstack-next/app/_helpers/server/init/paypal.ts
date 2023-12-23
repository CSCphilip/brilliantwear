import log from "_utilities/log";
import { parameterRetrieve } from ".";

export async function getPaypalClientId() {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Trying to retrieve the PayPal Client ID from the .env file");

      const paypalClientIdKey = process.env.PAYPAL_CLIENT_ID;

      if (paypalClientIdKey !== undefined) {
        log("Successfully retrieved the PayPal Client ID the .env file");

        return paypalClientIdKey;
      } else {
        throw new Error(
          "Could not retrieve the PayPal Client ID from the .env file"
        );
      }
    } else {
      log("Trying to retrieve the PayPal Client ID from AWS SSM");

      const paypalClientIdKey = await parameterRetrieve(
        "Brilliantwear-PayPal-Client-Id-Sandbox" // NOTE: Sandbox only, change when wanting to take real payments.
      );

      if (paypalClientIdKey !== undefined) {
        return paypalClientIdKey;
      } else {
        throw new Error("Could not retrieve the PayPal Client ID from AWS SSM");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function getPaypalClientSecret() {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Trying to retrieve the PayPal Client Secret from the .env file");

      const paypalClientSecretKey = process.env.PAYPAL_CLIENT_SECRET;

      if (paypalClientSecretKey !== undefined) {
        log("Successfully retrieved the PayPal Client Secret the .env file");

        return paypalClientSecretKey;
      } else {
        throw new Error(
          "Could not retrieve the PayPal Client Secret from the .env file"
        );
      }
    } else {
      log("Trying to retrieve the PayPal Client Secret from AWS SSM");

      const paypalClientSecretKey = await parameterRetrieve(
        "Brilliantwear-PayPal-Client-Secret-Sandbox" // NOTE: Sandbox only, change when wanting to take real payments.
      );

      if (paypalClientSecretKey !== undefined) {
        return paypalClientSecretKey;
      } else {
        throw new Error(
          "Could not retrieve the PayPal Client Secret from AWS SSM"
        );
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
