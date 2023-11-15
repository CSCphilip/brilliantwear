import path from "path";

import { db } from "./mongodb";

const Product = db.Product;

export const productsRepo = {
  create,
  getAll,
};

async function getAll() {
  console.log("Getting all products from the MongoDB in order of creation");

  const allProducts = await Product.find({}, { _id: 0, __v: 0 }).lean(); // With the lean() method, the average execution time is less (sometimes a lot).

  return allProducts;
}

async function create(params: FormData) {
  // validate
  if (
    await Product.findOne({
      brand: params.get("brand"),
      category: params.get("category"),
      type: params.get("type"),
      price: params.get("price"),
    })
  ) {
    throw "Product already exists in the database";
  }

  const product = new Product();

  product.brand = params.get("brand");
  product.category = params.get("category");
  product.type = params.get("type");
  product.price = params.get("price");

  const image = params.get("image") as File;
  const imageName = image.name;
  const id = imageName.split(".")[0]; // remove the extension

  product.image_url = path.join("/images", imageName);
  product.id = id;

  // Save product to MongoDB
  await product.save();

  console.log("Product saved successfully. Brand:", params.get("brand"));
}