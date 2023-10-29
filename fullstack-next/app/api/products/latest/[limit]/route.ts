import { NextResponse } from "next/server";
import { db } from "_helpers/server";

const Product = db.Product;

export async function GET(req: Request, { params: { limit } }: any) {
  const limitNumber = parseInt(limit);
  if (limitNumber < 1 || isNaN(limitNumber)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  console.log("Getting the latest", limit, "products from the MongoDB");

  try {
    const latestProducts = await Product.find({}, { _id: 0, __v: 0 })
      .limit(limitNumber)
      .sort({ _id: -1 })
      .lean();

    return NextResponse.json(latestProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
