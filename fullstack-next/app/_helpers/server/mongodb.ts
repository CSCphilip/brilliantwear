import mongoose, { ConnectOptions } from "mongoose";

const HOST = "localhost"; // NOTE: This might be different if you're using Docker
const PORT = 27017;
const DB = "brilliantwear";

mongoose
  .connect(`mongodb://${HOST}:${PORT}/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

export const db = {
  User: userModel(),
  Product: productModel(),
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