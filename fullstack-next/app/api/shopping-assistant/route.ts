import { productsRepo } from "_helpers/server";
import { assistantQueryRepo } from "_helpers/server";
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

/** Response will look like:
 *  {
 *   "products": [...]
 *  }
 */
export async function POST(request: Request) {
  const reqBody = await request.json();
  const userInput = reqBody.userInput;

  if (!userInput) {
    log("Invalid request. No user input provided.");
    return NextResponse.json({ message: "Invalid request", status: 400 });
  }

  saveUserInput(userInput);

  try {
    if (!openaiInstance) {
      throw new Error("OpenAI is not initialized.");
    }

    const suggestedProducts =
      await fetchProductSuggestionsFromChatGPT(userInput);

    return NextResponse.json(suggestedProducts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

function saveUserInput(userInput: string) {
  // Save the user's input to the database.
  // This could be useful for better product suggestions in the future with user accounts.
  assistantQueryRepo.create({ userInput });
}

async function fetchProductSuggestionsFromChatGPT(
  userInput: string
): Promise<string> {
  log(
    "Trying to fetch product suggestions from ChatGPT based on the user's input."
  );
  log("User's input: " + userInput);

  try {
    const systemContent = await generateSystemContent();

    const chatCompletion = await openaiInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        { role: "user", content: userInput },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    log("Response from ChatGPT:");
    log(chatCompletion);
    log(chatCompletion.choices[0].message.content);

    return JSON.parse(chatCompletion.choices[0].message.content as string);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getAllProductsFromDatabase(): Promise<string> {
  const paginationAndProducts = await productsRepo.getLatest();
  const allLatestProducts = paginationAndProducts.products;
  return JSON.stringify(allLatestProducts);
}

async function generateSystemContent() {
  const products = await getAllProductsFromDatabase();

  const content = `You are a fashion shopping assistant specializing in helping users find clothing products. This represents a distinctive feature integrated into a clothing retail website.

In the provided MongoDB database of clothing products, your objective is to retrieve the products that most closely align with the user's input.

Database:
${products}

The response should be in JSON format. The JSON response should only contain one parent called "products". If no products match the user's input, respond with an empty array as a child to "products". Do not change the products from the database that you suggest, i.e., do not change any fields or values because they should be the same as in the database.

Here is an example of a user's input you could receive and how I want you to suggest products based on this input and the database above:

User input: Shoes for a man that cost less than 1000 for a party in New York. 

With this input, I want you to first prioritize finding stylish men's shoes within the specified budget of 1000 SEK. Emphasize products suitable for a festive occasion like a party. Additionally, consider the location factor, focusing on products that align with the fashion trends or preferences relevant to events in New York. The goal is to offer tailored suggestions that blend affordability, style, and the specific context of the user's request. Also, discern any cues regarding the user's gender, and strive to exclusively present products corresponding to that gender. Achieve this by examining the 'gender' field of each product in the database. This ensures that the suggestions are finely tuned to the user's preferences, creating a more personalized and relevant shopping experience.

Here is a more comprehensive guideline on how I want you to suggest products:

Upon receiving user input, meticulously match the pertinent fields (e.g., 'cost' aligns with 'price') for each product in the database. Give priority to the matching products by evaluating their relevance to the user's input. Take into account specific occasions or contexts mentioned by the user, such as weddings, beach outings, or parties, and strive to identify products that are particularly fitting for these scenarios. The aim is to provide tailored suggestions that not only align with the user's explicit requirements but also resonate with the intended use or setting, ensuring a personalized and meaningful shopping experience.`;

  return content;
}
