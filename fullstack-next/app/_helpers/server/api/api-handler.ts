// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { NextRequest, NextResponse } from "next/server";

import {
  errorHandler,
  jwtMiddleware,
  validateMiddlewareFormData,
  validateMiddlewareJSON,
} from ".";

export function apiHandler(handler: any) {
  const wrappedHandler: any = {};
  const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  // wrap handler methods to add middleware and global error handler
  httpMethods.forEach((method) => {
    if (typeof handler[method] !== "function") return;

    wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
      try {
        // global middleware
        await jwtMiddleware(req);

        // Check the content type of the request
        const contentType = req.headers.get("content-type");

        if (contentType?.includes("multipart/form-data")) {
          // Handle "multipart/form-data" requests

          // middleware
          await validateMiddlewareFormData(req, handler[method].schema);
        } else {
          try {
            // monkey patch req.json() because it can only be called once
            const json = await req.json();
            req.json = () => json;
          } catch {}

          // middleware
          await validateMiddlewareJSON(req, handler[method].schema);
        }

        // route handler
        const responseBody = await handler[method](req, ...args);
        return NextResponse.json(responseBody || {});
      } catch (err: any) {
        // global error handler
        return errorHandler(err);
      }
    };
  });

  return wrappedHandler;
}
