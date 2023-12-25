import joi from "joi";
import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";
import { productsRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";
import log from "_utilities/log";

module.exports = apiHandler({
  POST: create,
  GET: get,
});

async function get(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  return await productsRepo.get(parseInt(page as string));
}

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
    let imagePath = "";
    if (process.env.NODE_ENV === "development") {
      imagePath = path.join("./../backend/images", imageName);
    } else {
      imagePath = path.join("./products/images", imageName); // The WORKDIR is set to /app in the Dockerfile
    }
    fs.writeFileSync(imagePath, binary);

    log("Image saved successfully");
  } catch (error) {
    throw new Error("An error occurred when trying to save the image");
  }
}
