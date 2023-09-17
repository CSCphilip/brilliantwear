const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "Brilliantwear-JWT-Secret-Key";

async function getJWTSecretKey() {
  try {
    console.log("Trying to retrieve the JWT Secret key from AWS");

    const data = await ssm.getParameter({ Name: parameterName }).promise();
    console.log("Successfully retrieved the JWT Secret key from AWS");

    return data.Parameter.Value;
  } catch (err) {
    console.log("Could not retrieve the JWT Secret key from AWS");
    console.error("Error:", err);
  }

  try {
    // For development:
    console.log("Trying to retrieve the JWT Secret key from the environment");

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(
      "Successfully retrieved the JWT Secret key from the environment"
    );

    return jwtSecretKey;
  } catch (err) {
    console.log("Could not retrieve the JWT Secret key from the environment");
    console.error("Error:", err);
    throw err;
  }
}

module.exports = { getJWTSecretKey };
