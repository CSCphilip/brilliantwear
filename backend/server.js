const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
// require("dotenv").config(); // For development only

// const multer = require('multer');

// const upload = multer();

const db = require("./models");

const { Schema, model } = mongoose;

// Initializing the app.
const app = express();

// This enables the frontend of the website to fetch data from this server
const corsOptions = {
  // origin: ["http://localhost:8000", "http://localhost:5173"],
};
app.use(cors(corsOptions));

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "brilliantwear-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true, // indicate that the cookie is only to be sent over HTTP(S), and not made available to client JavaScript.
  })
);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const shoppingAssistantRouter = require("./routes/shoppingAssistant");
app.use("/shopping-assistant", shoppingAssistantRouter);

// Listen on port 80
const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

// Getting the path request and sending the response with text
app.get("/", (req, res) => {
  console.log('Someone accessed "/"');
  res.send("Hi, your request has been received!");
});

// Get all products from the MongoDB but return the in the latest order
// (i.e.the latest product is the first one in the array)
app.get("/get-all-products", async (req, res) => {
  console.log("Getting all products from the MongoDB");

  try {
    const productsInDB = db.getNoProductsInDB();
    const allProducts = await db.getLatestProducts(productsInDB);
    console.log(allProducts);
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-latest-products/:no", async (req, res) => {
  console.log("Getting latest products from the MongoDB");
  const noProducts = req.params.no;

  try {
    const latestProducts = await db.getLatestProducts(noProducts);
    console.log(latestProducts);
    res.json(latestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get-image/:url", (req, res) => {
  const imageURL = req.params.url;
  console.log("Getting image from url: " + imageURL);

  try {
    res.sendFile(__dirname + imageURL);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// // for parsing multipart/form-data
// app.use(upload.array());
//app.use(express.static(__dirname));
app.post("/upload-product", fileUpload(), (req, res) => {
  console.log("A POST request to /upload-product was made");
  const files = req.files;
  const body = req.body;

  const imagePath = path.join(__dirname, "images", files["image"].name);

  files["image"].mv(imagePath, (err) => {
    if (err) return res.status(500).json({ status: "error", message: err });
  });

  addProduct(body, files["image"].name);

  // In this case, the client's browser will automatically follow the
  // Location header, resulting in a GET request to the specified URL.
  // This approach is in line with HTTP standards and provides a clear
  // way to indicate both successful form submission and redirection.
  res.status(303).set("Location", "http://localhost:5173").send();
});

// Connect to MongoDB and the database called brilliantwear
// mongoose.connect('mongodb://localhost/brilliantwear');

// const Product = db.product;

async function addProduct(body, imageName) {
  try {
    const newProduct = new db.product(body);
    newProduct["image_url"] = path.join("/images", imageName);
    console.log("Created the following new product: " + newProduct);

    await newProduct.save();
    console.log("New product added to the MongoDB successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const dbConfig = require("./config/db.config");
const Role = db.role; // This is a mongoose model

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        const rolesToInsert = [
          { name: "user" },
          { name: "moderator" },
          { name: "admin" },
        ];

        return Role.insertMany(rolesToInsert);
      }
    })
    .then((addedRoles) => {
      if (addedRoles) {
        console.log("Added roles:", addedRoles);
      } else {
        console.log("Roles already exist.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// mongoose.connection.close();
