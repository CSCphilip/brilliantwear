// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { cookies } from "next/headers";
import joi from "joi";

import { usersRepo } from "_helpers/server";
import { apiHandler } from "_helpers/server/api";

module.exports = apiHandler({
  POST: login,
});

async function login(req: Request) {
  const body = await req.json();
  const { user, token } = await usersRepo.authenticate(body);

  // return jwt token in http only cookie
  cookies().set("authorization", token, { httpOnly: true });

  return user;
}

login.schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});
