"use client";

// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useAlertService } from "_services";

export default function Alert() {
  const pathname = usePathname();
  const alertService = useAlertService();
  const alert = alertService.alert;

  useEffect(() => {
    // clear alert on location change
    alertService.clear();
  }, [pathname]);

  if (!alert) return null;

  let alertColor = "bg-red-600";
  if (
    alert.message == "User added" ||
    alert.message == "User updated" ||
    alert.message == "Product added"
  ) {
    alertColor = "bg-green-600";
  }

  return (
    <div
      className={`flex flex-row justify-center items-center py-1 ${alertColor}`}
    >
      <p>{alert.message}</p>
      <button
        type="button"
        className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-[1px] ms-4 rounded "
        onClick={alertService.clear}
      >
        Close
      </button>
    </div>
  );
}
