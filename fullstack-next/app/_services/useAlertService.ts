// Based on: https://jasonwatmore.com/next-js-13-app-router-mongodb-user-rego-and-login-tutorial-with-example#api-handler-ts

import { create } from "zustand";

// alert state store
const alertStore = create<IAlertStore>(() => ({}));

export function useAlertService(): IAlertService {
  const { alert } = alertStore();

  return {
    alert,
    success: (message: string, showAfterRedirect = false) => {
      const type = "alert-success";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    error: (message: string, showAfterRedirect = false) => {
      const type = "alert-danger";
      alertStore.setState({
        alert: { type, message, showAfterRedirect },
      });
    },
    clear: () => {
      alertStore.setState((state) => {
        let alert = state.alert;

        // if showAfterRedirect is true the alert is kept for
        // one route change (e.g. after successful registration)
        if (alert?.showAfterRedirect) {
          alert.showAfterRedirect = false;
        } else {
          alert = undefined;
        }

        return { alert };
      });
    },
  };
}

// interfaces

interface IAlert {
  type: string;
  message: string;
  showAfterRedirect: boolean;
}

interface IAlertStore {
  alert?: IAlert;
}

interface IAlertService extends IAlertStore {
  success: (message: string, showAfterRedirect?: boolean) => void;
  error: (message: string, showAfterRedirect?: boolean) => void;

  clear: () => void;
}
