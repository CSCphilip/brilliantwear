import { NextResponse } from "next/server";
import { productsRepo } from "_helpers/server";
import { shuffleArray } from "_utilities";

export async function GET(request: Request, { params: { limit } }: any) {
  const allProductsPagination: any = await productsRepo.get();

  const shuffledProducts = shuffleArray(allProductsPagination.products);

  console.log(
    "Producing a random list of " +
      limit +
      " products from the MongoDB to represent the most popular products"
  );

  try {
    return NextResponse.json({
      ...allProductsPagination,
      products: shuffledProducts.slice(0, limit),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
