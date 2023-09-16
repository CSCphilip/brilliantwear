const express = require("express");
const db = require("../models");
const { initializeOpenAI } = require("../config/openai.config");

const router = express.Router();

// Initialize OpenAI once during startup
let openaiInstance;

initializeOpenAI()
  .then((openai) => {
    openaiInstance = openai;
  })
  .catch((error) => {
    console.error("Error initializing OpenAI:", error);
  });

// Middleware to handle user input validation and preprocessing
const validateUserInput = (req, res, next) => {
  const userInput = req.params.userInput;
  // TODO: Add validation or preprocessing logic if needed
  req.userInput = userInput;
  next();
};

// Route handler for product suggestions
router.get("/:userInput", validateUserInput, async (req, res) => {
  try {
    if (!openaiInstance) {
      throw new Error("OpenAI is not initialized.");
    }

    const suggestedProducts = await fetchProductSuggestionsFromChatGPT(
      req.userInput
    );

    const JSONsuggestedProducts = JSON.parse(suggestedProducts);

    console.log(JSONsuggestedProducts);

    res.json(JSONsuggestedProducts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function fetchProductSuggestionsFromChatGPT(userInput) {
  console.log("Trying to fetch product suggestions from ChatGPT based on the user's input.");
  console.log("User's input: " + userInput);

  try {
    const productsInDB = await db.getNoProductsInDB();
    const allProducts = await db.getLatestProducts(productsInDB);

    const chatCompletion = await openaiInstance.chat.completions.create({
      messages: [
        {
          role: "system",
          content: generateContent(allProducts, userInput),
        },
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
    throw error;
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
