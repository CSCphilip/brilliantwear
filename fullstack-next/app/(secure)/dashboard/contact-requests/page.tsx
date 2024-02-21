"use client";

import { useEffect, useState } from "react";
import Spinner from "_components/Spinner";
import { ContactRequest } from "_types";

export default function ContactRequests() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  useEffect(() => {
    fetch("/api/contact").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setContactRequests(data);
          console.log(data);
        });
      }
    });
  }, []);

  if (contactRequests.length === 0) {
    return <Spinner />;
  } else {
    return (
      <main className="grow p-4">
        <h1>Contact Requests</h1>
        <div className="flex justify-center mb-5">
          <div className="mt-4 overflow-x-auto shadow-lg sm:rounded-lg w-full">
            <table className="text-left text-gray-500 w-full">
              <thead className="text-sm text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Created (UTC)
                  </th>

                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableBody />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    );
  }

  function TableBody() {
    if (contactRequests?.length) {
      return contactRequests.map((contactReq, index) => (
        <tr key={index} className="odd:bg-white even:bg-gray-50 bcontactReq-b">
          <td className="px-6 py-2">{parseDate(contactReq.createdAt!)}</td>
          <td className="px-6 py-2">{contactReq.firstName}</td>
          <td className="px-6 py-2">{contactReq.lastName}</td>
          <td className="px-6 py-2">{contactReq.email}</td>
          <td className="px-6 py-2">{contactReq.message}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan={8} className="text-center">
            Something went wrong!
          </td>
        </tr>
      );
    }
  }

  function parseDate(inDate: Date): string {
    const dateString = inDate.toString();
    const date = dateString.split("T")[0];
    const time = dateString.split("T")[1].split(".")[0];
    return `${date} ${time}`;
  }
}
