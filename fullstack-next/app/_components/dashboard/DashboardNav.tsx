"use client";

import Link from "next/link";
import { useUserService } from "_services";
import { useState } from "react";

export default function DashboardNav() {
  const [loggingOut, setLoggingOut] = useState(false);
  const userService = useUserService();

  async function logout() {
    setLoggingOut(true);
    await userService.logout();
  }
  return (
    <nav className="h-7 bg-gray-700 flex justify-between items-center px-2.5 lg:px-5">
      <ul className="text-white flex gap-x-3 lg:gap-x-5">
        <li>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/users" className="hover:underline">
            Users
          </Link>
        </li>
        <li>
          <Link href="/dashboard/orders" className="hover:underline">
            Orders
          </Link>
        </li>
        <li>
          <Link href="/dashboard/contact-requests" className="hover:underline">
            Contacts
          </Link>
        </li>
      </ul>
      <button
        onClick={logout}
        disabled={loggingOut}
        className="-mt-[1px] ms-14 underline text-blue-300 hover:text-blue-200"
      >
        Log out
      </button>
    </nav>
  );
}
