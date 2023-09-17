const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "";

module.exports = {
  secret: "brilliantwear-secret-key", // TODO: make this harder to guess!! And move it to an environment variable or on AWS SSM.
};
