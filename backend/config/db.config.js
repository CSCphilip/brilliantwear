const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "Brilliantwear-MongoDB-Password";

async function getMongoDBConfig() {
  try {
    const data = await ssm.getParameter({ Name: parameterName }).promise();

    return {
      HOST: "mongo", // Docker service name where MongoDB is running
      PORT: 27017,
      DB: "brilliantwear",
      USERNAME: "philip",
      PASSWORD: data.Parameter.Value,
    };
  } catch (error) {
    console.error("Error retrieving MongoDB configuration:", error);
    throw error;
  }
}

module.exports = getMongoDBConfig;
