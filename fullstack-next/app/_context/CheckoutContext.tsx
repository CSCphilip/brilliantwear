"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { PostNordServicePoint, CheckoutUser, ShippingAddress } from "_types";

const CHECKOUT_STEPS = ["Information", "Shipping", "Payment", "Complete"];

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
  checkoutSteps: string[];
  currentCheckoutStep: number;
  setCurrentCheckoutStep: (step: number) => void;
  maxReachedCheckoutStep: number;
  setMaxReachedCheckoutStep: (step: number) => void;
  areCheckoutStepsCompletedInOrder: () => boolean;
  orderId: string;
  setOrderId: (orderId: string) => void;
  clearCheckoutContext: () => void;
};

const CheckoutContext = createContext({} as CheckoutContext);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
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

  function areCheckoutStepsCompletedInOrder() {
    return currentCheckoutStep <= maxReachedCheckoutStep;
  }

  function clearCheckoutContext() {
    setUser({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    });

    setShippingAddress({
      street: "",
      streetNumber: "",
      city: "",
      postalCode: "",
      country: "",
    });

    setServicePoint({
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

    setCurrentCheckoutStep(0);
    setMaxReachedCheckoutStep(0);
    setOrderId("");
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
        checkoutSteps,
        currentCheckoutStep,
        setCurrentCheckoutStep,
        maxReachedCheckoutStep,
        setMaxReachedCheckoutStep,
        areCheckoutStepsCompletedInOrder,
        orderId,
        setOrderId,
        clearCheckoutContext,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
