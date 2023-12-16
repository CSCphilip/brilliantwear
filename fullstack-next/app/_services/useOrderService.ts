import { create } from "zustand";

import { useFetch } from "_helpers/client/hooks";
import { Order as IOrder } from "_types";

const initialState = {
  orders: undefined,
  order: undefined,
};

const orderStore = create<IOrderStore>(() => initialState);

export function useOrderService(): IOrderService {
  const fetch = useFetch();
  const { orders, order } = orderStore();

  return {
    orders,
    order,
    getAllLatest: async () => {
      orderStore.setState({ orders: await fetch.get("/api/orders/latest") });
    },
  };
}

interface IOrderStore {
  orders?: IOrder[];
  order?: IOrder;
}

interface IOrderService extends IOrderStore {
  getAllLatest: () => Promise<void>;
}
