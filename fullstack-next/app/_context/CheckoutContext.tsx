"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type CheckoutUser = {
  email: string;
  // fistName: string;
  // lastName: string;
  // phone: string;
  // country: string;
};

type CheckoutProviderProps = {
  children: ReactNode;
};

type CheckoutContext = {
  user: CheckoutUser;
  setEmail: (email: string) => void;
};

const CheckoutContext = createContext({} as CheckoutContext);

export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [user, setUser] = useState<CheckoutUser>({
    email: "",
  });

  function setEmail(email: string) {
    user.email = email;
  }

  return (
    <CheckoutContext.Provider value={{ user, setEmail }}>
      {children}
    </CheckoutContext.Provider>
  );
}
