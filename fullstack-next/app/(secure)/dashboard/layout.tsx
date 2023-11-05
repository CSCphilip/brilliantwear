// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "_helpers/server";
import { Alert } from "_components";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if not logged in redirect to login page
  if (!(await auth.isAuthenticated())) {
    const returnUrl = encodeURIComponent(headers().get("x-invoke-path") || "/");
    redirect(`/account/login?returnUrl=${returnUrl}`);
  }

  return (
    <>
      {/* <Nav /> */}
      <Alert />
      {children}
    </>
  );
}
