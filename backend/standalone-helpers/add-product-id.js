const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  brand: String,
  category: String,
  type: String,
  price: Number,
  image_url: String,
});

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/brilliantwear");
  const Product = mongoose.model("Product", productSchema);
  const products = await Product.find({}).lean();

  for (let product of products) {
    const id = product["image_url"].split("/").pop().split(".")[0];
    await Product.updateOne({ _id: product["_id"] }, { id: id }).exec();
  }
}

main()
  .then(() => mongoose.disconnect())
  .catch((err) => console.log(err));
