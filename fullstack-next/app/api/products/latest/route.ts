import { NextResponse } from "next/server";
import { db } from "_helpers/server";

const Product = db.Product;

export async function GET(req: Request) {
  console.log("Getting all the latest products from the MongoDB");

  try {
    const allLatestProducts = await Product.find({}, { _id: 0, __v: 0 })
      .sort({ _id: -1 })
      .lean(); // With the lean() method, the average execution time is less (sometimes a lot).

    return NextResponse.json(allLatestProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
