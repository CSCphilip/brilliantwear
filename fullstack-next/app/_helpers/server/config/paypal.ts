import AWS from "aws-sdk";

require("dotenv").config();

// AWS.config.update({ region: "eu-north-1" });
// const ssm = new AWS.SSM();
// const parameterName1 = "Brilliantwear-PayPal-Client-Id";
// const parameterName2 = "Brilliantwear-PayPal-Client-Secret";

export async function getPaypalClientId() {
  //   try {
  //     console.log("Trying to retrieve the PayPal Client Id from AWS");

  //     const data = await ssm.getParameter({ Name: parameterName }).promise();
  //     console.log("Successfully retrieved the PalPal Client Id from AWS");

  //     return data.Parameter?.Value;
  //   } catch (err) {
  //     console.log("Could not retrieve the PayPal Client Id from AWS");
  //     console.error("Error:", err);
  //   }

  try {
    // For development:
    console.log("Trying to retrieve the PayPal Client Id from the environment");

    const paypalClientIdKey = process.env.PAYPAL_CLIENT_ID;

    console.log(
      "Successfully retrieved the PayPal Client Id from the environment"
    );

    return paypalClientIdKey;
  } catch (err) {
    console.log("Could not retrieve the PayPal Client Id from the environment");
    console.error("Error:", err);
  }
}

export async function getPaypalClientSecret() {
  //   try {
  //     console.log("Trying to retrieve the PayPal Client Secret from AWS");

  //     const data = await ssm.getParameter({ Name: parameterName }).promise();
  //     console.log("Successfully retrieved the PayPal Client Secret from AWS");

  //     return data.Parameter?.Value;
  //   } catch (err) {
  //     console.log("Could not retrieve the PayPal Client Secret from AWS");
  //     console.error("Error:", err);
  //   }

  try {
    console.log(
      "Trying to retrieve the PayPal Client Secret from the environment"
    );

    const paypalClientSecretKey = process.env.PAYPAL_CLIENT_SECRET;
    console.log(
      "Successfully retrieved the PayPal Client Secret from the environment"
    );
    return paypalClientSecretKey;
  } catch (err) {
    console.log(
      "Could not retrieve the PayPal Client Secret from the environment"
    );
    console.error("Error:", err);
  }
}
