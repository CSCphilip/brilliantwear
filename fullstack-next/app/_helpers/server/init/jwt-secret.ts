import { Secret } from "jsonwebtoken";
import { parameterRetrieve } from ".";
import log from "_utilities/log";

export async function getJwtSecret(): Promise<Secret | undefined> {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Trying to retrieve the JWT Secret from the .env file");

      const jwtSecret = process.env.JWT_SECRET;

      if (jwtSecret !== undefined) {
        log("Successfully retrieved the JWT Secret the .env file");

        return jwtSecret;
      } else {
        throw new Error("Could not retrieve the JWT Secret from the .env file");
      }
    } else {
      log("Trying to retrieve the JWT Secret from AWS SSM");

      const jwtSecret = await parameterRetrieve(
        "Brilliantwear-Fullstack-Next-JWT-Secret"
      );

      if (jwtSecret !== undefined) {
        return jwtSecret;
      } else {
        throw new Error("Could not retrieve the JWT Secret from AWS SSM");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
