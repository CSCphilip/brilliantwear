import { redirect } from "next/navigation";

export default function Checkout() {
  // redirect("/checkout/address"); // You can do something like this for the different steps of the checkout process.
  return (
    <div className="grow">
      <h1>Checkout</h1>
    </div>
  );
}
