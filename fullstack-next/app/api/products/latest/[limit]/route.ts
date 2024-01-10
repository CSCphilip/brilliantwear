import { NextResponse } from "next/server";
import { productsRepo } from "_helpers/server";
import log from "_utilities/log";

export async function GET(req: Request, { params: { limit } }: any) {
  const limitNumber = parseInt(limit);
  if (limitNumber < 1 || isNaN(limitNumber)) {
    return NextResponse.json({ message: "Bad Request", status: 400 });
  }

  log("Getting the latest " + limit + " products from the MongoDB");

  const latestProductsPagination: any = await productsRepo.getLatest();

  try {
    return NextResponse.json({
      ...latestProductsPagination,
      products: latestProductsPagination.products.slice(0, limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
