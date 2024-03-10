import { useCheckout } from "_context";

export default function CheckoutProgress() {
  const { currentCheckoutStep, checkoutSteps } = useCheckout();
  return (
    <div className="pt-5 pb-2 px-2 flex justify-center border-b border-gray-400 bg-white">
      <ol className="grow flex max-w-5xl">
        {checkoutSteps.map((step, index) => {
          return (
            <li key={index} className="grow w-20 flex flex-col items-center">
              <div className="w-full flex justify-center items-center">
                <hr
                  className={`grow border border-black ${
                    index === 0 && "opacity-0"
                  } ${index > currentCheckoutStep && "opacity-0"}`}
                />
                <p
                  className={`w-10 h-10 flex justify-center items-center border-2 ${
                    index === currentCheckoutStep
                      ? "border-primary"
                      : "border-black"
                  } rounded-full text-lg font-medium`}
                >
                  {index + 1}
                </p>
                <hr
                  className={`grow border border-black ${
                    index >= currentCheckoutStep && "opacity-0"
                  }`}
                />
              </div>
              <p className="mt-1 text-sm">
                {checkoutSteps[index].charAt(0).toUpperCase() +
                  checkoutSteps[index].slice(1)}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
