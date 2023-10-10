const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./products.model");

db.ROLES = ["user", "moderator", "admin"];

db.getNoProductsInDB = async function () {
  try {
    const count = await db.product.countDocuments({});
    console.log("Number of products in the database:", count);
    return count;
  } catch (err) {
    console.error("Error counting products:", err);
    throw err;
  }
};

db.getLatestProducts = async function (noProducts) {
  try {
    const latestProducts = await db.product
      .find({}, { _id: 0 })
      .limit(noProducts)
      .sort({ _id: -1 })
      .lean();
    return latestProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

db.getProductById = async function (id) {
  try {
    const product = await db.product.findOne({ id: id }).lean();
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = db;
