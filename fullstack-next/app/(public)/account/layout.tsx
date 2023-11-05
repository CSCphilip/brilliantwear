// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { redirect } from "next/navigation";

import { auth } from "_helpers/server";
import { Alert } from "_components";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if logged in redirect to home page
  /* Logged in users should not be able to log in again or register a new account which
   are the two pages under the (public)/account folder.
   */
  if (await auth.isAuthenticated()) {
    redirect("/dashboard");
  }

  return (
    <>
      <Alert />
      {children}
    </>
  );
}
