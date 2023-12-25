import log from "_utilities/log";
import { parameterRetrieve } from ".";

export async function getPostnordApiKey() {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Trying to retrieve the PostNord API key from the .env file");

      const postnordApiKey = process.env.POSTNORD_API_KEY;

      if (postnordApiKey !== undefined) {
        log("Successfully retrieved the PostNord API key the .env file");

        return postnordApiKey;
      } else {
        throw new Error(
          "Could not retrieve the PostNord API key from the .env file"
        );
      }
    } else {
      log("Trying to retrieve the PostNord API key from AWS SSM");

      const postnordApiKey = await parameterRetrieve(
        "Brilliantwear-PostNord-API-Key"
      );

      if (postnordApiKey !== undefined) {
        return postnordApiKey;
      } else {
        throw new Error("Could not retrieve the PostNord API key from AWS SSM");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
