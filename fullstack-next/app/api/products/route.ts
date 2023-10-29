import { NextResponse } from "next/server";
import { db } from "_helpers/server";

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
