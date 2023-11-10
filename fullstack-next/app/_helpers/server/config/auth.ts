// import AWS from "aws-sdk";
import { Secret } from "jsonwebtoken";

// AWS.config.update({ region: "eu-north-1" });
// const ssm = new AWS.SSM();
// const parameterName = "Brilliantwear-Fullstack-Next-JWT-Secret";

let cachedJwtSecret: Secret | null = null; // To cache the JWT secret

export async function getJwtSecret(): Promise<Secret> {
  if (cachedJwtSecret !== null) {
    // If the secret is already cached, return it immediately
    return cachedJwtSecret;
  }

  // try {
  //   console.log("Trying to retrieve the JWT Secret from AWS");

  //   const data = await ssm.getParameter({ Name: parameterName }).promise();
  //   console.log("Successfully retrieved the JWT Secret from AWS");

  //   // Cache the secret and return it
  //   cachedJwtSecret = data.Parameter!.Value as Secret;
  //   return cachedJwtSecret;
  // } catch (err) {
  //   console.log("Could not retrieve the JWT Secret from AWS");
  //   console.error("Error:", err);
  // }

  try {
    // For development:
    console.log("Trying to retrieve the JWT Secret from the environment");

    const jwtSecret = process.env.JWT_SECRET as Secret;
    console.log("Successfully retrieved the JWT Secret from the environment");

    // Cache the secret and return it
    cachedJwtSecret = jwtSecret as Secret;

    return jwtSecret;
  } catch (err) {
    console.log("Could not retrieve the JWT Secret from the environment");
    console.error("Error:", err);
    throw err;
  }
}
