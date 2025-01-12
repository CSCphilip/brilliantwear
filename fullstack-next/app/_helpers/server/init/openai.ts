import OpenAI from "openai";
import { parameterRetrieve } from ".";
import log from "_utilities/log";

async function getOpenAIApiKey() {
  try {
    if (process.env.NODE_ENV === "development") {
      log("Trying to retrieve the OpenAI API key from the .env file");

      const openaiApiKey = process.env.OPENAI_API_KEY;

      if (openaiApiKey !== undefined) {
        log("Successfully retrieved the OpenAI API key the .env file");

        return openaiApiKey;
      } else {
        throw new Error(
          "Could not retrieve the OpenAI API key from the .env file"
        );
      }
    } else {
      log("Trying to retrieve the OpenAI API key from AWS SSM");

      const openaiApiKey = await parameterRetrieve(
        "Brilliantwear-OpenAI-API-Key"
      );

      if (openaiApiKey !== undefined) {
        return openaiApiKey;
      } else {
        throw new Error("Could not retrieve the OpenAI API key from AWS SSM");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function initializeOpenAI() {
  const openaiApiKey = await getOpenAIApiKey();

  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  return openai;
}
