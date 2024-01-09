// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { NextRequest } from "next/server";

import { auth } from "_helpers/server";

export async function jwtMiddleware(req: NextRequest) {
  if (isPublicPath(req)) return;

  // verify token in request cookie
  const id = await auth.verifyToken();
  req.headers.set("userId", id);
}

function isPublicPath(req: NextRequest) {
  // public routes that don't require authentication
  const publicPaths = [
    "POST:/api/account/login",
    "POST:/api/account/logout",
    "POST:/api/account/register",
    "GET:/api/products",
    "GET:/api/products/latest",
    "GET:/api/products/woman",
    "GET:/api/products/man",
    "POST:/api/checkout/servicepoints",
    "GET:/api/checkout/paypal-client-id",
    "POST:/api/checkout/orders",
  ];
  return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}
