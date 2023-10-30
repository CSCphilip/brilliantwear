import OpenAI from "openai";
import AWS from "aws-sdk";

require("dotenv").config();

AWS.config.update({ region: "eu-north-1" });
const ssm = new AWS.SSM();
const parameterName = "Brilliantwear-OpenAI-API-Key";

// Create an async function to retrieve the OpenAI API key
async function getOpenAIApiKey() {
  // try {
  //   console.log("Trying to retrieve the OpenAI API key from AWS");

  //   const data = await ssm.getParameter({ Name: parameterName }).promise();
  //   console.log("Successfully retrieved the OpenAI API key from AWS");

  //   return data.Parameter?.Value;
  // } catch (err) {
  //   console.log("Could not retrieve the OpenAI API key from AWS");
  //   console.error("Error:", err);
  // }

  try {
    // For development:
    console.log("Trying to retrieve the OpenAI API key from the environment");

    const openaiApiKey = process.env.OPENAI_API_KEY;
    console.log(
      "Successfully retrieved the OpenAI API key from the environment"
    );

    return openaiApiKey;
  } catch (err) {
    console.log("Could not retrieve the OpenAI API key from the environment");
    console.error("Error:", err);
  }
}

// Define an async function to initialize OpenAI with the API key
export async function initializeOpenAI() {
  const openaiApiKey = await getOpenAIApiKey();

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  return openai;
}
