import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const imagePath = "public/Brilliantwear-Open-Graph.jpg";

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    const response = new NextResponse(imageBuffer);
    response.headers.set("content-type", "image/jpeg");
    return response;
  } else {
    return NextResponse.json({ message: "Image not found", status: 404 });
  }
}
