"use client";

// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AddEdit from "_components/dashboard/users/AddEdit";
import Spinner from "_components/Spinner";
import { useUserService } from "_services";

export default function Edit({ params: { id } }: any) {
  const router = useRouter();
  const userService = useUserService();
  const user = userService.user;

  useEffect(() => {
    if (!id) return;

    // fetch user for add/edit form
    userService.getById(id);
  }, [router]);

  return (
    <main className="flex-grow">
      {user ? <AddEdit title="Edit User" user={user} /> : <Spinner />}
    </main>
  );
}
