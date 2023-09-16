const OpenAI = require("openai");
const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "Brilliantwear-OpenAI-API-Key";

// Create an async function to retrieve the OpenAI API key
async function getOpenAIApiKey() {
  try {
    const data = await ssm.getParameter({ Name: parameterName }).promise();
    return data.Parameter.Value;
  } catch (err) {
    console.error("Error:", err);
    throw err; // Handle the error appropriately in your application
  }
}

// Define an async function to initialize OpenAI with the API key
async function initializeOpenAI() {
  const openaiApiKey = await getOpenAIApiKey();

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  return openai;
}

module.exports = { initializeOpenAI };
