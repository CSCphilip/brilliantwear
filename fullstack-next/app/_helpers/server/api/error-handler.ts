// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function errorHandler(err: Error | string) {
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const status = is404 ? 404 : 400;
    return NextResponse.json({ message: err }, { status });
  }

  if (err.name === "JsonWebTokenError") {
    // jwt error - delete cookie to auto logout
    cookies().delete("authorization");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // default to 500 server error
  console.error(err);
  return NextResponse.json({ message: err.message }, { status: 500 });
}
