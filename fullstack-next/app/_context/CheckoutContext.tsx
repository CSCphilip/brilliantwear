"use client";

import { ReactNode, createContext, useContext, useState } from "react";

const CHECKOUT_STEPS = ["Information", "Shipping", "Payment", "Preview"];

type CheckoutProviderProps = {
  children: ReactNode;
};

type CheckoutUser = {
  email: string;
  // fistName: string;
  // lastName: string;
  // phone: string;
  // country: string;
};

type CheckoutContext = {
  user: CheckoutUser;
  setEmail: (email: string) => void;
  checkoutSteps: string[];
  currentCheckoutStep: number;
  setCurrentCheckoutStep: (step: number) => void;
};

const CheckoutContext = createContext({} as CheckoutContext);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [user, setUser] = useState<CheckoutUser>({
    email: "",
  });

  const checkoutSteps = CHECKOUT_STEPS;
  const [currentCheckoutStep, setCurrentCheckoutStep] = useState(0);

  function setEmail(email: string) {
    user.email = email;
  }

  return (
    <CheckoutContext.Provider
      value={{
        user,
        setEmail,
        checkoutSteps,
        currentCheckoutStep,
        setCurrentCheckoutStep,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
