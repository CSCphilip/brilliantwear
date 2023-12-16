"use client";

import { useEffect } from "react";
import { useOrderService } from "_services/useOrderService";
import Spinner from "_components/Spinner";

export default function Orders() {
  const orderService = useOrderService();
  const orders = orderService.orders;

  useEffect(() => {
    orderService.getAllLatest();
  }, []);

  if (!orders) {
    return <Spinner />;
  } else {
    return (
      <main className="grow p-4">
        <h1>Orders</h1>
        <div className="flex justify-center mb-5">
          <div className="mt-4 overflow-x-auto shadow-lg sm:rounded-lg w-full">
            <table className="text-left text-gray-500 w-full">
              <thead className="text-sm text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Created (UTC)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Service Point
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
    if (orders?.length) {
      return orders.map((order) => (
        <tr key={order.id} className="odd:bg-white even:bg-gray-50 border-b">
          <td className="px-6 py-2">{parseDate(order.createdAt!)}</td>
          <td className="px-6 py-2">{order.id}</td>
          <td className="px-6 py-2">{order.status}</td>
          <td className="px-6 py-2">
            {order.isPaid ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-500">No</span>
            )}
          </td>
          <td className="px-6 py-2">
            Name: {order.user.firstName + " " + order.user.lastName}
            <br />
            Email: {order.user.email}
            <br />
            Phone: {order.user.phone}
            <br />
            Street:{" "}
            {order.shippingAddress.street +
              " " +
              order.shippingAddress.streetNumber}
            <br />
            City:{" "}
            {order.shippingAddress.postalCode +
              " " +
              order.shippingAddress.city}
          </td>
          <td className="px-6 py-2">
            {order.totalPrice.value + " " + order.totalPrice.currency}
          </td>
          <td className="px-6 py-2">
            {order.cart.map((item) => (
              <div key={item.product.id}>
                {item.product.brand} x {item.quantity}
              </div>
            ))}
          </td>
          <td className="px-6 py-2">
            Name: {order.servicePoint.name}
            <br />
            Street:{" "}
            {order.servicePoint.visitingAddress.streetName +
              " " +
              order.servicePoint.visitingAddress.streetNumber}
          </td>
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
