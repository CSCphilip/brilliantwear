// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { cookies } from "next/headers";

import { apiHandler } from "_helpers/server/api";

module.exports = apiHandler({
  POST: logout,
});

function logout() {
  cookies().delete("authorization");
}
