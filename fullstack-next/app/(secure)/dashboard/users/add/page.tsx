// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { AddEdit } from "_components/dashboard/users";

export default function Add() {
  return (
    <main className="flex-grow">
      <AddEdit title="Add User" />
    </main>
  );
}
