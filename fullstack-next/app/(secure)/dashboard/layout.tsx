// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { redirect } from "next/navigation";
import { Metadata } from "next";

import { auth } from "_helpers/server";
import Alert from "_components/Alert";
import DashboardNav from "_components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard | Brilliantwear",
    default: "Dashboard",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if not logged in redirect to login page
  if (!(await auth.isAuthenticated())) {
    redirect(`/account/login`);
  }

  return (
    <>
      <DashboardNav />
      <Alert />
      {children}
    </>
  );
}
