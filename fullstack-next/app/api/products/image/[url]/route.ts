import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { url } }: any) {
  console.log("Getting image from url:", url);

  try {
    let imagePath = "";
    if (process.env.NODE_ENV === "development") {
      path.join("./../backend", url); // Starts from the root of the node/npm project
    } else {
      path.join("/app/product-images", url); // Starts from the root of the node/npm project
    }

    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      const response = new NextResponse(imageBuffer);

      let contentType = "image";
      if (url.endsWith(".png")) {
        contentType += "/png";
      } else if (url.endsWith(".jpg") || url.endsWith(".jpeg")) {
        contentType += "/jpeg";
      }

      response.headers.set("content-type", contentType);
      return response;
    } else {
      return NextResponse.json({ message: "Image not found", status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}
