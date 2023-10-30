import { initializeOpenAI } from "_helpers/server";
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

    const JSONsuggestedProducts = JSON.parse(suggestedProducts);

    console.log(JSONsuggestedProducts);

    return NextResponse.json(JSONsuggestedProducts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

async function fetchProductSuggestionsFromChatGPT(
  userInput: string
): Promise<string> {
  console.log(
    "Trying to fetch product suggestions from ChatGPT based on the user's input."
  );
  console.log("User's input: " + userInput);

  try {
    const res = await fetch("http://localhost:3000/api/products/latest"); //NOTE: This is a hack. We should not hardcode the URL like this. We should code the logic here and take the products from the MongoDB.
    const allLatestProducts = await res.json();

    const chatCompletion = await openaiInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: generateContent(allLatestProducts, userInput),
        },
        { role: "user", content: userInput },
      ],
      model: "gpt-3.5-turbo", // Points to the latest version of the GPT-3.5 model
    });

    console.log("Response from ChatGPT:");
    console.log(chatCompletion);
    console.log(chatCompletion.choices);

    return chatCompletion.choices[0].message.content as string;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function generateContent(products: JSON, userInput: string) {
  var content =
    "Given the following database of our clothing products, return the products that best matches the user's input. \n\n";
  content += "Database:\n";

  content += JSON.stringify(products) + "\n\n";

  content +=
    "Can you respond with products in the same format as the database? (I.e. a JSON array of products)\n\n";

  content +=
    "Example of user input: I am looking for products that cost less than 600 kr.\n";
  content +=
    "Then I want you to look at the price field for each product in the database and return the products that cost less than 600 kr.\n\n";

  content += "User Input: " + userInput;

  return content;
}
