import mongoose, { ConnectOptions } from "mongoose";
import { getMongoPassword } from "./init";
import log from "_utilities/log";

const HOST =
  process.env.NODE_ENV === "development" ? "localhost" : "172.17.0.1"; // NOTE: The latter is the default gateway for Docker containers using the default bridge network
const PORT = 27017;
const DB = "brilliantwear";
const USERNAME = "philip";

getMongoPassword()
  .then((password) => {
    const PASSWORD = password;

    mongoose
      .connect(`mongodb://${HOST}:${PORT}/${DB}`, {
        auth: { username: USERNAME, password: PASSWORD },
        authSource: "admin",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        log("Successfully connected to MongoDB.");
      })
      .catch((err) => {
        console.error("Connection error", err);
      });
    mongoose.Promise = global.Promise;
  })
  .catch((err) => {
    console.error("Error:", err);
  });

const Schema = mongoose.Schema;

export const db = {
  User: userModel(),
  Product: productModel(),
  Order: orderModel(),
};

// mongoose models with schema definitions

function userModel() {
  const schema = new Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    {
      // add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    },
  });

  return (
    mongoose.models.FullstackNextUser ||
    mongoose.model("FullstackNextUser", schema)
  );
}

function productModel() {
  const schema = new Schema(
    {
      id: { type: String, unique: true, required: true },
      brand: { type: String, required: true },
      category: { type: String, required: true },
      type: { type: String, required: true },
      price: { type: Number, required: true },
      image_url: { type: String, unique: true, required: true },
      gender: { type: String, required: true },
    },
    {
      // Add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  /* Checks if a Mongoose model named "Product" already exists. If it exists, it returns
   the existing model. If it doesn't exist, it defines a new "Product" model using the 
   specified schema and returns that. */
  return mongoose.models.Product || mongoose.model("Product", schema);
}

function orderModel() {
  const schema = new Schema(
    {
      id: { type: String, unique: true, required: true },
      status: { type: String, required: true },
      isPaid: { type: Boolean, required: true },
      user: { type: Object, required: true },
      shippingAddress: { type: Object, required: true },
      servicePoint: { type: Object, required: true },
      cart: { type: Array, required: true },
      totalPrice: { type: Object, required: true },
      paypalOrder: { type: Object, required: true },
      paypalCapture: { type: Object, required: true },
    },
    {
      // Add createdAt and updatedAt timestamps
      timestamps: true,
    }
  );

  /* Checks if a Mongoose model named "Order" already exists. If it exists, it returns
   the existing model. If it doesn't exist, it defines a new "Order" model using the 
   specified schema and returns that. */
  return mongoose.models.Order || mongoose.model("Order", schema);
}
