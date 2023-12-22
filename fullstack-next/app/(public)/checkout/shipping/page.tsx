"use client";

import { usePathname } from "next/navigation";
import { useCheckout } from "_context";
import { useFetch } from "_helpers/client/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PostNordServicePoint } from "_types";

export default function CheckoutShipping() {
  const {
    shippingAddress,
    setShippingAddress,
    setServicePoint,
    setCheckoutUser,
    setCurrentCheckoutStepWithPath,
    toNextCheckoutStep,
  } = useCheckout();

  const pathname = usePathname();
  useEffect(() => {
    setCurrentCheckoutStepWithPath(pathname);
  }, []);

  const fetch = useFetch();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const fields = {
    firstName: register("firstName", { required: "First name is required" }),
    lastName: register("lastName", { required: "Last name is required" }),
    phone: register("phone", { required: "Phone number is required" }),
    street: register("street", { required: "Street is required" }),
    city: register("city", { required: "City is required" }),
    postalCode: register("postalCode", { required: "Postal code is required" }),
    country: register("country", { required: "Country is required" }),
  };

  const [servicePoints, setServicePoints] = useState([]);
  const [fetchingServicePoints, setFetchingServicePoints] = useState(false);

  useEffect(() => {
    (async () => {
      if (shippingAddress.street !== "") {
        setFetchingServicePoints(true);
        try {
          const servicePoints = await fetch.post(
            "https://brilliantwear.se/api/checkout/servicepoints",
            shippingAddress
          );

          setServicePoints(servicePoints);
        } catch (error) {
          console.error("Error fetching service points:", error);
        }
        setFetchingServicePoints(false);
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [shippingAddress]);

  async function onSubmitShippingInformation(inputFields: any) {
    const street = inputFields.street.split(" ");
    const streetNumber = street.pop();

    // Update the shipping address in the state
    setShippingAddress({
      street: street.join(" "),
      streetNumber,
      city: inputFields.city,
      postalCode: inputFields.postalCode,
      country: inputFields.country,
    });

    setCheckoutUser(
      inputFields.firstName,
      inputFields.lastName,
      inputFields.phone
    );
  }

  return (
    <div className="grow w-screen pb-12 flex flex-col lg:flex-row justify-center items-center">
      <div className="w-fit flex flex-col items-center">
        <h3 className="my-7">Shipping information</h3>
        <form
          onSubmit={handleSubmit(onSubmitShippingInformation)}
          className="w-[350px] flex flex-col gap-2"
        >
          <div className="flex flex-col">
            <input
              {...fields.firstName}
              type="text"
              placeholder="First name"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.firstName?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              {...fields.lastName}
              type="text"
              placeholder="Last name"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.lastName?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              {...fields.phone}
              type="text"
              placeholder="Phone number"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.phone?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              {...fields.street}
              type="text"
              placeholder="Street address (incl. street number)"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.street?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              {...fields.city}
              type="text"
              placeholder="City"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.city?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <input
              {...fields.postalCode}
              type="text"
              placeholder="Postal code"
              className="bg-gray-50 border border-gray-300 text-gray-900 p-2.5 
              focus:outline-none focus:border-black"
            />
            <p className="text-red-600 pl-1 pt-1">
              {errors.postalCode?.message?.toString()}
            </p>
          </div>

          <div className="flex flex-col">
            <label className="pl-1 mb-1 font-medium">Country</label>
            <select
              {...fields.country}
              className="p-2.5 bg-gray-50 border border-gray-300 text-gray-900"
              defaultValue={"Sweden"}
            >
              <option value="Sweden">Sweden</option>
            </select>
            <p className="text-red-600 pl-1 pt-1">
              {errors.country?.message?.toString()}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={fetchingServicePoints}
              className="w-full mx-5 h-11 mt-7 pb-[1px] flex items-center justify-center rounded-full border border-transparent  
            bg-amber-400 hover:bg-amber-300"
            >
              Continue to select service point
              {fetchingServicePoints && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mx-3 text-black animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      <div
        className={`hidden lg:inline ms-14 w-px mt-8 h-[550px] bg-gray-700 ${
          servicePoints.length === 0 && "lg:hidden"
        }`}
      ></div>

      <ServicePoints
        servicePoints={servicePoints}
        setServicePoint={setServicePoint}
        toNextCheckoutStep={toNextCheckoutStep}
      />
    </div>
  );
}

type ServicePointsProps = {
  servicePoints: PostNordServicePoint[];
  setServicePoint: (servicePoint: PostNordServicePoint) => void;
  toNextCheckoutStep: () => void;
};

function ServicePoints({
  servicePoints,
  setServicePoint,
  toNextCheckoutStep,
}: ServicePointsProps) {
  const { register, handleSubmit, formState, setError } = useForm();
  const { errors } = formState;

  const fields = {
    servicePoint: register("servicePoint", {
      required: "Service point is required",
    }),
  };

  function onSubmit({ servicePoint: servicePointId }: any) {
    if (!errors.servicePoint) {
      const servicePoint: PostNordServicePoint | undefined = servicePoints.find(
        (sp) => sp.servicePointId == servicePointId
      );

      if (!servicePoint) {
        console.error("Service point not found");
        setError("servicePoint", { message: "Service point not found" });
        return;
      }

      setServicePoint(servicePoint);
      toNextCheckoutStep();
    }
  }

  return (
    <div
      className={`w-[350px] mt-10 lg:mt-0 lg:ms-10 ${
        servicePoints.length === 0 && "hidden"
      }`}
    >
      <hr className="w-full h-px border-0 bg-gray-700 lg:hidden" />

      <h3 className="mt-7 lg:mt-7 text-center">Service points</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 lg:mt-10 pb-4">
          <ol className="flex flex-col w-full gap-3 px-3">
            {servicePoints.map((servicePoint) => (
              <li key={servicePoint.servicePointId}>
                <input
                  {...fields.servicePoint}
                  id={servicePoint.servicePointId}
                  value={servicePoint.servicePointId}
                  name="servicePoint"
                  type="radio"
                  className="hidden peer"
                />
                <label
                  htmlFor={servicePoint.servicePointId}
                  className="flex items-center justify-between w-full p-2 text-gray-700 bg-gray-50 
                  border border-gray-300 rounded-sm cursor-pointer hover:text-black 
                  hover:bg-slate-200 peer-checked:border-black peer-checked:text-black 
                  peer-checked:bg-slate-200"
                >
                  <div className="w-full flex justify-between">
                    <div className="pe-6">
                      <p className="w-full text-lg font-semibold">
                        {servicePoint.name}
                      </p>
                      <p className="w-full">
                        {servicePoint.visitingAddress.streetName +
                          " " +
                          servicePoint.visitingAddress.streetNumber}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="whitespace-nowrap">
                        {servicePoint.routeDistance} m
                      </p>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ol>
          <p className="text-red-600 pl-1 pt-2 text-center">
            {errors.servicePoint?.message?.toString()}
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-56 h-11 mt-3 lg:mt-6 pb-[1px] flex items-center justify-center rounded-full border border-transparent  
            bg-amber-400 hover:bg-amber-300 shadow-md"
          >
            Continue to payment
          </button>
        </div>
      </form>
    </div>
  );
}
