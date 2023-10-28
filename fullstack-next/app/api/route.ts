import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new NextResponse("Hi, your request has been received!");
  //   return NextResponse.json({ message: "Hi, your request has been received!" });
}
