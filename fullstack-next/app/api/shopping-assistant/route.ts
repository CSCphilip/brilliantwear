import { productsRepo } from "_helpers/server";
import { initializeOpenAI } from "_helpers/server/init";
import log from "_utilities/log";
import { NextResponse } from "next/server";
import OpenAI from "openai";

let openaiInstance: OpenAI;

initializeOpenAI()
  .then((openai) => {
    openaiInstance = openai;
  })
  .catch((error) => {
    console.error("Error initializing OpenAI:", error);
  });

export async function POST(request: Request) {
  const reqBody = await request.json();
  const userInput = reqBody.userInput;

  try {
    if (!openaiInstance) {
      throw new Error("OpenAI is not initialized.");
    }

    const suggestedProducts =
      await fetchProductSuggestionsFromChatGPT(userInput);

    if (suggestedProducts === "NO_SUGGESTIONS_FOUND") {
      return NextResponse.json({
        message:
          "No products were found in the database matching the user's input.",
        status: 404,
      });
    }

    const JSONsuggestedProducts = JSON.parse(suggestedProducts);

    log(JSONsuggestedProducts);

    return NextResponse.json(JSONsuggestedProducts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

async function fetchProductSuggestionsFromChatGPT(
  userInput: string
): Promise<string> {
  log(
    "Trying to fetch product suggestions from ChatGPT based on the user's input."
  );
  log("User's input: " + userInput);

  try {
    const paginationAndProducts = await productsRepo.getLatest();
    const allLatestProducts = paginationAndProducts.products;

    const chatCompletion = await openaiInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: generateContent(
            JSON.stringify(allLatestProducts),
            userInput
          ),
        },
        { role: "user", content: userInput },
      ],
      model: "gpt-3.5-turbo", // Points to the latest version of the GPT-3.5 model
    });

    log("Response from ChatGPT:");
    log(chatCompletion);
    log(chatCompletion.choices);

    if (chatCompletion.choices[0].message.content?.charAt(0) !== "[") {
      console.error(
        "ChatGPT did not return a JSON array. Probably because there were no products in the database mathing the input from the user."
      );
      return "NO_SUGGESTIONS_FOUND";
    }

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function generateContent(products: string, userInput: string) {
  var content =
    "Given the following database of our clothing products, return the products that best matches the user's input. \n\n";
  content += "Database:\n";

  content += products + "\n\n";

  content +=
    "Can you respond with products in the same format as the database? (I.e. a JSON array of products)\n\n";

  content +=
    "Example of user input: I am looking for products that cost less than 600 kr.\n";
  content +=
    "Then I want you to look at the price field for each product in the database and return the products that cost less than 600 kr.\n\n";

  content += "User Input: " + userInput;

  return content;
}
