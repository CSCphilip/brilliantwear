import { NextResponse } from "next/server";
import { db } from "_helpers/server";

const Product = db.Product;

export async function GET() {
  console.log("Getting all latest products from the MongoDB");

  const noProducts = await Product.countDocuments({});
  console.log(`Number of products in the MongoDB: ${noProducts}`);

  const allLatestProducts = await Product.find({}, { _id: 0, __v: 0 })
    .limit(noProducts)
    .sort({ _id: -1 })
    .lean(); // With the lean() method, the average execution time is less (sometimes a lot).

  return NextResponse.json(allLatestProducts);
}
