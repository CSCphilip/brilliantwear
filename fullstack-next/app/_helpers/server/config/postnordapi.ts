import AWS from "aws-sdk";

require("dotenv").config();

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "Brilliantwear-PostNord-API-Key";

export async function getPostNordApiKey() {
  //   try {
  //     console.log("Trying to retrieve the PostNord API key from AWS");

  //     const data = await ssm.getParameter({ Name: parameterName }).promise();
  //     console.log("Successfully retrieved the PostNord API key from AWS");

  //     return data.Parameter?.Value;
  //   } catch (err) {
  //     console.log("Could not retrieve the PostNord API key from AWS");
  //     console.error("Error:", err);
  //   }

  try {
    // For development:
    console.log("Trying to retrieve the PostNord API key from the environment");

    const postnordApiKey = process.env.POSTNORD_API_KEY;
    console.log(
      "Successfully retrieved the PostNord API key from the environment"
    );

    return postnordApiKey;
  } catch (err) {
    console.log("Could not retrieve the PostNord API key from the environment");
    console.error("Error:", err);
  }
}
