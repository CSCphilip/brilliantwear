// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getJwtSecret } from "./config/auth";

export const auth = {
  isAuthenticated,
  verifyToken,
};

async function isAuthenticated() {
  try {
    await verifyToken();
    return true;
  } catch {
    return false;
  }
}

async function verifyToken() {
  const token = cookies().get("authorization")?.value ?? "";

  const JWT_SECRET = await getJwtSecret();

  const decoded = jwt.verify(token, JWT_SECRET!);
  const id = decoded.sub as string;
  return id;
}
