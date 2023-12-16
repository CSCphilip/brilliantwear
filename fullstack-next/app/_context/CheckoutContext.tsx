"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { PostNordServicePoint, CheckoutUser, ShippingAddress } from "_types";

// NOTE: The url paths for every checkout page: /checkout/"step". They need to match following:
const CHECKOUT_STEPS = ["information", "shipping", "payment", "complete"];

type CheckoutProviderProps = {
  children: ReactNode;
};

type CheckoutContext = {
  user: CheckoutUser;
  setEmail: (email: string) => void;
  setCheckoutUser: (firstName: string, lastName: string, phone: string) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (shippingAddress: ShippingAddress) => void;
  servicePoint: PostNordServicePoint;
  setServicePoint: (servicePoint: PostNordServicePoint) => void;
  orderId: string;
  setOrderId: (orderId: string) => void;
  checkoutSteps: string[];
  currentCheckoutStep: number;
  setCurrentCheckoutStep: (step: number) => void;
  maxReachedCheckoutStep: number;
  setMaxReachedCheckoutStep: (step: number) => void;
  toNextCheckoutStep: () => void;
  setCurrentCheckoutStepWithPath: (fullPathName: string) => void;
};

const CheckoutContext = createContext({} as CheckoutContext);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const router = useRouter();

  const [user, setUser] = useState<CheckoutUser>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    streetNumber: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [servicePoint, setServicePoint] = useState<PostNordServicePoint>({
    name: "",
    servicePointId: "",
    routeDistance: 0,
    visitingAddress: {
      streetName: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      countryCode: "",
    },
  });

  const checkoutSteps = CHECKOUT_STEPS;
  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(0);

  const [maxReachedCheckoutStep, setMaxReachedCheckoutStep] = useState(0);

  const [orderId, setOrderId] = useState("");

  function setEmail(email: string) {
    setUser((user) => ({ ...user, email }));
  }

  function setCheckoutUser(firstName: string, lastName: string, phone: string) {
    setUser((user) => ({ ...user, firstName, lastName, phone }));
  }

  function toNextCheckoutStep() {
    if (currentCheckoutStep <= checkoutSteps.length - 1) {
      setMaxReachedCheckoutStep(
        (maxReachedCheckoutStep) => maxReachedCheckoutStep + 1
      );

      router.push(`/checkout/${checkoutSteps[currentCheckoutStep + 1]}`);
    }
  }

  useEffect(() => {
    if (!isCurrentCheckoutStepValid()) {
      router.push(`/checkout/${checkoutSteps[maxReachedCheckoutStep]}`);
    }
  }, [currentCheckoutStep]);

  async function setCurrentCheckoutStepWithPath(fullPathName: string) {
    const pathname = fullPathName.split("/")[2];
    setCurrentCheckoutStep(checkoutSteps.indexOf(pathname));
  }

  function isCurrentCheckoutStepValid() {
    return currentCheckoutStep <= maxReachedCheckoutStep;
  }

  return (
    <CheckoutContext.Provider
      value={{
        user,
        setEmail,
        setCheckoutUser,
        shippingAddress,
        setShippingAddress,
        servicePoint,
        setServicePoint,
        orderId,
        setOrderId,
        checkoutSteps,
        currentCheckoutStep,
        setCurrentCheckoutStep,
        maxReachedCheckoutStep,
        setMaxReachedCheckoutStep,
        toNextCheckoutStep,
        setCurrentCheckoutStepWithPath,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
