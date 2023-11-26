import { CheckoutProvider } from "_context/CheckoutContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grow flex flex-col bg-slate-100">
      <CheckoutProvider>
        <div>
          <ul className="flex gap-4 hidden">
            <li>Information</li>
            <li>Shipping</li>
            <li>Payment</li>
            <li>Preview order</li>
          </ul>
        </div>
        {children}
      </CheckoutProvider>
    </main>
  );
}
