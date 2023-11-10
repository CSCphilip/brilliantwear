import joi from "joi";
import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { db, productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";

const Product = db.Product;

export async function GET(req: Request) {
  console.log("Getting all products from the MongoDB in order of creation");

  try {
    const allProducts = await Product.find({}, { _id: 0, __v: 0 }).lean(); // With the lean() method, the average execution time is less (sometimes a lot).

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

// Using the apiHandler() helper function instead of the GET() function above (old way without middleware).
module.exports = apiHandler({
  POST: create,
});

async function create(req: NextRequest) {
  const formData = await req.formData();
  await productsRepo.create(formData);
  saveImage(formData);
}

create.schema = joi.object({
  brand: joi.string().required(),
  category: joi.string().required(),
  type: joi.string().required(),
  price: joi.number().required(),
  image: joi.object().required(),
});

async function saveImage(formData: FormData) {
  try {
    const image = formData.get("image") as File;
    const imageName = image.name;
    const imageReader = image.stream().getReader();
    const imageDataU8: number[] = [];

    while (true) {
      const { done, value } = await imageReader.read();
      if (done) break;

      for (let i = 0; i < value.length; i++) {
        imageDataU8.push(value[i]);
      }
    }

    const binary = new Uint8Array(imageDataU8);
    const imagePath = path.join("./../backend/images", imageName);
    fs.writeFileSync(imagePath, binary);

    console.log("Image saved successfully");
  } catch (error) {
    throw new Error("An error occurred when trying to save the image");
  }
}
