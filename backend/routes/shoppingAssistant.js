const express = require("express");
const db = require("../models");
const { openai } = require("../config/openai.config");

const router = express.Router();

// Old way (for development only):
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

router.get("/:userInput", async (req, res) => {
  console.log('Someone accessed "/shopping-assistant"');

  const userInput = req.params.userInput;

  const suggestedProducts = await fetchProductSuggestionsFromChatGPT(userInput);

  const JSONsuggestedProducts = JSON.parse(suggestedProducts);

  console.log(JSONsuggestedProducts);

  res.json(JSONsuggestedProducts);
});

async function fetchProductSuggestionsFromChatGPT(userInput) {
  console.log(
    "Trying to fetch product suggestions from ChatGPT based on the user's input.\n",
    "User input: " + userInput
  );

  try {
    const productsInDB = await db.getNoProductsInDB();
    const allProducts = await db.getLatestProducts(productsInDB);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: generateContent(allProducts, userInput) },
        { role: "user", content: userInput },
      ],
      model: "gpt-3.5-turbo", // Points to the latest version of the GPT-3.5 model
    });

    console.log("Response from ChatGPT:");
    console.log(chatCompletion);
    console.log(chatCompletion.choices);

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}

function generateContent(products, userInput) {
  var content =
    "Given the following database of our clothing products, return the products that best matches the user's input. \n\n";
  content += "Database:\n";

  content += JSON.stringify(products) + "\n\n";

  content +=
    "Can you respond with products in the same format as the database? (I.e. a JSON array of products)";

  content += "User Input: " + userInput;

  return content;
}

module.exports = router;
