import { NextResponse } from "next/server";
import { db } from "_helpers/server";
import log from "_utilities/log";

const Product = db.Product;

export async function GET(req: Request, { params: { id } }: any) {
  log("Getting the product from the MongoDB with id: " + id);

  try {
    const product = await Product.findOne(
      { id: id },
      { _id: 0, __v: 0 }
    ).lean();

    if (product !== null) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ message: "Product not found", status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
