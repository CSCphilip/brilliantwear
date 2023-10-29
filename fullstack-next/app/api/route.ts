import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log("Someone accessed the API root");
  return NextResponse.json({ message: "Hi, your request has been received!" });
}
