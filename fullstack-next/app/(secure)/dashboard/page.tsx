"use client";

// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import Link from "next/link";
import { useEffect } from "react";

import { useUserService } from "_services";
import Spinner from "_components/Spinner";

export default function Dashboard() {
  const userService = useUserService();
  const user = userService.currentUser;

  useEffect(() => {
    userService.getCurrent();
  }, []);

  if (user) {
    return (
      <main className="flex-grow">
        <div className="p-5">
          <h1>Hi {user.firstName}!</h1>
          <p>You&apos;re logged in with Next.js 13 & JWT!!</p>
          <p className="h-fit w-fit p-2 mt-5 bg-blue-600 hover:bg-blue-500 rounded text-white">
            <Link href="/dashboard/users">Manage users</Link>
          </p>
          <p className="h-fit w-fit p-2 mt-2 bg-blue-600 hover:bg-blue-500 rounded text-white">
            <Link href="/dashboard/products/add">Add product</Link>
          </p>
          <p className="h-fit w-fit p-2 mt-2 bg-blue-600 hover:bg-blue-500 rounded text-white">
            <Link href="/dashboard/orders">Look at orders</Link>
          </p>
        </div>
      </main>
    );
  } else {
    return <Spinner />;
  }
}
